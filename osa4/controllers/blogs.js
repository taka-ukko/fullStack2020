const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)

  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // const users = await User.find({})
  // const user = users[0]


  if (!body.likes) {
    body.likes = 0
  }
  if (!body.url || !body.title) {
    response.status(400).json({ error: 'content missing' })
  } else {

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    // console.log(body)

    body.user = user._id

    // console.log(body)

    const blog = new Blog(body)

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)

    // blog
    //   .save()
    //   .then(result => {
    //     response.status(201).json(result)
    //   })

  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(result)

})

module.exports = blogsRouter
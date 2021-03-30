const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.likes) {
    request.body.likes = 0
  }
  if (!request.body.url || !request.body.title) {
    response.status(400).json({ error: 'content missing' })
  } else {
    // console.log(request.body)
    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)

    // blog
    //   .save()
    //   .then(result => {
    //     response.status(201).json(result)
    //   })

  }
})

module.exports = blogsRouter
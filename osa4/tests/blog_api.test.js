const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initBlogs)
})

test('all blogs are fetched', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initBlogs.length)
})

test('the objects are identified by id instead of _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
        expect(blog._id).not.toBeDefined()
    })
})

test('a valid blog can be added ', async () => {
    const newBlog = {
		title: 'Hiivaa',
		author: 'Hemuleisson',
		url: 'https://seees.com/',
		likes: 666,
	}

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'Hiivaa'
    )
})

test('the default value of likes is 0', async () => {
	const newBlog = {
		title: 'Hiivaa',
		author: 'Hemuleisson',
		url: 'https://seees.com/'
	}


	await api.post('/api/blogs').send(newBlog)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd.find(blog => blog.title === 'Hiivaa').likes).toBe(0)

})

test('a blog without a title or url cannot be added', async () => {
    const newBlog = {
		author: 'Sonni',
		likes: 66,
	}

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete('/api/blogs/' + blogToDelete.id)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
})

test('likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedLikes = {
        likes: 123456
    }

    await api
        .put('/api/blogs/' + blogToUpdate.id)
        .send(updatedLikes)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    console.log(blogsAtEnd)

    expect(blogsAtEnd).toHaveLength(
        helper.initBlogs.length
    )

    const contentsL = blogsAtEnd.map(r => r.likes)
    const contentsT = blogsAtEnd.map(r => r.title)

    expect(contentsL).not.toContain(blogToUpdate.likes)
    expect(contentsL).toContain(123456)

    expect(contentsT).toContain(blogToUpdate.title)


})

afterAll(() => {
    mongoose.connection.close()
})
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('api tests:', () => {

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

        // console.log(blogsAtEnd)

        expect(blogsAtEnd).toHaveLength(
            helper.initBlogs.length
        )

        const contentsL = blogsAtEnd.map(r => r.likes)
        const contentsT = blogsAtEnd.map(r => r.title)

        expect(contentsL).not.toContain(blogToUpdate.likes)
        expect(contentsL).toContain(123456)

        expect(contentsT).toContain(blogToUpdate.title)


    })
})

describe('user tests:', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'mluukkai',
          name: 'Matti Luukkainen',
          password: 'salainen',
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

    test('creation fails with proper statuscode and message if username or password is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser1 = {
          username: 'ro',
          name: 'Superuser',
          password: 'salainen',
        }

        const newUser2 = {
            username: 'rototot',
            name: 'Superuser',
            password: 'sa',
        }

        const result1 = await api
          .post('/api/users')
          .send(newUser1)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const result2 = await api
          .post('/api/users')
          .send(newUser2)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result1.body.error).toContain('is shorter than the minimum allowed length')
        expect(result2.body.error).toContain('is shorter than the minimum allowed length')


        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
})


afterAll(() => {
    mongoose.connection.close()
})
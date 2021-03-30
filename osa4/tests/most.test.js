const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
]

describe('most blogs', () => {

    test('of an empty array should be null', () => {
        const res = listHelper.mostBlogs([])
        expect(res).toEqual(null)
    })

    test('of an array with a single element should be author of that element with 1 blog', () => {
        const res = listHelper.mostBlogs(listWithOneBlog)
        expect(res).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1,
        })
    })

    test('of an array with multiple elements should be element with the highest amount of likes', () => {
        const res = listHelper.mostBlogs(blogs)
        expect(res).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
          })
    })
})

describe('most likes', () => {

  test('of an empty array should be null', () => {
      const res = listHelper.mostLikes([])
      expect(res).toEqual(null)
  })

  test('of an array with a single element should be author of that element with 1 blog', () => {
      const res = listHelper.mostLikes(listWithOneBlog)
      expect(res).toEqual({
          author: 'Edsger W. Dijkstra',
          likes: 5
    })
  })

  test('of an array with multiple elements should be element with the highest amount of likes', () => {
      const res = listHelper.mostLikes(blogs)
      expect(res).toEqual({
          author: 'Edsger W. Dijkstra',
          likes: 17
      })
  })
})
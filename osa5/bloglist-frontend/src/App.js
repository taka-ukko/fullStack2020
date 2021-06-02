import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const messageSetter = (type, text) => {
    setMessage( {
      message: text,
      type: type
    })
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      messageSetter('success', `${username} logged in succesfully`)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      messageSetter('error', 'Wrong username or password')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser') 
    messageSetter('success', 'Logged out')
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: 0
      }
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      messageSetter('success', `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch (exception) {
      messageSetter('error', 'creating blog failed')
    }

  }

  const loginForm = () => (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const loginInfo = () => (
    <>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
    </>
  )

  const notificationList = () => (
    <>
    </>
  )

  const blogForm = () => (
    <>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
            <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )

  const blogList = () => (
    <>
      {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </>
  )

  return (
    <div>
      {user === null ?
      <>
        <h2>log in to application</h2>
        <Notification message={message} />
        {notificationList()}
        {loginForm()}
      </> :
      <>
        <h2>blogs</h2>
        <Notification message={message} />
        {notificationList()}
        {loginInfo()}
        {blogForm()}
        {blogList()}
      </>
    }
    </div>
  )
}

export default App
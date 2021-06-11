import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    messageSetter('success', 'Logged out')
  }

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      returnedBlog.user = {
        name: user.name,
        username: user.username
      }
      setBlogs(blogs.concat(returnedBlog))
      messageSetter('success', `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch (exception) {
      messageSetter('error', 'creating blog failed')
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject)
      returnedBlog.user = blogObject.user
      setBlogs(blogs.filter(x => x.id !== returnedBlog.id).concat(returnedBlog))
      messageSetter('success', `Blog ${returnedBlog.title} by ${returnedBlog.author} was liked`)
    } catch (exception) {
      messageSetter('error', 'Failed to update a blog')
    }
  }

  const deleteBlog = async (id) => {
    try {
      const blogToRemove = blogs.find(x => x.id === id)
      await blogService.remove(id)
      setBlogs(blogs.filter(x => x.id !== id))
      messageSetter('success', `Blog ${blogToRemove.title} by ${blogToRemove.author} was removed`)
    } catch (exception) {
      messageSetter('error', 'Failed to remove a blog')
    }
  }

  const loginInfo = () => (
    <>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
    </>
  )

  const blogList = () => (
    <>
      {blogs.sort((x, y) => y.likes - x.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      )}
    </>
  )

  return (
    <div>
      {user === null ?
        <>
          <h2>log in to application</h2>
          <Notification message={message} />
          <Togglable buttonLabel="login">
            <LoginForm
              handleSubmit={handleLogin}
              handleUsernameChange = {({ target }) => setUsername(target.value)}
              handlePasswordChange = {({ target }) => setPassword(target.value)}
              username = {username}
              password = {password}
            />
          </Togglable>
        </> :
        <>
          {loginInfo()}
          <h2>blogs</h2>
          <Notification message={message} />
          <Togglable buttonLabel="create a new blog" ref = {blogFormRef}>
            <BlogForm createBlog = {createBlog} />
          </Togglable>
          {blogList()}
        </>
      }
    </div>
  )
}

export default App
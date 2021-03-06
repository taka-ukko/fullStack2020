import React, { useState } from 'react'
const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [open, setOpen] = useState(false)

  const hideWhenOpen = { display: open ? 'none' : '' }
  const showWhenOpen = { display: open ? '' : 'none' }

  const toggleOpen = () => {
    setOpen(!open)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = (event) => {
    event.preventDefault()
    updateBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
      id: blog.id
    })
  }

  const removeBlog = (event) => {
    event.preventDefault()
    const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (!confirmed) {
      return
    } else {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style = {blogStyle}>
      <div style = {hideWhenOpen} className = 'defaultView'>
        {blog.title} / {blog.author} <button onClick={toggleOpen} className = 'viewButton'>view</button>
      </div>
      <div style = {showWhenOpen} className = 'extendedView'>
        {blog.title} / {blog.author} <button onClick={toggleOpen} className = 'hideButton'>hide</button>
        <br></br>
        {blog.url}
        <br></br>
        {blog.likes} <button onClick={likeBlog} className = 'likeButton'>like</button>
        <br></br>
        {blog.user.name}
        <br></br>
        {user.username === blog.user.username ? <button onClick={removeBlog}>remove</button> : <></>}
      </div>

    </div>
  )
}


export default Blog
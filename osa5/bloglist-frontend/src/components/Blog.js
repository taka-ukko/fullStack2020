import React, { useState } from 'react'
const Blog = ({blog, updateBlog}) => {
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

  return (
    <div style = {blogStyle}>
      <div style = {hideWhenOpen}>
        {blog.title} / {blog.author} <button onClick={toggleOpen}>view</button>
      </div>  
      <div style = {showWhenOpen}>
        {blog.title} / {blog.author} <button onClick={toggleOpen}>hide</button>
        <br></br>
        {blog.url}
        <br></br>
        {blog.likes} <button onClick={likeBlog}>like</button>
        <br></br>
        {blog.user.name}
      </div>  

    </div>
  )
}


export default Blog
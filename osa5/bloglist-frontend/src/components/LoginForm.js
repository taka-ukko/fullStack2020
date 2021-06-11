import React from 'react'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={handleUsernameChange}
            id = 'username'
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            id = 'password'
          />
        </div>
        <button type="submit" id = 'login-button'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
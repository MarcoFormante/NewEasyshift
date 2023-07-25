import React, { useState } from 'react'
import Title from '../Title/Title'
import LoginForm from './LoginForm'


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

  }
  
  return (
    <div className='login'>
        <div className='login__container'>
        <Title title={"EASYSHIFT"} classname={"brand"} />
        <LoginForm
          username={username}
          handleSubmit={handleSubmit}
          password={password}
          setPassword={(value) => setPassword(value)}
          setUsername={(value) => setUsername(value)}
        />
        </div>
    </div>
  )
}

export default Login

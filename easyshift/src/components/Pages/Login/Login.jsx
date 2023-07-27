import React, { useState } from 'react'
import Title from '../../Layout/Title/Title'
import Form from './Form'



const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

  }
  
  return (
    <div>
        <div className='container__flex--center gap-20'>
        <Title title={"EASYSHIFT"} quote={true} classname={"brand"} />
        <h2>Login</h2>
        <Form
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

import React, { useEffect, useState } from 'react'
import Title from '../../Layout/Title/Title'
import Form from './Form'



const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div>
      
       <div className='container__flex--center--column gap-20'>
        <Title title={"EASYSHIFT"} quote={true} classname={"brand"} />
        <h2>Login</h2>
        <Form
          username={username}
          password={password}
          setPassword={(value) => setPassword(value)}
          setUsername={(value) => setUsername(value)}
        />
      </div>
       
    </div>
  )
}

export default Login

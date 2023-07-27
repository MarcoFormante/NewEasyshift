import React, { useState } from 'react'
import Title from '../../Title/Title'
import Form from './Form'
import { Link } from 'react-router-dom'

const NewAccount = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
  
    function handleSubmit(e) {
      e.preventDefault()
    }
    

  return (
    <div>
    <div className='container__flex--center'>
        <Title title={"EASYSHIFT"} quote={true} classname={"brand"} />
        <h2>Register</h2>
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

export default NewAccount

import React, { useState } from 'react'
import Title from '../Title/Title'


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

  }
  
  return (
    <div className='login'>
        <div className='login__container'>
        <Title title={"EASYSHIFT"} titleClassname={"br-typo title-logo txt-l"} />
          <div>
            <form onSubmit={handleSubmit}>
              <div >
                <label htmlFor="username">Username *</label>
                <input type="text" id='username' value={username} maxLength={25} onChange={(e)=> setUsername(e.target.value)} />
              </div>
              <div >
                <label htmlFor="password">Password *</label>
                <input type="text" id='password' value={password} maxLength={60} onChange={(e)=> setUsername(e.target.value)} />
              </div>
               <input type="submit" value="ENTER" />
            </form>
          </div>
        </div>
    </div>
  )
}

export default Login

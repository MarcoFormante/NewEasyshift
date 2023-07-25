import React from 'react'

const LoginForm = ({handleSubmit,username,password,setUsername,setPassword}) => {
  return (
    <div>
       <form onSubmit={handleSubmit}>
              <div >
                <label htmlFor="username">Username *</label>
                <input type="text" id='username' value={username} maxLength={25} onChange={(e)=> setUsername(e.target.value)} />
              </div>
              <div >
                <label htmlFor="password">Password *</label>
                <input type="text" id='password' value={password} maxLength={60} onChange={(e)=> setPassword(e.target.value)} />
              </div>
               <input type="submit" value="ENTER" />
            </form>
    </div>
  )
}

export default LoginForm

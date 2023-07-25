import React from 'react'

const LoginForm = ({handleSubmit,username,password,setUsername,setPassword}) => {
  return (
    <div>
       <form className='form form__center--column' onSubmit={handleSubmit}>
            <div className='row'>
               <label htmlFor="username">Username <span className='required'>*</span> </label>
               <input type="text" id='username' value={username} maxLength={25} onChange={(e)=> setUsername(e.target.value)} />
            </div>
            <div className='row'>
               <label htmlFor="password">Password <span className='required'>*</span> </label>
               <input type="text" id='password' value={password} maxLength={60} onChange={(e)=> setPassword(e.target.value)} />
            </div>
              <input className='cta-btn' type="submit" value="ENTER" />
        </form>
    </div>
  )
}

export default LoginForm

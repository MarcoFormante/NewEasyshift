import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Form = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate("/admin/home")

    }


  return (
      <div className='container__flex--center--column gap-20'>
       <form className='form form__center--column' onSubmit={handleSubmit}>
            <div className='row'>
               <label htmlFor="username">Username <span className='required'>*</span> </label>
               <input type="text" id='username' value={username} maxLength={25} onChange={(e)=> setUsername(e.target.value)} />
            </div>
            <div className='row show__password'>
               <label htmlFor="password">Password <span className='required'>*</span> </label>
                <input type={"password"} id='password' value={password} maxLength={60} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='row'>
              <label htmlFor="secret-code">Secret Code <span className='required'>*</span> </label>
                <input type="password" id='secret-code' />
            </div>
            <input className='cta-btn' type="submit" value="Enter" />
      </form>
      <span>
       Are not you a ADMIN? <Link className='btn brand__link' to={"/"}>Exit</Link>
        </span>
    </div>

  )
}

export default Form

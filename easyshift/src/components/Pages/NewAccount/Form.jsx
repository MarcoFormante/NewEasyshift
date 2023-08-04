import React from 'react'
import {Link} from 'react-router-dom'

const Form = ({ handleSubmit, username, password, setUsername, setPassword ,setRole}) => {
  
  return (
    <div className='container__flex--center--column gap-20'>
       <form className='form form__center--column' onSubmit={handleSubmit}>
            <div className='row'>
               <label htmlFor="username">Username <span className='required'>*</span> </label>
               <input type="text" id='username' value={username} maxLength={25} onChange={(e)=> setUsername(e.target.value)} />
            </div>
            <div className='row'>
               <label htmlFor="password">Password <span className='required'>*</span> </label>
               <input type="password" id='password' value={password} maxLength={60} onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <div className='row'>
              <label htmlFor="role">Role <span className='required'>*</span> </label>
              <select name="role" id="role" onChange={(e)=>setRole(e.target.value)}>
                  <option value=""></option>
                  <option value="0" >Photographer</option>
                  <option value="1">Duty</option>
              </select>
            </div>
            <input className='cta-btn' type="submit" value="REGISTER" />
      </form>
      <span>
        Do you have an account yet? <Link className='btn brand__link' to={"/"}>Login</Link>
        </span>
    </div>
  )
}

export default Form

import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const Form = ({ handleSubmit, username, password, setUsername, setPassword, setRole }) => {
  const [showPassword, setShowPassword] = useState(false)
  const showPasswordRef = React.useRef(null)

  useEffect(() => {
    if (showPasswordRef?.current) {
        const ref = showPasswordRef.current
        
      ref.addEventListener("mousedown",()=> {
        setShowPassword(true)
      })
        
      ref.addEventListener("touchstart",()=> {
        setShowPassword(true)
      })
        
      ref.addEventListener("mouseup",()=> {
        setShowPassword(false)
      })
        
      ref.addEventListener("mouseleave",()=> {
        setShowPassword(false)
      })
        
      ref.addEventListener("touchmove",()=> {
        setShowPassword(false)
      })
  
      return () => {
        ref.removeEventListener("mousedown",()=> {
          setShowPassword(true)
        })
          
        ref.removeEventListener("touchstart",()=> {
            setShowPassword(true)
        })
          
        ref.removeEventListener("mouseup",()=> {
            setShowPassword(false)
        })
          
        ref.removeEventListener("mouseleave",()=> {
            setShowPassword(false)
        })
          
        ref.removeEventListener("touchmove",()=> {
            setShowPassword(false)
        })
      }
    }
  }, [])
  
  
  return (
    <div className='container__flex--center--column gap-20'>
       <form className='form form__center--column' onSubmit={handleSubmit}>
            <div className='row'>
               <label htmlFor="username">Username <span className='required'>*</span> </label>
               <input type="text" id='username' value={username} maxLength={25} onChange={(e)=> setUsername(e.target.value)} />
            </div>
            <div className='row show__password'>
              <span className='show-password' ref={showPasswordRef}></span>
               <label htmlFor="password">Password <span className='required'>*</span> </label>
                <input type={!showPassword ? "password" : "text"} id='password' value={password} maxLength={60} onChange={(e) => setPassword(e.target.value)} />
               
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

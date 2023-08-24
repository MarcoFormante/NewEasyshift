import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../../AxiosApi/axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../Redux/userSlice'



const Form = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [secretCode, setSecretCode] = useState("")
  const [loginIsValid,setLoginIsValid] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formdata = new FormData();
    formdata.append("username",username)
    formdata.append("password",password)
    formdata.append("secretCode",secretCode)
    formdata.append("action", "adminLogin")
    
    axios.post("userApi.php", formdata)
      .then(response => {
        if (response.data.status === 1) {
          if (response.data.token && response.data.adminInfo) {
              const adminInfo = response.data.adminInfo
              sessionStorage.setItem("userInfo", JSON.stringify(response.data.adminInfo))
              sessionStorage.setItem("adminToken", response.data.token)
              dispatch(setUser({}))
              dispatch(setUser({ userID: adminInfo.userID, username: adminInfo.username, role: adminInfo.role_id }))
              setLoginIsValid(sessionStorage.getItem("adminToken"))
            }
        }
      })
  }


  useEffect(() => {
    if (loginIsValid) {
      window.location.pathname = "admin/home"
    }
  },[loginIsValid])


  return (
      <div className='container__flex--center--column gap-20'>
       <form className='form form__center--column' onSubmit={handleSubmit}>
            <div className='row'>
               <label htmlFor="username">Username <span className='required'>*</span> </label>
               <input type="text" id='username' value={username} maxLength={20} onChange={(e)=> setUsername(e.target.value)} />
            </div>
            <div className='row show__password'>
               <label htmlFor="password">Password <span className='required'>*</span> </label>
                <input type={"password"} id='password' value={password} maxLength={60} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='row'>
              <label htmlFor="secret-code">Secret Code <span className='required'>*</span> </label>
                <input type="password" id='secret-code' value={secretCode} maxLength={60} onChange={(e)=> setSecretCode(e.target.value)}  />
            </div>
            <input className='cta-btn' type="submit" value="Enter" />
      </form>
      <span>
       If you are not an Admin please go back  <Link className='btn brand__link' to={"/"}>Exit</Link>
        </span>
    </div>

  )
}

export default Form

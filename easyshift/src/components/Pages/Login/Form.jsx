import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { setUser } from '../../../Redux/userSlice'
import axios from '../../../AxiosApi/axios'

const     Form = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const [loginisValid, setLoginIsValid] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username && password) {
      // const formData = new FormData()
      // formData.append("username", username)
      // formData.append("password",password)
      // axios.post(`${process.env.REACT_APP_API_URL}controllers/requestController.php`, formData)
      // .then(response => console.log(response.data))
    }

    // dispatch(setUser({ userID: 1, username: "name test", role: "Photographer", requests: 5 }))
    // sessionStorage.setItem("userInfo", JSON.stringify({ userID: 1, username: "name test", role: "Photographer", requests: 5 }))
    // sessionStorage.setItem("token", "sadkjh")
    // setLoginIsValid(sessionStorage.getItem("token"))
  }
 

  useEffect(() => {
    if (loginisValid) {
      window.location.pathname = "/home"
    } else {
      console.log("not valid");
    }
  },[loginisValid])
  
  return (
    <div className='container__flex--center--column gap-20'>
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
      <span>
          You don’t have an account yet? <Link className='btn brand__link' to={"/newAccount"}>Create Account</Link>
        </span>
    </div>
  )
}

export default Form


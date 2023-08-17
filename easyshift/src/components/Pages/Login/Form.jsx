import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { setUser } from '../../../Redux/userSlice'
import axios from '../../../AxiosApi/axios'


const Form = ({dispatchAlert}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const [loginisValid, setLoginIsValid] = useState(null)

  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (username && password) {
      const formData = new FormData()
      formData.append("username", username)
      formData.append("password", password)
      formData.append("action", "login");
      axios.post(`${process.env.REACT_APP_API_URL}userApi.php`, formData, {
        headers: {
          "Content-Type": "x-www-form-urlencoded",
        }
      })
        .then(response => {
        if (response.data.status === 1) {
          const user = {...response.data.user};
          dispatch(setUser({}))
          dispatch(setUser({ userID: user.id, username: user.username, role: user.role_id }))
          sessionStorage.setItem("userInfo", JSON.stringify({ userID: user.id, username: user.username, role: user.role_id }))
          sessionStorage.setItem("token", response.data.token)
          setLoginIsValid(sessionStorage.getItem("token"))
        } else {
          if (response.data.message && response.data.message.match(/Error: Username or Password isn't valid/g)) {
            dispatchAlert("error","Username or Password isn't valid","Credentials Error",3000)
          } else {
            dispatchAlert("error","Connection Problem, try again","",3000)
          }
         
        }
      })
    } else {
      dispatchAlert("error", "Username and Password are required", "Input Error", 3000, null, false)
    }
    
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
                <input type="password" id='password' value={password} maxLength={60} onChange={(e) => setPassword(e.target.value)}
          />
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


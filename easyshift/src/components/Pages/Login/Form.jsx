import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { setUser } from '../../../Redux/userSlice'
import axios from '../../../AxiosApi/axios'


const Form = ({dispatchAlert}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const [loginIsValid, setLoginIsValid] = useState(null)

  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (username && password) {
      const formData = new FormData()
      formData.append("username", username)
      formData.append("password", password)
      formData.append("action", "login");
      axios.post(`userApi.php`, formData, {
        headers: {
          "Content-Type": "x-www-form-urlencoded",
        }
      })
        .then(response => {
        if (response.data.status === 1) {
          const user = {...response.data.user};
          dispatch(setUser({}))
          dispatch(setUser({ userID: user.id, username: user.username, role_id: user.role_id }))
          sessionStorage.setItem("userInfo", JSON.stringify({ userID: user.userID, username: user.username, role_id: user.role_id }))
          sessionStorage.setItem("token", response.data.token)
          setLoginIsValid(sessionStorage.getItem("token"))
        } else {
          const errorMessage = response?.data?.message || null
          if (errorMessage) {
              if (errorMessage.match(/Error: Your account has not been validated yet/)) {
                  dispatchAlert("error","Your account has not been validated yet","Error",3000)
              } else if (errorMessage.match(/Error: Username or Password isn't valid/g)) {
                  dispatchAlert("error","Username or Password isn't valid ","Error",3000)
              }
            
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
    if (loginIsValid) {
      window.location.pathname = "/home"
    } 
  },[loginIsValid])
  
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


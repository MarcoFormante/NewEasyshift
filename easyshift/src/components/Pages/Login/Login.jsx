import React, { useState } from 'react'
import Title from '../../Layout/Title/Title'
import Form from './Form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../Redux/userSlice'


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(setUser({ userID: 1, username: "name test", role: "Photographer", requests: 5 }))
    sessionStorage.setItem("userInfo",JSON.stringify({userID: 1, username: "name test", role: "Photographer", requests: 5 }))
    navigate("/home")
  }
  
  return (
    <div>
        <div className='container__flex--center--column gap-20'>
        <Title title={"EASYSHIFT"} quote={true} classname={"brand"} />
        <h2>Login</h2>
        <Form
          username={username}
          handleSubmit={handleSubmit}
          password={password}
          setPassword={(value) => setPassword(value)}
          setUsername={(value) => setUsername(value)}
        />
        </div>
    </div>
  )
}

export default Login

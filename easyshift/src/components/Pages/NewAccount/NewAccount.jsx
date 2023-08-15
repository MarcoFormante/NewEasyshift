import React, { useState } from 'react'
import Title from '../../Layout/Title/Title'
import Form from './Form'
import axios from '../../../AxiosApi/axios'
import { useNavigate } from 'react-router-dom'



const NewAccount = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState(null)
    const navigate = useNavigate()
  
  function handleSubmit(e) {
    e.preventDefault()
    let usernameIsValid = username.length < 26 && username.length > 3
    const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,60}$/)
    let passwordIsValid = password.match(passwordRegex) 
    let roleIsValid = (+role === 0 || +role === 1) && role !== ""
    let formIsValid = usernameIsValid && passwordIsValid && roleIsValid

    if (formIsValid) {
     //first Letter in Capital
      const name = username[0].toUpperCase() + username.slice(1)
      const formData = new FormData()
      formData.append("username", name)
      formData.append("password", password)
      formData.append("role", role)
      formData.append("action","createAccount")
      axios.post(process.env.REACT_APP_API_URL + "userApi.php", formData, {
        headers: {
          "Content-Type": "x-www-form-urlencoded"
        }
      })
        .then(response => {
        if (response.data.status === 1) {
          navigate("/")
        }
      })
    } else {
     //Handle Error Form
      console.log("notValid");
    }
  }
    

  return (
    <div>
    <div className='container__flex--center--column'>
        <Title title={"EASYSHIFT"} quote={true} classname={"brand"} />
        <h2>Register</h2>
        <Form
        username={username}
        handleSubmit={handleSubmit}
        password={password}
        setPassword={(value) => setPassword(value)}
        setUsername={(value) => setUsername(value)}
        setRole={(value)=>setRole(value)}  
        />
    </div>
</div>
  )
}

export default NewAccount

import React, { useContext, useState } from 'react'
import Title from '../../Layout/Title/Title'
import Form from './Form'
import axios from '../../../AxiosApi/axios'
import { useNavigate } from 'react-router-dom'
import { loadingContext } from '../../../App'
import { setAlert} from '../../../Redux/alertSlice'
import { useDispatch } from 'react-redux'

const NewAccount = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState(null)
    const navigate = useNavigate()
    const { setIsLoading } = useContext(loadingContext)
    const dispatch = useDispatch()
    
  
  function handleSubmit(e) {
    e.preventDefault()
    let usernameIsValid = username.length < 21 && username.length > 3
    const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,60}$/)
    let passwordIsValid = password.match(passwordRegex) 
    let roleIsValid = (+role === 0 || +role === 1) && role !== ""
    let formIsValid = usernameIsValid && passwordIsValid && roleIsValid

    if (formIsValid) {
      setIsLoading(true)
      //first Letter in Capital
      const name = username.trim()
      const formData = new FormData()
      formData.append("username", name)
      formData.append("password", password)
      formData.append("role", role)
      formData.append("action", "createAccount")
      axios.post("userApi.php", formData, {
        headers: {
          "Content-Type": "x-www-form-urlencoded"
        }
      })
        .then(response => {
          console.log(response.data);
          if (response.data.status === 1) {
            navigate("/")
          } else {
            setTimeout(() => {
              if (response.data.message && response.data.message.match(/Error: This name has already been taken/g)) {
                dispatch(setAlert({ type: "error", text: "This name has already been taken", title: "Username Error", timeout: 5000 }))
              }
            }, 1000)
          }
        }).finally(
          setTimeout(() => {
            setIsLoading(false)
          }, 1000))
        
    } else {
     //Handle Error Form
      setIsLoading(false)
      if (!roleIsValid) {
        dispatch(setAlert({type:"error",text:"Please choose a role  between Duty and Photographer",title:"Role Error",timeout:5000}))
      }

      if (!passwordIsValid) {
          dispatch(
            setAlert({
            type: "error",
            text: "Please create a password that includes at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*), and has a length between 8 and 60 characters.",
            title: "Password Error",
            timeout: 5000
        }))
      }

      if (!usernameIsValid) {
        dispatch(setAlert({type:"error",text:"Please enter a username that is between 4 and 20 characters in length",title:"Username Error",timeout:5000}))
      }
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

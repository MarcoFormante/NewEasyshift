import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from '../../../AxiosApi/axios'
import Title from '../../Layout/Title/Title'
import CheckUser from '../../Helpers/CheckUser/CheckUser'
import { deleteAccount } from '../../../Redux/userSlice'
import { loadingContext } from '../../../App'
import { setAlert } from '../../../Redux/alertSlice'

const DeleteAccount = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfo.value)
    const navigate = useNavigate()
    const {isLoading,setIsLoading} = useContext(loadingContext)
  
    const handleSubmit = (e) => {
        e.preventDefault()
        if (username && password) {
            setIsLoading(true)
            CheckUser(userInfo)
            .then(response => {
                if (response.data.status === 1) {
                    const formdata = new FormData()
                    formdata.append("action","deleteAccount")
                    formdata.append("username", username)
                    formdata.append("password", password)
                    formdata.append("userId",userInfo.userID)
                    axios.post("userApi.php", formdata, {
                        headers: {
                        "Content-Type":"x-www-form-urlencoded"
                    }
                }).then(response => {
                    if (response.data.status === 1) {
                        dispatch(deleteAccount)
                        sessionStorage.removeItem("userInfo")
                        sessionStorage.removeItem("token")
                        dispatch(setAlert({type:"success",text:"Your account has been deleted",title:"Account Deleted",timeout:3000}))
                        navigate("/")    
                    }
                    if (response?.data?.message?.match(/Username or Password is not correct/g)) {
                        setTimeout(() => {
                            dispatch(setAlert({type:"error",text:"Username or Password is not correct",title:"Inputs Problem",timeout:3000}))
                        }, 1000);
                    }
                })
                } else {
                    navigate("/")
            }
            }).finally(
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
            )
    }
    }
    
    return (
    <div> 
        <Title title={"Delete Account"} quote={false} />
        <span className='container__flex--center--row pad-s txt-center'>To delete your account, please provide your current Password and associated Username</span>    
    <div className='container__flex--center--column gap-20'>
       <form className='form form__center--column' onSubmit={handleSubmit}>
            <div className='row'>
               <label htmlFor="username">Username <span className='required'>*</span> </label>
               <input type="text" id='username' value={username} onChange={(e)=> setUsername(e.target.value)} />
            </div>
            <div className='row'>
               <label htmlFor="password">Password <span className='required'>*</span> </label>
               <input type="text" id='password' value={password}  onChange={(e)=> setPassword(e.target.value)} />
            </div>
              <input className='cta-btn' type="submit" value="ENTER" />
        </form>
    </div>
    </div>
  )
}

export default DeleteAccount

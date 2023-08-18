import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Link, useNavigate } from 'react-router-dom'
import { setRequests,deleteAccount } from '../../../Redux/userSlice'
import { useDispatch } from 'react-redux'
import axios from '../../../AxiosApi/axios'

const Profile = ({ handleWindowToggle }) => {
  const userInfo = useSelector((state) => state.userInfo.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (userInfo.requests) {
    } else {
      const formdata = new FormData()
      formdata.append("action", "getUserTotalRequests")
      formdata.append("userId",userInfo.userID)
      axios.post(process.env.REACT_APP_API_URL + "userApi.php", formdata, {
        headers: {
          "Content-Type":"x-www-form-urlencoded"
        }
      }).then(response => {
        if (response.data.status === 1) {
          const totalRequest = response.data.totalRequests
          dispatch(setRequests(totalRequest))
        }
      })
    }
  }, [])
  
  const logout = () => {
    dispatch(deleteAccount)
    sessionStorage.clear()
    navigate("/")
  }
 
   
  return (
    <div className='profile'>
      <div className='sidebar__title'>Profile</div>
      <div className='profile__userInfo'>
        <div className='profile__userInfo__column'>
            <div className='profile__userInfo__row'>
              <span className='txt-bold'>Name:</span>
              <span>{userInfo.username}</span>
            </div>
            <div className='profile__userInfo__row'>
              <span className='txt-bold'>Role:</span>
              <span>{ userInfo.role === 0 ? "Photographer" : "Duty"}</span>
            </div>
            <div className='profile__userInfo__row'>
              <span className='txt-bold'>Requests:</span> 
              <span>{ userInfo.requests}</span>
            </div>
        </div>
      </div>
      <Link to={"/deleteAccount"} className='link btn'onClick={()=> handleWindowToggle("")} >Delete Account</Link>
      <div to={"/deleteAccount"} className='link link__logout btn' onClick={logout}>Log out</div>
    </div>
  )
}

export default Profile

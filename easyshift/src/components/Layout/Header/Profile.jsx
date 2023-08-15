import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Link } from 'react-router-dom'
import { setRequests } from '../../../Redux/userSlice'
import { useDispatch } from 'react-redux'
import axios from '../../../AxiosApi/axios'

const Profile = ({ handleWindowToggle }) => {
  const [userTotalRequests,setUserTotalRequests] = useState()
  const userInfo = useSelector((state) => state.userInfo.value)
  const dispatch = useDispatch()
  
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
        console.log(response.data);
        if (response.data.status === 1) {
          const totalRequest = response.data.totalRequests
          dispatch(setRequests(totalRequest))
        }
      })
    }
  },[])
 
   
  return (
    <div className='profile'>
      <div className='sidebar__title'>Profile</div>
      <div className='profile__userInfo'>
        <div>
          <span className='txt-bold'>Name:</span>
          <span className='txt-bold'>Role:</span>
          <span className='txt-bold'>Requests:</span>
        </div>
        <div>
          <span>{userInfo.username}</span>
          <span>{ userInfo.role === 0 ? "Photographer" : "Duty"}</span>
          <span>{ userInfo.requests}</span>
        </div>
      </div>
      <Link to={"/deleteAccount"} className='link btn'onClick={()=> handleWindowToggle("")} >Delete Account</Link>
    </div>
  )
}

export default Profile

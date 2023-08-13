import React, { useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Link } from 'react-router-dom'

const Profile = () => {
  const userInfo = useSelector((state)=> state.userInfo.value)
   
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
          <span>{ userInfo.role}</span>
        </div>
      </div>
      <Link to={"/deleteAccount"} className='link btn' >Delete Account</Link>
      <Link to={"/modifyAccount"} className='link btn' style={{color:"greenyellow"}}>Modify Account</Link>
    </div>
  )
}

export default Profile

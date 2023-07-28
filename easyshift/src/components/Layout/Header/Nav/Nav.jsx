import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='nav'>
     <NavLink to={"/home"}>Home</NavLink> 
     <NavLink to={"/newRequest"}>New Request</NavLink> 
     <NavLink to={"/myRequests"}>MyRequests</NavLink> 
    </div>
  )
}

export default Nav

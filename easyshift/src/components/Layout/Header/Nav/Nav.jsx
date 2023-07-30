import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = ({ menuToggle,setMenuToggle}) => {
  
  return (
    <div className={`nav ${menuToggle ? " nav__mobile" : ""}`} >
     <NavLink to={"/home"} onClick={()=>setMenuToggle(false)}>Home</NavLink > 
     <NavLink to={"/newRequest"} onClick={()=>setMenuToggle(false)}>New Request</NavLink> 
     <NavLink to={"/myRequests"} onClick={()=>setMenuToggle(false)}>My Requests</NavLink> 
    </div>
  )
}

export default Nav

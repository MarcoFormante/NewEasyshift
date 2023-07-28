import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = ({ menuToggle,setMenuToggle}) => {
  
  return (
    <div className={`nav ${menuToggle ? " nav__mobile" : ""}`} >
     <NavLink to={"/home"} onClick={()=>setMenuToggle(!menuToggle)}>Home</NavLink > 
     <NavLink to={"/newRequest"} onClick={()=>setMenuToggle(!menuToggle)}>New Request</NavLink> 
     <NavLink to={"/myRequests"} onClick={()=>setMenuToggle(!menuToggle)}>My Requests</NavLink> 
    </div>
  )
}

export default Nav

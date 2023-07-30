import React from 'react'
import ph_duty from '../../../icons/PH_Duty.svg'
import ph_simple from '../../../icons/PH_simple.svg'

const UserInfo = ({ username, role }) => {
    
  return (
    <div className='request-card__user-info'>
        <span>{ username.slice(0,1).toUpperCase()}</span>
        <span>{ username}</span>
        <span style={role === "Duty" ?{backgroundImage:"url("+ ph_duty +")"}:{backgroundImage:"url("+ ph_simple +")"}}></span>
    </div>

    
  )
}

export default UserInfo

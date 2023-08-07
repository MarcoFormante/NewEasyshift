import React from 'react'
import ph_duty from '../../../icons/PH_Duty.svg'
import ph_simple from '../../../icons/PH_simple.svg'

const UserInfo = ({ username, role }) => {
  
    
  return (
      <div className='request-card__user-info'>
        <div className='request-card__user-info__left-container'>
          <span className='request-card__user-info__slicedName'>{username.slice(0,1).toUpperCase()}</span>
          <span className='request-card__user-info__name'>{username}</span>
        </div>
        <div className='request-card__user-info__right-container'>
            <span className='request-card__user-info__role ' title={Number(role) === 1 ? "Duty" : "Photographer"} style={Number(role) === 1 ?{backgroundImage:"url("+ ph_duty +")"}:{backgroundImage:"url("+ ph_simple +")"}}></span>
        </div>
    </div>

    
  )
}

export default UserInfo

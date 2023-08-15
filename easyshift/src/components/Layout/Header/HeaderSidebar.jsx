import React, { useState } from 'react'
import Notifications from './Notifications'
import Profile from './Profile'


const HeaderSidebar = ({windowToggle,handleWindowToggle,windowType}) => {
  return (
    <div className={`header__right-elements__sidebar ${windowToggle ? "header__right-elements__sidebar--active" : ""}`} >
        {
          <>
              <div className='exit btn' onClick={()=>handleWindowToggle("")}></div>
         { windowToggle
            ?
              (
                <>
              
        {
            windowType === "Notifications"
              ?
                <Notifications windowToggle={windowToggle} windowType={windowType}  handleWindowToggle={(value)=> handleWindowToggle(value)} />
              :
            windowType === "Profile"
              ?
                      <Profile handleWindowToggle={(value)=> handleWindowToggle(value)} />
              :
                ""
              }
              </>
              )
            :
              ""
            }
            </>
        }
     
        </div>
  )
}

export default HeaderSidebar


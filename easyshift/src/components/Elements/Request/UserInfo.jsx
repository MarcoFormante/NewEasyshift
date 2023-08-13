import React,{useContext, useEffect} from 'react'
import ph_duty from '../../../icons/PH_Duty.svg'
import ph_simple from '../../../icons/PH_simple.svg'
import { scrollTargetContext } from '../../Pages/RequestHandler/RequestsHandler'
import { useLocation } from 'react-router-dom'


const UserInfo = ({ username, role,requestIndex }) => {
  const location = useLocation()
  const context = useContext(scrollTargetContext)
 
  useEffect(() => {
    if (location?.state?.requestIndex && requestIndex === location?.state?.requestIndex) {
      context.setScrollTarget(requestIndex)
    }
  },[requestIndex,location?.state?.requestIndex])

  return (
      <div className='request-card__user-info'>
        <div className='request-card__user-info__left-container'>
          <span className='request-card__user-info__slicedName'>{username.slice(0,1).toUpperCase()}</span>
          <span className='request-card__user-info__name'>{username}</span>
        </div>
        <div className='request-card__user-info__right-container'>
        <span className='request-card__user-info__role '
          title={Number(role) === 1 ? "Duty" : "Photographer"}
          style={Number(role) === 1 ? { backgroundImage: "url(" + ph_duty + ")" } : { backgroundImage: "url(" + ph_simple + ")" }}
        >
        </span>
        </div>
    </div>

    
  )
}

export default UserInfo

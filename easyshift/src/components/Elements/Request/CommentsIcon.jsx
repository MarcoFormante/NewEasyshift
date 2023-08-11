import React from 'react'
import { useNavigate } from 'react-router-dom'



const CommentsIcon = ({pageLimit, requestsLimit, request, showComments }) => {
const navigate = useNavigate()

  return (
    <div className='request-card__comments'>
      <div className='request-card__comments__container'>
        <span className='created_at'>created on { new Date(request?.created_on).toLocaleDateString("fr")}</span>
        {!showComments && <span className='request-card__comments__icon btn' onClick={()=> navigate(`/viewRequest/${request.id}`,{state:{requestsLimit,pageLimit}})}></span>}
    </div>
    </div>
  )
}

export default CommentsIcon

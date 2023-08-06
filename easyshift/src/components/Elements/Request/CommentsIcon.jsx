import React from 'react'
import { useNavigate } from 'react-router-dom'



const CommentsIcon = ({ totalComments, requestID, setShowCommentsTarget, request, showComments }) => {

  const navigate = useNavigate()
  
const viewRequest = (id) => {
     navigate("/viewRequest/" + id,{state:{requestID}}) 
  }

  return (
    <div className='request-card__comments'>
      <div className='request-card__comments__container'>
        <span className='created_at'>created on { request?.created_on}</span>
        <span className='request-card__comments__icon btn' onClick={()=> (!showComments && totalComments > 0) && setShowCommentsTarget(request)}></span>
        <span className='request-card__comments__total'>{totalComments}</span>
    </div>
    </div>
  )
}

export default CommentsIcon

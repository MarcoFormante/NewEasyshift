import React from 'react'
import { useNavigate } from 'react-router-dom'



const CommentsIcon = ({  setShowCommentsTarget, request, showComments }) => {


  return (
    <div className='request-card__comments'>
      <div className='request-card__comments__container'>
        <span className='created_at'>created on { new Date(request?.created_on).toLocaleDateString("fr")}</span>
        {!showComments && <span className='request-card__comments__icon btn' onClick={()=> setShowCommentsTarget(request)}></span>}
    </div>
    </div>
  )
}

export default CommentsIcon

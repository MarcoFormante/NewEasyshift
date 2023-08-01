import React from 'react'
import { useNavigate } from 'react-router-dom'



const CommentsIcon = ({totalComments, requestID }) => {
   const navigate = useNavigate()
  
  const viewRequest = (id) => {
     navigate("/viewRequest/" + id,{state:{requestID}}) 
}

  return (
    <div className='request-card__comments'>
    <div className='request-card__comments__container'>
        <span className='request-card__comments__icon btn' onClick={()=>viewRequest(requestID)}></span>
        <span className='request-card__comments__total'>{totalComments}</span>
    </div>
    </div>
  )
}

export default CommentsIcon
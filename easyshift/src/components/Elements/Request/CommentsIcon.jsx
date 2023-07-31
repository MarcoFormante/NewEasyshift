import React from 'react'


const CommentsIcon = ({ lockedUserComment, totalComments }) => {
  


  return (
    <div className='request-card__comments'>
    <div className='request-card__comments__container '>
        <span className='request-card__comments__icon btn'></span>
        <span className='request-card__comments__total '>{totalComments}</span>
    </div>
    </div>
  )
}

export default CommentsIcon

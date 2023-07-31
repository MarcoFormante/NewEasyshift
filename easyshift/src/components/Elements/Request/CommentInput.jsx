import React from 'react'

const CommentInput = () => {
  return (
    <div className='request-card__inpt-comment'>
      <textarea name="comment" id="comment" cols="25" rows="3" placeholder='Write something'></textarea>
      <button className='cta-btn'>Send</button>
    </div>
  )
}

export default CommentInput

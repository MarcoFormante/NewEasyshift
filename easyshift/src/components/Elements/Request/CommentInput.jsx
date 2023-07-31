import React, { useState } from 'react'

const CommentInput = ({ setAddCommentNum }) => {
  const [comment, setComment] = useState("")
  
  
  const handleSendComment = () => {
    if (comment) {
      setAddCommentNum()
      setComment("")
    }
  }

  return (
    <div className='request-card__inpt-comment'>
      <textarea name="comment" id="comment" cols="25" rows="3" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='Write something'/>
      <button className='cta-btn' onClick={handleSendComment}>Send</button>
    </div>
  )
}

export default CommentInput

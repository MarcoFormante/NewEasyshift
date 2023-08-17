import React, { useState } from 'react'
import { setAlert } from '../../../Redux/alertSlice'
import { useDispatch } from 'react-redux'

const CommentInput = ({ userInfo,requestID, handleAddComment }) => {
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()
  

  const handleSendComment = () => {
    if (comment && comment.length <= 50) {
      handleAddComment({
        userId: userInfo.userID,
        requestId: requestID,
        comment:comment.trim().slice(0,50),
      })
      setComment("")
      
    } else {
      if (comment.length > 50) {
        dispatch(setAlert({type:"error",text:"The comment can have maximum 50 characters",title:"",timemout:2000}))
      }
    }
  }

  return (
    <div className='request-card__inpt-comment'>
      <textarea name="comment"
        id="comment"
        cols="25"
        rows="3"
        maxLength="50"
        value={comment}
        onChange={(e) => setComment(e.target.value.slice(0,50))}
        placeholder='Write something'
      />
      <button className='cta-btn' onClick={handleSendComment}>Send</button>
    </div>
  )
}

export default CommentInput

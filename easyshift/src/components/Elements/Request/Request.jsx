import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import ShiftRequest from './Shift_Request'
import CommentInput from './CommentInput'
import CommentsIcon from './CommentsIcon'

const Request = ({ request }) => {
  const [isLocked, setIsLocked] = useState(false)
  const [addCommentNum, setAddCommentNum] = useState(0)
  
  const handleAddComment = () => {
    setAddCommentNum(addCommentNum + 1)
  }

  const handleLockedRequest = () => {
    setIsLocked(!isLocked)
  }
  
  useEffect(() => {
    
    if (request.locked_user_id !== null||undefined ) {
      setIsLocked(true)
    }
  },[])
    
  return (
    <div className={`request-card ${isLocked === true ? "request-card__locked" : ""}`}>
        <UserInfo username={request.username} role={request.role} />
        <ShiftRequest shiftStart={request.shift_start} shiftEnd={request.shift_end} request={request.request} />
        <CommentInput requestID={parseInt(request.id)} setAddCommentNum={()=>handleAddComment()} />
      <CommentsIcon lockedUserComment={parseInt(request.locked_user_id)} totalComments={parseInt(request.total_comments) + addCommentNum} requestID={parseInt(request.id)} />
    </div>
  )
}

export default Request

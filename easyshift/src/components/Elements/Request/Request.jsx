import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import ShiftRequest from './Shift_Request'
import CommentInput from './CommentInput'
import CommentsIcon from './CommentsIcon'

const Request = ({ request }) => {
  const [isLocked, setIsLocked] = useState(false)

  const handleLockedRequest = () => {
    setIsLocked(!isLocked)
  }
  
  useEffect(() => {
    console.log(request);
    if (request.locked_user_id !== null||undefined ) {
      setIsLocked(true)
    }
  },[])
    
  return (
    <div className={`request-card ${isLocked === true ? "request-card__locked" : ""}`}>
        <UserInfo username={request.username} role={request.role} />
        <ShiftRequest shiftStart={request.shift_start} shiftEnd={request.shift_end} request={request.request} />
        <CommentInput requestID={request.id} />
      <CommentsIcon lockedUserComment={request.locked_user_id} totalComments={request.total_comments} requestID={request.id} />
    </div>
  )
}

export default Request

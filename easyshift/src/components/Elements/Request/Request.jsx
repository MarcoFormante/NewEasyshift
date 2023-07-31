import React from 'react'
import UserInfo from './UserInfo'
import ShiftRequest from './Shift_Request'
import CommentInput from './CommentInput'
import CommentsIcon from './CommentsIcon'

const Request = ({ request }) => {
    
  return (
    <div className='request-card'>
        <UserInfo username={request.username} role={request.role} />
        <ShiftRequest shiftStart={request.shift_start} shiftEnd={request.shift_end} request={request.request} />
        <CommentInput requestID={request.id} />
      <CommentsIcon lockedUserComment={request.locked_user_id} totalComments={request.total_comments} />
    </div>
  )
}

export default Request

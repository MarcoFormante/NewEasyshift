import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import ShiftRequest from './Shift_Request'
import CommentInput from './CommentInput'
import CommentsIcon from './CommentsIcon'
import Comments from './Comments'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const Request = ({ request,setShowCommentsTarget, showComments}) => {
  const [isLocked, setIsLocked] = useState(false)
  const [addCommentNum, setAddCommentNum] = useState(0)
  const [newComment, setNewComment] = useState({})
  const [lockedUserComment, setLockUserComment] = useState(null)
  const userInfo = useSelector((state) => state.userInfo.value)
  
  useEffect(() => {
    setLockUserComment(parseInt(request?.locked_user_id))
  }, [])
  
  const handleAddComment = (comment) => {
    setNewComment({ id: 55,
      user_id: 1,
      username: "Name",
      request_id: 1,
      role:"Photographer",
      comment:comment.comment})
    setAddCommentNum(addCommentNum + 1)
  }

  const handleSubtractComment = () => {
      setAddCommentNum(addCommentNum - 1 )
  }

  const handleLockedRequest = () => {
    setIsLocked(!isLocked)
  }

 
  useEffect(() => {
    if (lockedUserComment) {
        setIsLocked(true)
    } else {
      setIsLocked(false)
    }
  },[lockedUserComment])
    
  return (
    <div  className='container__flex--center--column'>
    <div className={`request-card ${isLocked === true ? "request-card__locked" : ""}`} style={showComments ? {margin:0,} : {}}>
        <UserInfo username={request.username + `${request.user_id === userInfo.userID ? " (toi)" : ""}`} role={request.role} />
        <ShiftRequest shiftStart={request.shift_start} shiftEnd={request.shift_end} date={request.date} request={request.request} />
        <CommentInput userInfo={userInfo} requestID={parseInt(request.id)} handleAddComment={(value)=>handleAddComment(value)} />
        <CommentsIcon showComments={showComments} request={request} setShowCommentsTarget={ (value)=>setShowCommentsTarget(value)} totalComments={parseInt(request.total_comments) + addCommentNum} requestID={parseInt(request.id)} />
      </div>

      {showComments &&
        <Comments
          handleLockedRequest={handleLockedRequest}
          newComment={newComment}
          requestID={request.id}
          totalComments={parseInt(request.total_comments) + addCommentNum}
          handleSubtractComment={handleSubtractComment}
          lockedUserComment={lockedUserComment}
          setLockUserComment={setLockUserComment}
          request={request}
      /> 
      }
    </div>
  )
}

export default Request

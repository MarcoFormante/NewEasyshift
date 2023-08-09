import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import ShiftRequest from './Shift_Request'
import CommentInput from './CommentInput'
import CommentsIcon from './CommentsIcon'
import Comments from './Comments'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from '../../../AxiosApi/axios'
import CheckUser from '../../Helpers/CheckUser/CheckUser'

const Request = ({ request,setShowCommentsTarget, showComments}) => {
  const [isLocked, setIsLocked] = useState(false)
  const [addCommentNum, setAddCommentNum] = useState(0)
  const [newComment, setNewComment] = useState({})
  const [lockedUserComment, setLockUserComment] = useState(null)
  const userInfo = useSelector((state) => state.userInfo.value)
 
  useEffect(() => {
    if (request?.locked_user_id !== null) {
      setLockUserComment(parseInt(request?.locked_user_id))
    } 
  }, [])

  useEffect(() => {
    const formData = new FormData()
    formData.append("action", "getLockedUserId")
    formData.append("requestId",request.id)
    if (showComments) {
      axios.post(process.env.REACT_APP_API_URL + "requestApi.php", formData, {
        headers: {
          "Content-Type":"x-www-form-urlencoded"
        }
      }).then(response => {
        console.log(response.data);
        if (response.data.status === 1) {
          setLockUserComment(parseInt(response.data.lockedUserId))
        }
      })
    }
   
  },[showComments])
  
  const handleAddComment = (value) => {
    if (value.comment) {
      CheckUser(userInfo)
        .then(response => {
          if (response.data.status === 1) {
            const formData = new FormData()
            formData.append("action","sendComment")
            formData.append("userId",value.userId)
            formData.append("requestId",value.requestId)
            formData.append("comment",value.comment)
            axios.post(process.env.REACT_APP_API_URL + "/commentApi.php", formData, {
              headers: {
              "Content-Type":"x-www-form-urlencoded"
            }
            }).then(response => {
              console.log(response.data);
            if (response.data.status === 1) {
              if (showComments) {
                setNewComment({
                  id: response.data.id,
                  user_id: value.userId,
                  username: userInfo.username,
                  request_id: value.requestId,
                  role:userInfo.role,
                  comment:value.comment})
              }
              setAddCommentNum(addCommentNum + 1)
            } else {
              //Handle Data status 0
            }
          })
        } else {
          //Handle not Auth
        }
      })
    }
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
        <UserInfo username={request.username + `${request.user_id === userInfo?.userID ? " (toi)" : ""}`} role={request.role_id} />
        <ShiftRequest shiftStart={request.shift_start} shiftEnd={request.shift_end} date={request?.date} request={request.request} />
        <CommentInput userInfo={userInfo} requestID={parseInt(request.id)} handleAddComment={(value)=>handleAddComment(value)} />
        <CommentsIcon showComments={showComments} request={request} setShowCommentsTarget={ (value)=>setShowCommentsTarget(value)} totalComments={parseInt(request.total_comments) + addCommentNum} requestID={parseInt(request.id)} />
      </div>

      {showComments &&
        <Comments
          handleLockedRequest={handleLockedRequest}
          newComment={newComment}
          requestID={request.id}
          totalComments={parseInt(request?.total_comments) + addCommentNum}
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

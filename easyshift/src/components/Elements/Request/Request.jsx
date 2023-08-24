import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import ShiftRequest from './Shift_Request'
import CommentInput from './CommentInput'
import CommentsIcon from './CommentsIcon'
import Comments from './Comments'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from '../../../AxiosApi/axios'
import CheckUser from '../../Helpers/CheckUser/CheckUser'
import { setRequests } from '../../../Redux/userSlice'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { setAlert } from '../../../Redux/alertSlice'


const Request = ({ requestIndex, pageLimit, requestsLimit, request, showComments, deleteRequestFromArray }) => {
  
  const [isLocked, setIsLocked] = useState(false)
  const [newComment, setNewComment] = useState({})
  const [lockedUserComment, setLockUserComment] = useState(null)
  const userInfo = useSelector((state) => state.userInfo.value)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  

  useEffect(() => {
    if (request?.locked_user_id !== null) {
      setLockUserComment(parseInt(request?.locked_user_id))
    } 
  }, [])

  useEffect(() => {
    if (showComments) {
      const formData = new FormData()
      formData.append("action", "getLockedUserId")
      formData.append("requestId",request.id)
      if (showComments) {
        axios.post( "equestApi.php", formData, {
          headers: {
            "Content-Type":"x-www-form-urlencoded"
          }
        }).then(response => {
          if (response.data.status === 1) {
            setLockUserComment(parseInt(response.data.lockedUserId))
          }
        })
      }
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
            formData.append("comment", value.comment)
            formData.append("requestUserID",request.user_id)
            axios.post("commentApi.php", formData, {
              headers: {
              "Content-Type":"x-www-form-urlencoded"
            }
            }).then(response => {
              if (response.data.status === 1) {
                if (showComments || window.location.pathname.match(/viewRequest/g)) {
                  setNewComment({
                    id: response.data.commentId,
                    user_id: value.userId,
                    username: userInfo.username,
                    request_id: value.requestId,
                    role:userInfo.role,
                    comment:value.comment})
                }
                dispatch(setAlert({type:"success",text:"Your comment has been sent", title:"New Comment",timeout: 3000}))
            } else {
              dispatch(setAlert({type:"error",text:"Error while sending comment, try later", title:"Connection Problem",timeout: 3000}))
            }
          })
        } else {
          navigate("/")
        }
      })
    }
  }



  const handleLockedRequest = () => {
    setIsLocked(!isLocked)
  }


  const deleteRequest = () => {
    const userWantsDelete = window.confirm("Do you want to delete this Post")
    if (userWantsDelete) {
      CheckUser(userInfo)
        .then(response => {
        if (response.data.status === 1) {
          axios.post( "requestApi.php", {
            action: "deleteRequest",
            requestId : request.id
          }, {
            headers: {
              "Content-Type":"multipart/form-data"
            }
          }) 
            .then(response => {
              if (response.data.status === 1) {
                  dispatch(setAlert({type:"success",text:"Your Post has been deleted", title:"Post Deleted",timeout: 3000}))
                if (userInfo.requests && userInfo.requests > 0) {
                  dispatch(setRequests(userInfo.requests - 1))
                }
                  deleteRequestFromArray(request.id)
                  // const lockedUserId = response.data.lockedUserId
                  // if (lockedUserId !== false && lockedUserId !== null) {
                  //       axios.post( "otificationApi.php", {
                  //       action: "sendNotificationAfterPostDeletetion",
                  //       fromUserId: userInfo.userID,
                  //       message : `has deleted his Post where you were chosen to change shift`,
                  //       userId: lockedUserId
                  //   },{
                  //     headers: {
                  //       "Content-Type":"multipart/form-data"
                  //       }
                  //   })
                  // }
              } else {
                dispatch(setAlert({type:"error",text:"Your Post can't be deleted at the moment, try later", title:"Connection Problem",timeout: 3000}))
              }
          })
        } else {
          navigate("/")
        }
      })
    }
  }
 
  useEffect(() => {
    if (lockedUserComment) {
        setIsLocked(true)
    } else {
      setIsLocked(false)
    }
  }, [lockedUserComment])
  

    
  return (
    <div className='container__flex--center--column'>
      
      <div className={`request-card ${isLocked === true ? "request-card__locked" : ""}`}
        style={showComments || window.location.pathname.match(/viewRequest/g) ? { margin: 0 } : {}}
      >
        {/* request Delete Button  */}
        {request.user_id === userInfo?.userID && <div className='request-card__deleteIcon' onClick={deleteRequest}>
          <div></div>
        </div>}

        {/* About User */}
        <UserInfo
          requestIndex={requestIndex}
          username={request.username + `${request.user_id === userInfo?.userID ? " (toi)" : ""}`}
          role={request.role_id}
        />

        {/* About Shift and Request message */}
        <ShiftRequest
          shiftStart={request.shift_start}
          shiftEnd={request.shift_end}
          date={request.date}
          request={request.request}
        />

        {/* text Input to send a comment */}
        <CommentInput
          userInfo={userInfo}
          requestID={parseInt(request.id)}
          handleAddComment={(value) => handleAddComment(value)}
        />

        {/* Date of Request Creation & Comments Icon to navigate to View Post page */}
        <CommentsIcon requestIndex={requestIndex}
          pageLimit={pageLimit}
          requestsLimit={requestsLimit}
          showComments={showComments}
          request={request}
         />
      </div>

      {(location.pathname.match(/viewRequest/g))  &&
        <Comments
          handleLockedRequest={handleLockedRequest}
          newComment={newComment}
          requestID={request.id}
          lockedUserComment={lockedUserComment}
          setLockUserComment={setLockUserComment}
          request={request}
      /> 
      }
    </div>
  )
}

export default Request

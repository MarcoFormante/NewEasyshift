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
import { useLocation } from 'react-router-dom'


const Request = ({ requestIndex, pageLimit, requestsLimit, request, showComments, deleteRequestFromArray }) => {
  
  const [isLocked, setIsLocked] = useState(false)
  const [newComment, setNewComment] = useState({})
  const [lockedUserComment, setLockUserComment] = useState(null)
  const userInfo = useSelector((state) => state.userInfo.value)
  const dispatch = useDispatch()
  const location = useLocation()
  

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
            axios.post(process.env.REACT_APP_API_URL + "/commentApi.php", formData, {
              headers: {
              "Content-Type":"x-www-form-urlencoded"
            }
            }).then(response => {
              console.log("target",response.data);
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



  const handleLockedRequest = () => {
    setIsLocked(!isLocked)
  }


  const deleteRequest = () => {
    const userWantsDelete = window.confirm("Do you want to delete this Post")
    if (userWantsDelete) {
      CheckUser(userInfo)
        .then(response => {
          console.log(response.data);
        if (response.data.status === 1) {
          axios.post(process.env.REACT_APP_API_URL + "requestApi.php", {
            action: "deleteRequest",
            requestId : request.id
          }, {
            headers: {
              "Content-Type":"multipart/form-data"
            }
          }) 
            .then(response => {
              console.log(response.data)
              if (response.data.status === 1) {
                if (userInfo.requests && userInfo.requests > 0) {
                  dispatch(setRequests(userInfo.requests - 1))
                }
                  deleteRequestFromArray(request.id)
                  const lockedUserId = response.data.lockedUserId
                  if (lockedUserId !== false && lockedUserId !== null ) {
                        axios.post(process.env.REACT_APP_API_URL + "notificationApi.php", {
                        action: "sendNotificationAfterPostDeletetion",
                        fromUserId: userInfo.userID,
                        message : `has deleted his Post where you were chosen to change shift`,
                        userId: lockedUserId
                    },{
                      headers: {
                        "Content-Type":"multipart/form-data"
                        }
                    }).then(response => 
                        console.log(response.data))
                  }
              }
          })
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

import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import Locked from '../../../icons/locked.svg'
import NoLocked from '../../../icons/noLocked.svg'
import axios from '../../../AxiosApi/axios'
import { useSelector } from 'react-redux'

const Comments = ({ request, newComment,lockedUserComment,handleSubtractComment,totalComments,setLockUserComment }) => {
    const [comments, setComments] = useState([])
    const [noComments,setNoComments]=useState(false)
    const userInfo = useSelector((state) => state.userInfo.value)

//Get request Comments
    useEffect(() => {
        const formData = new FormData()
        formData.append("action","getComments")
        formData.append("requestId",request?.id)
        axios.post(process.env.REACT_APP_API_URL + "commentApi.php", formData, {
            headers: {
                "Content-Type":"x-www-form-urlencoded"
            }
        }).then(response => {
            console.log(response.data);
            if (response.data.status === 1) {
                
                if (response?.data?.rowCount > 0) {
                    setComments([...response.data.comments])
                    setNoComments(false)
                } else {
                    setNoComments(true)
                }
            }
        })
    }, [])

//Delete Comment
    const onDeleteComment = (comment) => {
        if (comment.user_id !== lockedUserComment) {
            if (comment.user_id === userInfo.userID) {
                const formData = new FormData()
                formData.append("action", "deleteComment")
                formData.append("commentId", comment.id)
                formData.append("username", comment.username)
                formData.append("requestId", comment.request_id)
                formData.append("userId",comment.user_id)
                axios.post(process.env.REACT_APP_API_URL + "commentApi.php",
                    formData,
                    {
                        headers: {
                            "Content-Type":"x-www-form-urlencoded"
                        }
                    })
                    .then(response => {
                        console.log(response.data);
                        if (response.data.status === 1) {
                            setComments(comments.filter(c => c.id !== comment.id))
                            if (totalComments > 0) {
                                handleSubtractComment()
                        }
                    }
                })
            }
        }
        
    }

    const handleLockedRequest = (commentUserID) => {
        let userIsHandlingLockStatus = (commentUserID === userInfo.userID && lockedUserComment === userInfo.userID)
        if ((request.user_id === userInfo.userID ||  userIsHandlingLockStatus)) {
            const formData = new FormData()
            formData.append("action", "lockUserId")
            formData.append("requestId", request.id)
            formData.append("fromUserId", userInfo.userID)
            
            if (lockedUserComment === commentUserID) {
                if (!userIsHandlingLockStatus) {
                    formData.append("lockedUserId",JSON.stringify(["null",commentUserID]))
                } else {
                    formData.append("lockedUserId",JSON.stringify(["null",request.user_id]))
                }
                
                axios.post(process.env.REACT_APP_API_URL + "requestApi.php", formData, {
                    headers: {
                            "Content-Type":"x-www-form-urlencoded"
                        }
                }).then(response => {
                    console.log(response.data.lockedUserId);
                        if (response.data.status === 1) {
                            setLockUserComment(response.data.lockedUserId)
                            request.locked_user_id = response.data.lockedUserIdl
                    }
                })
                   
            } else {
                formData.append("lockedUserId",JSON.stringify(["notNull",commentUserID]))
                axios.post(process.env.REACT_APP_API_URL + "requestApi.php", formData, {
                    headers: {
                            "Content-Type":"x-www-form-urlencoded"
                        }
                }).then(response => {
                    console.log(response.data);
                        if (response.data.status === 1) {
                            setLockUserComment(response.data.lockedUserId)
                            request.locked_user_id = response.data.lockedUserId
                        }
                    })
                  
            }
        }
    }
    

    useEffect(() => {
        if (newComment.username) {
            setComments(prev => [...prev,{...newComment}])
        }
    }, [newComment])
    

  return (
      <div className='request-card__comments__section'>
       
            {comments && comments.map((comment) =>
                <div key={comment.id + Math.random()} className='request-card__comment'>
                    <div className='request-card__comment__user-info'>
                        <UserInfo
                            username={
                                comment.user_id === userInfo.userID
                                ? comment.username + " (toi)"
                                : comment.username
                            }
                            role={comment.role_id}
                        />
                    </div>
                    <div className='request-card__comment__text container__flex--center--row'>
                        {comment.comment}
                    </div>

                    <div className='request-card__comment__last'>
                        <span className='delete btn'
                            onClick={() => onDeleteComment(comment)}
                            style={comment.user_id !== userInfo.userID
                                ? { cursor: "auto", visibility: "hidden" }
                                : {}
                            }
                        >
                        </span>
                        <span
                            className='lock btn'
                            onClick={() =>comment.user_id  !== request.user_id && handleLockedRequest(comment.user_id)}
                            style={(lockedUserComment === comment.user_id)
                                ?
                                { backgroundImage: `url(${Locked})`, }
                                :
                                { backgroundImage: `url(${NoLocked})` }}>
                        </span>
                    </div>
                </div>
            )
        }
          {noComments && comments.length < 1
              ? <div className='container__flex--center--row mar-top-m'>
                    <span>No comments yet..</span>
                </div>
              : ""
          }
          
        </div>
    
  )
}

export default Comments

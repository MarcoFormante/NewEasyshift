import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import Locked from '../../../icons/locked.svg'
import NoLocked from '../../../icons/noLocked.svg'
import axios from '../../../AxiosApi/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../../../Redux/alertSlice'

const Comments = ({ request, newComment,lockedUserComment,handleSubtractComment,totalComments,setLockUserComment }) => {
    const [comments, setComments] = useState([])
    const [noComments,setNoComments]=useState(false)
    const userInfo = useSelector((state) => state.userInfo.value)
    const dispatch = useDispatch()

//Get request Comments
    useEffect(() => {
        const formData = new FormData()
        formData.append("action","getComments")
        formData.append("requestId",request?.id)
        axios.post("commentApi.php", formData, {
            headers: {
                "Content-Type":"x-www-form-urlencoded"
            }
        }).then(response => {
            if (response.data.status === 1) {
                if (response?.data?.rowCount > 0) {
                    setComments([...response.data.comments])
                    setNoComments(false)
                } else {
                    setNoComments(true)
                }
            } else {
                dispatch(setAlert({type:"error",text:"At the moment, it is not possible to get the comments",title:"Connection Problem",timeout:3000}))
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
                formData.append("userId", comment.user_id)
                axios.post("commentApi.php",
                    formData,
                    {
                        headers: {
                            "Content-Type": "x-www-form-urlencoded"
                        }
                    })
                    .then(response => {
                        if (response.data.status === 1) {
                            dispatch(setAlert({type:"success",text:"This comment has been deleted",title:"Comment Deleted",timeout:3000}))
                            setComments(comments.filter(c => c.id !== comment.id))
                            if (totalComments > 0) {
                                handleSubtractComment()
                            }
                        } else {
                            dispatch(setAlert({type:"error",text:"At the moment, it is not possible to delete the comment, try later",title:"Connection Problem",timeout:3000}))
                        }
                    })
            }
        }
    }

    const handleLockedRequest = (commentUserID,commentUsername) => {
        let userIsHandlingLockStatus = (commentUserID === userInfo.userID && lockedUserComment === userInfo.userID)
        if ((request.user_id === userInfo.userID ||  userIsHandlingLockStatus)) {
            const formData = new FormData()
            formData.append("action", "lockUserId")
            formData.append("requestId", request.id)
            formData.append("fromUserId", userInfo.userID)
            
            if (lockedUserComment === commentUserID) {
                //if it's not user that is handling the lock status
                if (!userIsHandlingLockStatus) {
                    formData.append("lockedUserId",JSON.stringify(["null",commentUserID]))
                } else {
                      //if it's the User that is handling the lock status
                    formData.append("lockedUserId", JSON.stringify(["null", request.user_id]))
                    
                }
                axios.post("requestApi.php", formData, {
                    headers: {
                            "Content-Type":"x-www-form-urlencoded"
                        }
                }).then(response => {
                    if (response.data.status === 1) {
                        setLockUserComment(response.data.lockedUserId)
                        request.locked_user_id = response.data.lockedUserIdl
                        dispatch(setAlert({type:"info",text:"Now this Post is Unlocked ",title:"Unlocked Post",timeout:3000}))
                    }
                })
                   
            } else {
                formData.append("lockedUserId",JSON.stringify(["notNull",commentUserID]))
                axios.post("requestApi.php", formData, {
                    headers: {
                            "Content-Type":"x-www-form-urlencoded"
                        }
                }).then(response => {
                        if (response.data.status === 1) {
                            setLockUserComment(response.data.lockedUserId)
                            request.locked_user_id = response.data.lockedUserId
                            dispatch(setAlert({type:"success",text:`You choose ${commentUsername}. This Post is now Locked`,title:"Locked Post",timeout:3000}))
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
                            onClick={() =>comment.user_id  !== request.user_id && handleLockedRequest(comment.user_id,comment.username)}
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

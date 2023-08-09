import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import Locked from '../../../icons/locked.svg'
import NoLocked from '../../../icons/noLocked.svg'
import axios from '../../../AxiosApi/axios'
import { useSelector } from 'react-redux'

const Comments = ({ request, newComment,lockedUserComment,handleSubtractComment,totalComments,setLockUserComment }) => {
    const [comments, setComments] = useState([])
    const userInfo = useSelector((state) => state.userInfo.value)
    console.log(comments);
    // if (isset($_POST['commentId']) && isset($_POST['username']) && isset($_POST['requestId']) && isset($_POST['userId'])) {
    const onDeleteComment = (comment) => {
        console.log(comment);
        if (comment.user_id !== lockedUserComment) {
            if (comment.user_id === userInfo.userID) {
                const formData = new FormData()
                formData.append("action", "deleteComment")
                formData.append("commentId", comment.id)
                formData.append("username", comment.username)
                formData.append("requestId", comment.request_id)
                formData.append("userId",comment.user_id)
                axios.post(process.env.REACT_APP_API_URL + "commentApi.php", formData, {
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
        if (request.user_id === userInfo.userID) {
            if (commentUserID !== userInfo.userID) {
                if (lockedUserComment === commentUserID) {
                    setLockUserComment(null)
                    request.locked_user_id = null
                } else {
                    setLockUserComment(commentUserID)
                    request.locked_user_id = commentUserID
                }
            } else {
                //HANDLE IS YOUR REQUEST BRO!
            }
           
        }
    }
    
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
                }
            }
        })
    }, [])
    
    useEffect(() => {
        if (newComment.username) {
            setComments(prev => [...prev,{...newComment}])
        }
    },[newComment])

  return (
        <div className='request-card__comments__section'>
            {comments && comments.map((comment,index) =>
                <div key={comment.id + Math.random()} className='request-card__comment'>
                    <div className='request-card__comment__user-info'>
                        <UserInfo username={comment.user_id === userInfo.userID ? comment.username + " (toi)" : comment.username} role={comment.role_id} />
                    </div>
                    <div className='request-card__comment__text container__flex--center--row'>
                        {comment.comment}
                    </div>

                    <div className='request-card__comment__last'>
                        <span className='delete btn' onClick={()=>onDeleteComment(comment)}></span>
                        <span className='lock btn' onClick={() => handleLockedRequest(comment.user_id)}
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
        </div>
    
  )
}

export default Comments

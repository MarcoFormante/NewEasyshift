import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import Locked from '../../../icons/locked.svg'
import NoLocked from '../../../icons/noLocked.svg'

const Comments = ({ request, newComment,lockedUserComment,handleSubtractComment,totalComments,setLockUserComment }) => {
    const [comments, setComments] = useState([])

    const onDeleteComment = (comment) => {
            if (comment.user_id !== lockedUserComment) {
                setComments(comments.filter(c => c.id !== comment.id))
            if (totalComments > 0) {
                handleSubtractComment()
            }
        }
        
    }

    const handleLockedRequest = (commentUserID) => {
        if (lockedUserComment === commentUserID) {
            setLockUserComment(null)
            request.locked_user_id = null
        } else {
            setLockUserComment(commentUserID)
            request.locked_user_id = commentUserID
        }
    }
    
    useEffect(() => {
        setComments([
            {
                id: 1,
                user_id: 1,
                username: "Name",
                request_id: 1,
                role:"Photographer",
                comment:"test comment"
            },
            {
                id: 2,
                user_id: 2,
                username: "Name",
                role:"Duty",
                request_id: 2,
                comment:"test comment"
            },
            {
                id: 3,
                user_id: 3,
                username: "Name",
                role:"Photographer",
                request_id: 3,
                comment:"test comment"
            },
        ]) 
    }, [])
    
    useEffect(() => {
        if (newComment.username) {
            setComments(prev => [...prev,{...newComment}])
        }
    },[newComment])

  return (
        <div className='request-card__comments__section'>
            {comments && comments.map(comment =>
                <div key={comment.id} className='request-card__comment'>
                    <div className='request-card__comment__user-info'>
                        <UserInfo username={comment.username} role={comment.role} />
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

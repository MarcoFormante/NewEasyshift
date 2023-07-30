import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Notifications = ({handleWindowToggle}) => {
    const [notifications, setNotifications] = useState([])
    const navigate = useNavigate()

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id))
    }

    const viewRequest = (id) => {
        navigate("/viewRequest/" + id)
        handleWindowToggle("")
    }

    
    
useEffect(() => {
    setNotifications([
        {
            id: 1,
            user_id: 1,
            request_id: 1,
            message: "John comments your post"
        },

        {
            id: 2,
            user_id: 2,
            request_id: 2,
            message: "John comments your post"
        },

      ])
}, [])
    
    return (
        <div>
            <div className='sidebar__title'>Notifications</div>
            <div className='notifications'>
                <div className='notifications__container'>
                {notifications && notifications.map((notif, index) =>
                    <div key={notif.id} className='notifications__notif container__flex--center--row gap-20'>
                        <div className='notifications__notif__message btn' onClick={()=>viewRequest(notif.request_id)}>{notif.message}</div>
                        <div className='notifications__notif__delete btn' onClick={()=>deleteNotification(notif.id)}></div>
                    </div>
                )
                }
                </div>
            </div>
        </div>
    )
}

export default Notifications

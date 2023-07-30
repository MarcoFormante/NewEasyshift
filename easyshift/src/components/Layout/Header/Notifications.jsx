import React, { useEffect, useState } from 'react'

const Notifications = () => {
    const [notifications, setNotifications] = useState([])

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id))
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
                        <div className='notifications__notif__message btn'>{notif.message}asdjkashdkjsad </div>
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

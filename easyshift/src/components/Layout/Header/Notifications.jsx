import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../../AxiosApi/axios'
import CheckUser from '../../Helpers/CheckUser/CheckUser'
import { useSelector } from 'react-redux'

const Notifications = ({handleWindowToggle,windowToggle,windowType}) => {
    const [notifications, setNotifications] = useState([])
    const navigate = useNavigate()
    const userInfo = useSelector((state)=>state.userInfo.value)

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id))
    }

    const viewRequest = (id) => {
        navigate("/viewRequest/" + id)
        handleWindowToggle("")
    }

    
    
    useEffect(() => {
        if (windowToggle && windowType === "Notifications") {
            CheckUser(userInfo)
                .then(response => {
                    if (response.data.status === 1) {
                        const formdata = new FormData()
                        formdata.append("action", "getUserNotifications")
                        formdata.append("userId",userInfo.userID)
                        axios.post(process.env.REACT_APP_API_URL + "notificationApi.php", formdata, {
                            headers: {
                                "Content-Type":"x-www-form-urlencoded"
                            }
                        })
                        .then(response => {
                            console.log(response.data);
                            if (response.data.status === 1) {
                            setNotifications([...response.data.notifications])
                        }
                    })
                } else {
                    //handle status 0
                }
            })
    }
   
}, [windowToggle])
    
    return (
        <div>
            <div className='sidebar__title'>Notifications</div>
            <div className='notifications'>
                <div className='notifications__container'>
                {notifications && notifications.map((notif, index) =>
                    <div key={notif.id} className={`notifications__notif container__flex--center--row gap-20 ${notif.viewed === 0 ? "notifications__notif__notViewed" : ""}`}>
                        <div className='notifications__notif__message btn' onClick={()=>viewRequest(notif.request_id)}>{`${notif.username} ${notif.message}`}</div>
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

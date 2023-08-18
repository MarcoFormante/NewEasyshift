import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../../AxiosApi/axios'
import CheckUser from '../../Helpers/CheckUser/CheckUser'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../../../Redux/alertSlice'

const Notifications = ({handleWindowToggle,windowToggle,windowType}) => {
    const [notifications, setNotifications] = useState([])
    const navigate = useNavigate()
    const userInfo = useSelector((state) => state.userInfo.value)
    const location = useLocation()
    const dispatch = useDispatch()
    

    const deleteNotification = (id) => {
        CheckUser(userInfo)
            .then(response => {
            if (response.data.status === 1) {
                axios.post(process.env.REACT_APP_API_URL + "notificationApi.php",
                    {
                        notificationId: id,
                        action: "deleteNotification"
                    }, {
                    headers: {
                        "Content-Type":"multipart/form-data"
                    }
                })
            }
        })
        setNotifications(notifications.filter(notif => notif.id !== id))
    }

    const viewRequest = (requestId, viewed, notificationId) => {
        if (viewed === 0) {
            axios.post(process.env.REACT_APP_API_URL + "notificationApi.php", {
                action: "markNotificationAsViewed",
                notificationId
            }, {
                headers: {
                    "Content-Type":"multipart/form-data"
                }
            })
        }
        if (requestId !== -1) {
            navigate("/viewRequest/" + requestId, {
                state:
                {
                    requestId,
                    pathname: location.pathname.match(/viewRequest/g) ? "/home" : location.pathname,
                    trigger: Math.random(),
                    notificationId: notificationId ?? null
                }   
            })
            
            } else {
                dispatch(setAlert({type:"warning",text:"This Post has been Deleted",title:"Post Deleted",timeout:3000}))
                
            }

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
                            if (response.data.status === 1) {
                            setNotifications([...response.data.notifications])
                        }
                    })
                } else {
                    dispatch(setAlert({type:"warning",text:"It is not possible to show notifications at the moment",title:"Connection Problem",timeout:3000}))
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
                        <div className='notifications__notif__message btn' onClick={() => {
                            viewRequest(notif.request_id, notif.viewed, notif.id)
                        }}>{`${notif.username} ${notif.message}`}</div>
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

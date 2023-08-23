
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Title from '../../Layout/Title/Title'
import TableAdmin from './TableAdmin'
import { useDispatch } from 'react-redux'
import axios from '../../../AxiosApi/axios'
import { setAlert } from '../../../Redux/alertSlice'
import ShowMore from '../../Elements/ShowMore/ShowMore'


const Notifications = () => {
   
  const [notifications, setNotifications] = useState([])
  const [pageLimit, setPageLimit] = useState(0)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [canShowMore, setCanShowMore] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
      axios.post("notificationApi.php", {action: "getAllNotifications",  limit : pageLimit * 10 }, {
          headers: {
            "Content-Type":"multipart/form-data"
        }
      }) 
        .then(response => {
        console.log(response.data);
        if (response.data.status === 1) {
              const newNotifications = response.data.notifications 
              setNotifications([...notifications, ...newNotifications])
              setIsLoadingData(false)
              if (response.data.notifications.length  > 5) {
                  setCanShowMore(true)
              } else {
                setCanShowMore(false)    
            }
        } else {
              if (response?.data?.message?.match(/Error : no more notifications/)) {
                  dispatch(setAlert({type:"info",text:" No more notifications",title:"",timeout:5000}))
              } else {
                 dispatch(setAlert({type:"error",text:"Connection Problem",title:"Error",timeout:5000}))
              }
          }
      })
  }, [pageLimit])
  


  const deleteNotification = (id) => {
    axios.post("notificationApi.php",{ action: "deleteNotification", notificationId: id }, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })
      .then(response => {
        if (response.data.status === 1) {
            setNotifications(notifications.filter(notification => notification.id !== id))
            dispatch(setAlert({ type: "success", text: "Notification Deleted", title: "Success", timeout: 5000 }))
        } else {
            dispatch(setAlert({type:"error",text:"Connection Problem",title:"Error",timeout:5000}))
        }
    })
}


  return (
    <div>
          
    <div>
        <Link to={"/admin/home"}><span className='back-btn' style={{top:5}}></span></Link>
        <Title title={"Notifications"} />

        <TableAdmin
            target={"notifications"}
            notifications={notifications}
            deleteNotification={deleteNotification}
        />

        <ShowMore maxLength={6}
                pageLimit={pageLimit + 1}
                canShowMore={canShowMore}
                isLoadingData={isLoadingData}
                setIsLoadingData={(value) => setIsLoadingData(value)}
                setPageLimit={(value) => setPageLimit(value)}
            />
        </div> 
        
      
</div>
  )
}

export default Notifications

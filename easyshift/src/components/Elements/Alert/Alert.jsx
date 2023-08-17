import React, { useCallback, useEffect } from 'react'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useSelector } from 'react-redux';



const Alert = () => {
    const alert = useSelector(state => state.alert.value)
    

    const createNotification = useCallback((type) => {
        switch(type) {
            case 'info':
        NotificationManager.info(alert.text,alert.title,alert.timeout,null,alert.priority);
        break;
        case 'success':
        NotificationManager.success(alert.text,alert.title,alert.timeout,null,alert.priority);
        break;
        case 'warning':
        NotificationManager.warning(alert.text,alert.title,alert.timeout,null,alert.priority);
        break;
        case 'error':
        NotificationManager.error(alert.text,alert.title,alert.timeout,null,alert.priority);
        break;
        default:
        break;
    }
    },[alert]) 
        
        
    useEffect(() => {
        if (alert.text) {
            createNotification(alert.type)
        }
       
    },[alert])
    
  return (
        <div>
        <NotificationContainer/>
     </div>
  )
}

export default Alert


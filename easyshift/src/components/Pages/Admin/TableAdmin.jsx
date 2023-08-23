import React, { useEffect, useState } from 'react'

const TableAdmin = (props) => {
    const [tHeads, setTheads] = useState([])
    
//target = admin pages (users,requests,notifications)
    useEffect(() => {
        switch (props.target) {
           
        case "users":
            setTheads(["ID","Username","Role","isValidate","Modify","Delete"])
        break;
            
        case "requests":
            setTheads(["ID","Username","Role","Date","Shift start","Shift end","Request","Total comments", "Locked userID","Created on","Delete"])
        break;  
        
        case "notifications":
            setTheads(["ID","User Id","Message","viewed","Request ID","From userID","Delete"])
        break;     
           
       
        default:
            break;
       }
        
    }, [props.target])
    

    return (
        <div>
            <div className={'overflow-y--hidden scroll-visible'}>
                <table className='admin-table' style={{ width: "100%", textAlign: "center" }}>
                    <thead>
                        <tr>
                            {tHeads.map(th =>
                                <th key={"sd" + th}>{th}</th>
                            )}
                        </tr>
                    </thead>
                        <tbody>
                     {/* IF Target is users */}       
               {props.users && props.users.map((user, index) =>          
                    <tr key={user.id + "_users"}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.role_id}</td>
                        <td>
                           <input
                                type="checkbox"
                                className='btn'
                                defaultChecked={user.is_validate}
                                onClick={() => props.handleValidateUser(user.id,user.is_validate,index)}
                            />
                       </td>
                        <td><span className='edit btn' onClick={()=>props.handleModifyUserValues(user.username,user.role_id,user.id)}></span></td>
                        <td><span className='delete btn' onClick={() => props.deleteUser(user.id,index)}></span></td>
                    </tr>
                        )}

                    {/* IF Target is Requests */}
                        {props.requests && props.requests.map((request, index) =>          
                    <tr key={request.id + "_requests"}>
                        <td>{request.id}</td>
                        <td>{request.username}</td>
                        <td>{request.role_id}</td>
                        <td>{new Date(request.date).toLocaleDateString()}</td>
                        <td>{request.shift_start}</td>
                        <td>{request.shift_end}</td>
                        <td style={{minWidth:200}}>{request.request}</td>
                        <td>{request.total_comments}</td>
                        <td>{request.locked_user_id || "null"}</td>
                        <td>{request.created_on}</td>
                        <td><span className='delete btn' onClick={() => props.deleteRequest(request.id,index)}></span></td>
                    </tr>
                        )}
                        

                        {/* setTheads(["ID","User Id","Message","viewed","Request ID","From userID","Delete"]) */}
                        {/* IF Target is Notifications */}
                          {props.notifications && props.notifications.map((notification, index) =>          
                    <tr key={notification.id + "_notifications"}>
                        <td>{notification.id}</td>
                        <td>{notification.user_id}</td>
                        <td style={{minWidth:200}}>{notification.username + " " + notification.message}</td>
                        <td>{notification.viewed}</td>
                        <td>{notification.request_id}</td>
                        <td>{notification.from_user_id}</td>
                        <td><span className='delete btn' onClick={() => props.deleteNotification(notification.id)}></span></td>
                    </tr>
                    )}
                        </tbody>
                </table>
              </div>
        </div>
    )
}

export default TableAdmin

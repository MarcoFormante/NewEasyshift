import React, { useEffect, useState } from 'react'

const TableAdmin = (props) => {
    const [tHeads, setTheads] = useState([])
    
//target = admin pages (users,requests,notifications)
    useEffect(() => {
       switch (props.target) {
        case "users":
            setTheads(["ID","Username","Role","isValidate","Modify","Delete"])
            break;
       
        default:
            break;
       }
        
    }, [props.target])
    
    
    return (
        <div>
            <div className={'container__flex--center--row'}>
                <table style={{width:"100%",textAlign:"center"}}>
                    <thead>
                        <tr>
                            {tHeads.map(th =>
                                <>
                                    <th>{th}</th>
                                </>
                            )}
                        </tr>
                    </thead>
                        <tbody>
                            
               {props.users && props.users.map((user, index) =>          
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.role_id}</td>
                        <td>
                            <input type="checkbox"
                                defaultChecked={user.is_validate}
                                onClick={() => props.handleValidateUser(user.id,user.is_validate,index)}
                            />
                       </td>
                        <td onClick={()=>props.handleModifyUserValues(user.username,user.role_id,user.id)}>modify</td>
                        <td onClick={() => props.deleteUser(user.id,index)}>delete</td>
                    </tr>
                    )}
                        </tbody>
                </table>
              </div>
        </div>
    )
}

export default TableAdmin

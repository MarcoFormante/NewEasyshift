import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../../AxiosApi/axios'
import Title from '../../Layout/Title/Title'
import ShowMore from '../../Elements/ShowMore/ShowMore'
import { setUser } from '../../../Redux/userSlice'

const Users = () => {
    const [users, setUsers] = useState([])
    const [pageLimit, setPageLimit] = useState(0)
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [canShowMore,setCanShowMore] = useState(false)

    useEffect(() => {
        axios.post("userApi.php", {action: "getAllUsers", page : pageLimit * 10}, {
            headers: {
              "Content-Type":"multipart/form-data"
          }
        }) 
        .then(response => {
            if (response.data.status === 1) {
                const newUsers = response.data.users 
                setUsers([...users, ...newUsers])
                setIsLoadingData(false)
                if (response.data.users.length  > 5) {
                    setCanShowMore(true)
                } else {
                    setCanShowMore(false)
                }
            }     
        })
    },[pageLimit])


    const handleValidateUser = (userId,isValidate,index ) => {
        console.log(userId,isValidate,index )
        let value = 0;
        if (isValidate === 0) {
            value = 1
        } else if (isValidate === 1) {
            value = 0;
        }
        console.log(value);
        const formdata = new FormData()
        formdata.append("action","validateUser")
        formdata.append("userId",userId)
        formdata.append("value",value)
        axios.post("userApi.php", formdata
        ).then(response => {
            console.log(response.data);
            if (response.data.status === 1) {
                users[index].is_validate = value
                console.log(users[index]);
                console.log(response.data);
            }
        })
    }

    
    const deleteUser = (id, index) => {
       
        users.slice(index,index + 1)
        axios.post("userApi.php",{ action: "adminDeleteUser", id }, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
            .then(response => {
            if (response.data.status === 1) {
                setUsers(users.filter(user => user.id !== id))
            }
        })
    }
    

  return (
    <div>
          <Link to={"/admin/home"}>Back</Link>
          <Title title={"Users"} />
          <TableAdmin
              target={"users"}
              handleValidateUser={handleValidateUser}
              users={users}
              deleteUser={deleteUser}
          />
           <ShowMore maxLength={6}
                pageLimit={pageLimit + 1}
                canShowMore={canShowMore}
                isLoadingData={isLoadingData}
                setIsLoadingData={(value) => setIsLoadingData(value)}
                setPageLimit={(value) => setPageLimit(value)}
            />
    </div>
  )
}

export default Users


const TableAdmin = (props) => {
    const [tHeads, setTheads] = useState([])
   const navigate = useNavigate()

    useEffect(() => {
       switch (props.target) {
        case "users":
            setTheads(["ID","Username","Role","isValidate","Modify","Delete"])
            break;
       
        default:
            break;
       }
        
    },[props.target])
    
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
                        <td>modify</td>
                        <td onClick={() => props.deleteUser(user.id,index)}>delete</td>
                    </tr>
                    )}
                        </tbody>
                </table>
              </div>
        </div>
    )
}
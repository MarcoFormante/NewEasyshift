import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../../AxiosApi/axios'
import Title from '../../Layout/Title/Title'

const Users = () => {
    const [users, setUsers] = useState([])
    const [page,setPage]=useState(0)

    useEffect(() => {
        axios.post("userApi.php", {action: "getAllUsers", page : page * 10}, {
            headers: {
              "Content-Type":"multipart/form-data"
          }
        }) 
        .then(response => {
            if (response.data.status === 1) {
                console.log(response.data.users);
                const newUsers = response.data.users 
                setUsers([...users,...newUsers])
            }     
        })
    },[page])


    const handleValidateUser = (userId, isValidate,index) => {
        let value;
        if (isValidate === 0) {
            value = 1
        } else if (isValidate === 1) {
            value = 0;
        }
        
        const formdata = new FormData()
        formdata.append("action","validateUser")
        formdata.append("userId",userId)
        formdata.append("value",value)
        axios.post("userApi.php", formdata
        ).then(response => {
            if (response.data.status === 1) {
                users[index].isValidate = value
                console.log(users[index]);
                console.log(response.data);
            }
        })
    }
    
console.log(users[0]);
  return (
    <div>
          <Link to={"/admin/home"}>Back</Link>
          <Title title={"Users"} />

          <div className={'container__flex--center--row'}>
            <table style={{width:"100%",textAlign:"center"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>IsValidated</th>
                    </tr>
                </thead>
                <tbody>
              {users && users.map((user, index) =>          
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                      <td>
                        <input type="checkbox"
                            defaultChecked={user.isValidate}
                            onClick={() => handleValidateUser(user.id,user.isValidate,index)}
                        />
                      </td>
                    <td>modify</td>
                    <td>delete</td>
                </tr>
                )}
                    </tbody>
            </table>
        </div>
    </div>
  )
}

export default Users
// onClick={()=>setPage(page + 1)
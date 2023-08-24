import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../../AxiosApi/axios'
import Title from '../../Layout/Title/Title'
import ShowMore from '../../Elements/ShowMore/ShowMore'
import TableAdmin from './TableAdmin'
import { setAlert } from '../../../Redux/alertSlice'
import { useDispatch, useSelector } from 'react-redux'
import CheckUser from '../../Helpers/CheckUser/CheckUser'


const Users = () => {
    const [users, setUsers] = useState([])
    const [pageLimit, setPageLimit] = useState(0)
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [canShowMore, setCanShowMore] = useState(false)
    const [valuesToModify, setValuesToModify] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.userInfo.value) || sessionStorage.getItem("userInfo")

    useEffect(() => {
        CheckUser(userInfo)
            .then(response => {
            if (response.data.status ===1) {
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
            } else {
                navigate("/")
            }
        })
        
    },[pageLimit])


    const handleValidateUser = (userId,isValidate,index ) => {
       
        let value = 0;
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
                users[index].is_validate = value
                dispatch(setAlert({ type: "success", text: "User Update", title: "Success", timeout: 5000 }))
            } else {
                dispatch(setAlert({type:"error",text:"Connection Problem",title:"Error",timeout:5000}))
            }
        })
    }

    
    const deleteUser = (id, index) => {
        axios.post("userApi.php",{ action: "adminDeleteUser", id }, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
            .then(response => {
            if (response.data.status === 1) {
                setUsers(users.filter(user => user.id !== id))
                dispatch(setAlert({ type: "success", text: "User Deleted", title: "Success", timeout: 5000 }))
            } else {
                dispatch(setAlert({type:"error",text:"Connection Problem",title:"Error",timeout:5000}))
            }
        })
    }


    const handleModifyUserValues = (lastUsername, lastRole, userId) => {
        setValuesToModify({lastUsername:lastUsername,lastRole:lastRole,userId:userId})
    }
    

    return (
    <div className={`${valuesToModify.lastUsername ? "fixed-page" : ""}`}>
          
        <div>
            <Link to={"/admin/home"}><span className='back-btn' style={{top:5}}></span></Link>
            <Title title={"Users"} />
            <TableAdmin
                target={"users"}
                handleValidateUser={handleValidateUser}
                users={users}
                deleteUser={deleteUser}
                handleModifyUserValues={handleModifyUserValues}
            />

            <ShowMore maxLength={6}
                    pageLimit={pageLimit + 1}
                    canShowMore={canShowMore}
                    isLoadingData={isLoadingData}
                    setIsLoadingData={(value) => setIsLoadingData(value)}
                    setPageLimit={(value) => setPageLimit(value)}
                />
            </div> 
            
            {valuesToModify.userId &&
                <ModifyUserWindow
                lastUsername={valuesToModify.lastUsername}
                lastRole={valuesToModify.lastRole}
                userId={valuesToModify.userId}
                handleModifyUserValues={handleModifyUserValues}
                />
            }  
          
    </div>
          
  )
}

export default Users

// modifyUserWindow

const ModifyUserWindow = ({ lastUsername, lastRole, userId, handleModifyUserValues }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState(lastUsername)
    const [password, setPassword] = useState("")
    const [secretCode,setSecretCode] = useState("")
    const [role, setRole] = useState(lastRole)
    const refId = React.useRef(userId)
    const showPasswordRef = React.useRef()
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfo.value) || sessionStorage.getItem("userInfo")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        let usernameIsValid = username.length < 21 && username.length > 3
        const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,60}$/)
        let passwordIsValid = password.match(passwordRegex) 
        let roleIsValid = (+role === 0 || +role === 1) && role !== ""
        let formIsValid = usernameIsValid && (passwordIsValid || password.length === 0) && roleIsValid
        if (formIsValid) {
            CheckUser(userInfo)
                .then(response => {
                    if (response.data.status === 1) {
                        const formdata = new FormData()
                        formdata.append("action", "updateUser")
                        formdata.append("userId", refId.current)
                        formdata.append("username", username)
                        formdata.append("password", password)
                        formdata.append("role", role)
                        formdata.append("secretCode", secretCode)
                        
                        axios.post("userApi.php", formdata).then(response => {
                            if (response.data.status === 1) {
                                dispatch(setAlert({ type: "success", text: "User Update", title: "Success", timeout: 5000 }))
                                setPassword("")
                                setRole("")
                                setUsername("")
                                setSecretCode("")
                            } else {
                                const message = response?.data?.message
                                if (message?.match(/Error Processing Request \(ce\)/)) {
                                    dispatch(setAlert({ type: "error", text: "Incorrect Secret Code", title: "Error", timeout: 5000 }))
                                } else {
                                    dispatch(setAlert({ type: "error", text: "Connection Problem", title: "Error", timeout: 5000 }))
                                }
                            }
                        })
                    } else {
                        navigate("/")
                    }
                })
        }else {
            //Handle Error Form
            if (!roleIsValid) {
                dispatch(setAlert({ type: "error", text: "Please choose a role  between Duty and Photographer", title: "Role Error", timeout: 5000 }))
            }
   
            if (!passwordIsValid) {
                dispatch(
                    setAlert({
                        type: "error",
                        text: "Please create a password that includes at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*), and has a length between 8 and 60 characters.",
                        title: "Password Error",
                        timeout: 5000
                    }))
            }
   
            if (!usernameIsValid) {
                dispatch(setAlert({ type: "error", text: "Please enter a username that is between 4 and 20 characters in length", title: "Username Error", timeout: 5000 }))
            }
        }
           
           
    }

    useEffect(() => {
        if (showPasswordRef?.current) {
            const ref = showPasswordRef.current
            
          ref.addEventListener("mousedown",()=> {
            setShowPassword(true)
          })
            
          ref.addEventListener("touchstart",()=> {
            setShowPassword(true)
          })
            
          ref.addEventListener("mouseup",()=> {
            setShowPassword(false)
          })
            
          ref.addEventListener("mouseleave",()=> {
            setShowPassword(false)
          })
            
          ref.addEventListener("touchmove",()=> {
            setShowPassword(false)
          })
      
          return () => {
            ref.removeEventListener("mousedown",()=> {
              setShowPassword(true)
            })
              
            ref.removeEventListener("touchstart",()=> {
                setShowPassword(true)
            })
              
            ref.removeEventListener("mouseup",()=> {
                setShowPassword(false)
            })
              
            ref.removeEventListener("mouseleave",()=> {
                setShowPassword(false)
            })
              
            ref.removeEventListener("touchmove",()=> {
                setShowPassword(false)
            })
          }
        }
      }, [])
      
    
    
    return (

        <div className='fixed-page'>
            <div onClick={()=>handleModifyUserValues(null)}><span className='back-btn' style={{top:5}}></span></div>
            <div className='container__flex--center--column gap-20 fixed-page__center-element'>
       <form className='form form__center--column' onSubmit={handleSubmit}>
            <div className='row'>
               <label htmlFor="username">Username <span className='required'>*</span> </label>
               <input type="text" id='username' value={username} maxLength={25} onChange={(e)=> setUsername(e.target.value)} />
            </div>
            <div className='row show__password'>
              <span className='show-password' ref={showPasswordRef}></span>
               <label htmlFor="password">Password <span className='required'>*</span> </label>
                <input type={!showPassword ? "password" : "text"} id='password' value={password} maxLength={60} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='row'>
              <label htmlFor="role">Role <span className='required'>*</span> </label>
              <select name="role" id="role" defaultValue={role} onChange={(e)=>setRole(e.target.value)}>
                  <option value=""></option>
                  <option value="0" >Photographer</option>
                  <option value="1">Duty</option>
              </select>
            </div>
            <div className='row'>
               <label htmlFor="secret-code">Secret-code <span className='required'>*</span> </label>
                <input type={"password"} id='secret-code' value={secretCode} maxLength={20} onChange={(e) => setSecretCode(e.target.value)} />
            </div>
                    
            <input className='cta-btn' type="submit" value="Send" />
      </form>
    </div>
        </div>
    )
}
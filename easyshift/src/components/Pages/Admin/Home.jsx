import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Title from '../../Layout/Title/Title'
import CheckUser from '../../Helpers/CheckUser/CheckUser'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount } from '../../../Redux/userSlice'


const Home = () => {
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.userInfo.value) || sessionStorage.getItem("userInfo")
    const dispatch = useDispatch()

    function resetSession() {
        sessionStorage.clear()
        dispatch(deleteAccount())
        navigate("/")
    }
    useEffect(() => {
        console.log(userInfo)
        CheckUser(userInfo)
        .then(response => console.log(response.data))
    })

    return (
        <div>
            <div onClick={resetSession}>
                <span className='back-btn btn' style={{ top: 5 }}></span>
            </div>
            <Title quote={false} title={"Reserved Area"}/>
            <div className='container__flex--center--column mar-top-m gap-40 pad-s txt-bold'>
                <div className='container__flex--center--row'>
                    <span className='admin-home-icon admin-home-icon--user'></span>
                    <Link to={"/admin/users"} className='link-w txt-medium'>Users</Link>
                </div>
                <div className='container__flex--center--row'>
                    <span className='admin-home-icon admin-home-icon--requests'></span>
                    <Link to={"/admin/requests"} className='link-w txt-medium'>Requests</Link>
                </div>
                
                <div className='container__flex--center--row'>
                    <span className='admin-home-icon admin-home-icon--notifications'></span>
                    <Link to={"/admin/notifications"} className='link-w txt-medium'>Notifications</Link>
                </div>
                
            </div>
    </div>
  )
}

export default Home

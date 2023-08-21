import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../../Layout/Title/Title'

const Home = () => {
    return (
        <div>
            <Title quote={false} title={"Reserved Area"}/>
        <div className='container__flex--center--column mar-top-m gap-20'>
            <Link to={"/admin/users"}>Users</Link>
            <Link to={"/admin/requests"}>Requests</Link>
            <Link to={"/admin/notifications"}>Notifications</Link>
        </div>
    </div>
  )
}

export default Home

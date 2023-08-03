import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Header from '../../Layout/Header/Header'


const ProtectedRoute = ({ auth, redirectPath }) => {
const location = useLocation()
 
return  auth 
    ?
    <>
        <Header />
        <main>
            <Outlet />
        </main>
    </>
   
    :
   <Navigate to={redirectPath} replace state={{from:location}}/>

      
}

export default ProtectedRoute

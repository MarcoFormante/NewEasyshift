import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'


const AdminProtectedRoute = ({auth,redirectPath}) => {
  const location = useLocation()


  useEffect(() => {
    if (auth) {
      
    } else {
          window.location.pathname = "/"
    }
  }, [location.pathname,auth])
  

      
return auth 
  ?
  <>
    
      <main>
          <Outlet />
      </main>
  </>
  :
 <Navigate to={redirectPath} replace={true} />

    
}

export default AdminProtectedRoute

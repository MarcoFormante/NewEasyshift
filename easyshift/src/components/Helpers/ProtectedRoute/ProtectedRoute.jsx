import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom'
import Header from '../../Layout/Header/Header'



const ProtectedRoute = ({ auth, redirectPath }) => {
    const location = useLocation()
    const navigate = useNavigate()

  
    
    useEffect(() => {
        if (auth) {
        } else {
            window.location.pathname = "/"
        }
    }, [location.pathname,auth])
    
    useEffect(() => {
         window.addEventListener("storage", () => {
          const token = sessionStorage.getItem("token")
          if (!token) {
            window.location.pathname = "/"
          } else {
                navigate("/")
          }
      })
    
        return () =>  window.removeEventListener("storage", () => {
          const token = sessionStorage.getItem("token")
          if (!token) {
            window.location.pathname = "/"
          } else {
              navigate("/")
          }
        })
    },[])
        
return auth 
    ?
    <>
        <Header />
        <main>
            <Outlet />
        </main>
    </>
    :
   <Navigate to={redirectPath} replace={true} />

      
}

export default ProtectedRoute

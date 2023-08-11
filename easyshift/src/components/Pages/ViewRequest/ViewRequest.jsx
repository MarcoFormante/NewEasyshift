import React, { useEffect, useRef, useState } from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import CheckUser from '../../Helpers/CheckUser/CheckUser'
import axios from '../../../AxiosApi/axios'
import { useSelector } from 'react-redux'
import Title from '../../Layout/Title/Title'
import RequestsContainer from '../../Elements/Request/RequestsContainer'



const ViewRequest = () => {
  const userInfo = useSelector((state)=> state.userInfo.value)
  const [request, setRequest] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const [requestId,setRequestId] = useState(location.pathname.slice(-2))
  let { id } = useParams()
  
  useEffect(() => {
    
        CheckUser(userInfo)
      .then(response => {
        if (response.data.status === 1) {
          const formData = new FormData()
            formData.append("action", "viewPost")
            formData.append("requestId",id)
            axios.post(process.env.REACT_APP_API_URL + "requestApi.php", formData, {
            headers: {
              "Content-Type": "x-www-form-urlencoded",
            }
          })
          .then(response => {
            if (response.data.status === 1) {
              if (response.data.rowCount > 0) {
                setRequest([...response.data.request])
              } else {
                alert("Error: This Post has been Deleted")
              }
              
            } else{
              alert(response.data.message)
            }
          })
          
      } else {
        navigate("/")
    }
  })    
}, [id])

  return (
    <div className=''>
      <Title classname={"page-title"}
        title={`View Post `}
        style={{ fontSize: 24 }}
      />

      { request.length > 0 && <RequestsContainer
        showCommentsTarget={null}
        requests={request}
        setShowCommentsTarget={()=>{}}
        isLoadingData={false}
      />}
    </div>
  )
}

export default ViewRequest

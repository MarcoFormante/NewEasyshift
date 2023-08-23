import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Title from '../../Layout/Title/Title'
import TableAdmin from './TableAdmin'
import { useDispatch } from 'react-redux'
import axios from '../../../AxiosApi/axios'
import { setAlert } from '../../../Redux/alertSlice'
import ShowMore from '../../Elements/ShowMore/ShowMore'

const Requests = () => {

  const [requests, setRequests] = useState([])
  const [pageLimit, setPageLimit] = useState(0)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [canShowMore, setCanShowMore] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
      axios.post("requestApi.php", {action: "getAllRequests", target:"all", limit : pageLimit * 10 , limit2: 10}, {
          headers: {
            "Content-Type":"multipart/form-data"
        }
      }) 
        .then(response => {
        console.log(response.data);
        if (response.data.status === 1) {
              const newRequests = response.data.request 
              setRequests([...requests, ...newRequests])
              setIsLoadingData(false)
              if (response.data.request.length  > 5) {
                  setCanShowMore(true)
              } else {
                setCanShowMore(false)
                
            }
        } else {
          if (response?.data?.message?.match(/Error : no more requests/)) {
              dispatch(setAlert({type:"info",text:" No more requests",title:"",timeout:5000}))
          }
          }
      })
  }, [pageLimit])
  


  const deleteRequest = (id) => {
    axios.post("requestApi.php",{ action: "deleteRequest", requestId:id }, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })
        .then(response => {
        if (response.data.status === 1) {
            setRequests(requests.filter(request => request.id !== id))
            dispatch(setAlert({ type: "success", text: "Request Deleted", title: "Success", timeout: 5000 }))
        } else {
            dispatch(setAlert({type:"error",text:"Connection Problem",title:"Error",timeout:5000}))
        }
    })
}


  return (
    <div>
          
    <div>
        <Link to={"/admin/home"}><span className='back-btn' style={{top:5}}></span></Link>
        <Title title={"Requests"} />

        <TableAdmin
            target={"requests"}
            requests={requests}
            deleteRequest={deleteRequest}
        />

        <ShowMore maxLength={6}
                pageLimit={pageLimit + 1}
                canShowMore={canShowMore}
                isLoadingData={isLoadingData}
                setIsLoadingData={(value) => setIsLoadingData(value)}
                setPageLimit={(value) => setPageLimit(value)}
            />
        </div> 
        
      
</div>
  )
}

export default Requests

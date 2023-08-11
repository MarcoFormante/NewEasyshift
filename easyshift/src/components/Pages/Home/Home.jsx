import React, { useEffect, useState } from 'react'
import Title from '../../Layout/Title/Title'
import RequestsContainer from '../../Elements/Request/RequestsContainer'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from '../../../AxiosApi/axios'
import CheckUser from '../../Helpers/CheckUser/CheckUser'
import { useLocation, useNavigate } from 'react-router-dom'

const Home = () => {
  const [requests, setRequests] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [pageLimit, setPageLimit] = useState(0)
  const [requestsLimit,setRequestsLimit] = useState(null)
  const [totalRequests, setTotalRequests] = useState(0)
  const [showCommentsTarget, setShowCommentsTarget] = useState(null)
  const [canShowMore, setCanShowMore] = useState(true);
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.userInfo.value || JSON.parse(sessionStorage.getItem("userInfo")))
  const location = useLocation()
  
 console.log(location);


  useEffect(() => {
      CheckUser(userInfo)
      .then(response => {
      if (response.data.status === 1 ) {
    const formData = new FormData()
    formData.append("action", "getAllRequests")
    formData.append("target", "all")
        formData.append("limit", pageLimit * 6)
        if (location.state !== null) {
          formData.append("limit",pageLimit *6)
          formData.append("limit2", location.state.requestsLimit || 6)
        } else {
          formData.append("limit2",6)
        }
    
    axios.post(process.env.REACT_APP_API_URL + "requestApi.php", formData, {
      headers: {
        "Content-Type": "x-www-form-urlencoded",
      }
    })
      .then(response => {
        console.log(response.data);
        if (response.data.status === 1 ) {
          console.log(response.data.request);   
          setRequests([...requests, ...response?.data?.request])
          setTotalRequests(0)
          window.history.replaceState(null,"")
          setCanShowMore(true)
        } else {
          setCanShowMore(false)
          //handle can not show More requests with alert
        }
      })
      } else {
        navigate("/")
    }
  })
  }, [pageLimit])


  useEffect(() => {
    setTotalRequests(requests.length)
  }, [requests])

 
  useEffect(() => {
    if (pageLimit === 0) {
      if (document.querySelectorAll(".request-card")[requests.length - 1]) {
        console.log("sii");
        setTimeout(() => {
          window.scrollTo({
            top: document.querySelectorAll(".request-card")[requests.length - 1].getBoundingClientRect().top -50,
          
          })
          // document.querySelectorAll(".request-card")[requests.length - 1].scrollIntoView(true, {
           
          // })
        }, 100);
    }
    
 }
  
},[requests,pageLimit])

  return (
    <div className={`${showCommentsTarget ? "absolute-top z-200 back_gradient" : ""}`}>
      <Title classname={"page-title"}
        title={`${showCommentsTarget ? "View comments" : "All requests"}`}
        style={{ fontSize: 24 }}
      />

      <RequestsContainer
        pageLimit={pageLimit}
        requestsLimit = {totalRequests}
        showCommentsTarget={showCommentsTarget}
        requests={requests}
        setShowCommentsTarget={setShowCommentsTarget}
        isLoadingData={isLoadingData}
      />

      {(!isLoadingData && !showCommentsTarget) && <div className='btn container__flex--center--row pad-m show-more-btn mar-auto' style={!canShowMore ? {display:"none"}: {display:"flex"}}>
        <span className='cta-btn container__flex--center--row '  onClick={()=> setPageLimit((location?.state?.pageLimit * 6|| pageLimit +  1))}>Show more</span>
      </div>}
    </div>
  )
}

export default Home

import React, { useEffect, useState } from 'react'
import Title from '../../Layout/Title/Title'
import RequestsContainer from '../../Elements/Request/RequestsContainer'
import CheckUser from '../../Helpers/CheckUser/CheckUser'
import axios from '../../../AxiosApi/axios'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'

const MyRequests = () => {
  const [requests, setRequests] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [pageLimit, setPageLimit] = useState(0)
  const [totalRequests, setTotalRequests] = useState(0)
  const [showCommentsTarget, setShowCommentsTarget] = useState(null)
  const [canShowMore, setCanShowMore] = useState(true);
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.userInfo.value || JSON.parse(sessionStorage.getItem("userInfo")))
  
  
  useEffect(() => {
    CheckUser(userInfo)
      .then(response => {
      if (response.data.status === 1 ) {
    const formData = new FormData()
      formData.append("action", "getAllRequests")
      formData.append("target", "user")
      formData.append("limit", pageLimit * 6)
      formData.append("user_id",userInfo.userID)
      axios.post(process.env.REACT_APP_API_URL + "requestApi.php", formData, {
        headers: {
          "Content-Type": "x-www-form-urlencoded",
        }
      })
        .then(response => {
          if (response.data.status === 1 ) {
            setRequests([...requests,...response?.data?.request])
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
  },[requests])
  
  
  
  return (
    <div className={`${showCommentsTarget ? "absolute-top z-200 back_gradient" : ""}`}>
      <Title classname={"page-title"}
        title={`${showCommentsTarget ? "View comments" : "My requests"}`}
        style={{ fontSize: 24 }}
      />

      <RequestsContainer
        showCommentsTarget={showCommentsTarget}
        requests={requests}
        setShowCommentsTarget={setShowCommentsTarget}
        isLoadingData={isLoadingData}
      />

      {(!isLoadingData && !showCommentsTarget) && <div className='btn container__flex--center--row pad-m show-more-btn mar-auto' style={!canShowMore ? {display:"none"}: {display:"flex"}}>
        <span className='cta-btn container__flex--center--row '  onClick={()=> setPageLimit(pageLimit + 1)}>Show more</span>
      </div>}
    </div>
  )
}


export default MyRequests

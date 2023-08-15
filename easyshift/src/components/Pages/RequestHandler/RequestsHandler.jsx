import React, { useEffect, useState } from 'react'
import Title from '../../Layout/Title/Title'
import RequestsContainer from '../../Elements/Request/RequestsContainer'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from '../../../AxiosApi/axios'
import CheckUser from '../../Helpers/CheckUser/CheckUser'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { createContext } from 'react'
export const scrollTargetContext = createContext()

const RequestsHandler = ({requestTarget}) => {
  const [requests, setRequests] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [pageLimit, setPageLimit] = useState(0)
  const [totalRequests, setTotalRequests] = useState(0)
  const [showCommentsTarget, setShowCommentsTarget] = useState(null)
  const [canShowMore, setCanShowMore] = useState(true);
  const [scrollTarget, setScrollTarget] = useState(null)
  const [noRequestsError,setNoRequestsError]=useState(false)
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.userInfo.value || JSON.parse(sessionStorage.getItem("userInfo")))
  const location = useLocation()
  
  useEffect(() => {
    setRequests([])
    setPageLimit(0)
    setTotalRequests(0)
    setCanShowMore(true)
    setScrollTarget(null)
    setScrollTarget(null)
},[requestTarget])
  

  //Check token and get all requests
  useEffect(() => {
      CheckUser(userInfo)
      .then(response => {
      if (response.data.status === 1 ) {
        const formData = new FormData()
        formData.append("action", "getAllRequests")
        formData.append("target", requestTarget)
        formData.append("limit", pageLimit * 6)
        if (requestTarget === "user") {
          formData.append("user_id",userInfo.userID)
        }
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
        const { message } = response.data 
        console.log(message?.match(/ no more requests/gi));
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
  }, [pageLimit,requestTarget])

//Set total requests by request Length value
  useEffect(() => {
    setTotalRequests(requests.length)
  }, [requests])


 //scroll to target Request after click on return button from viewPost page
  useEffect(() => {
    if (pageLimit === 0 && scrollTarget !== null && scrollTarget !== undefined) {
        setTimeout(() => {
          window.scrollTo({
            top: document.querySelectorAll(".request-card")[scrollTarget]?.getBoundingClientRect().top - 50,
            behavior:"smooth"
          })
        }, 100);
 }
},[scrollTarget,pageLimit])

  
  return (
    <div className={`${showCommentsTarget ? "absolute-top z-200 back_gradient" : ""}`}>
      <Title classname={"page-title"}
        title={`${showCommentsTarget ? "View comments" : "All requests"}`}
        style={{ fontSize: 24 }}
      />
      {requests.length < 1 
        ?
        <div className='container__flex--center--column gap-20 txt-bold'>
          <span>
            {
              location.pathname.match(/myRequests/gi)
            ?
              "You don't have any requests yet"
            :
              "At the moment, there are no requests"
            }
          </span>
          <Link className='underline' style={{ color: 'white' }} to={"/newRequest"}> Add a Requests</Link>
        </div>
        : ""}
       

      <scrollTargetContext.Provider value={{scrollTarget,setScrollTarget}}>
      <RequestsContainer
        pageLimit={pageLimit}
        requestsLimit = {totalRequests}
        showCommentsTarget={showCommentsTarget}
        requests={requests}
        setShowCommentsTarget={setShowCommentsTarget}
        isLoadingData={isLoadingData}
        />
      </scrollTargetContext.Provider>
      
      {(!isLoadingData && !showCommentsTarget)
                    &&
        <div className='btn container__flex--center--row pad-m show-more-btn mar-auto' style={!canShowMore ? { display: "none" } : { display: "flex" }}>
        <span className='cta-btn container__flex--center--row ' onClick={()=> setPageLimit((location?.state?.pageLimit * 6|| pageLimit +  1))}>Show more</span>
      </div>}
    </div>
  )
}

export default RequestsHandler

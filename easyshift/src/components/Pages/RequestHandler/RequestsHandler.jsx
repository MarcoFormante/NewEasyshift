import React, { useEffect, useState,createContext, useContext } from 'react'
import Title from '../../Layout/Title/Title'
import RequestsContainer from '../../Elements/Request/RequestsContainer'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from '../../../AxiosApi/axios'
import CheckUser from '../../Helpers/CheckUser/CheckUser'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loadingContext } from '../../../App'
import { setAlert } from '../../../Redux/alertSlice'
import { useDispatch } from 'react-redux'
import ShowMore from '../../Elements/ShowMore/ShowMore'


export const scrollTargetContext = createContext()


const RequestsHandler = ({requestTarget}) => {
  const [requests, setRequests] = useState([])
  const [isLoadingData,setIsLoadingData]=useState(false)
  const [pageLimit, setPageLimit] = useState(0)
  const [totalRequests, setTotalRequests] = useState(0)
  const [canShowMore, setCanShowMore] = useState(true);
  const [scrollTarget, setScrollTarget] = useState(null)
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.userInfo.value || JSON.parse(sessionStorage.getItem("userInfo")))
  const location = useLocation()
  const dispatch = useDispatch()
  const { isLoading, setIsLoading } = useContext(loadingContext)

  function dispatchAlert(type, text, title, timeout) {
    setTimeout(() => {
      dispatch(setAlert({ type, text, title, timeout }))
      setCanShowMore(false)
    }, 1000);
  }
  
  
  //Reset Values
  useEffect(() => {
    setRequests([])
    setPageLimit(0)
    setTotalRequests(0)
    setCanShowMore(true)
    setScrollTarget(null)
    setScrollTarget(null)
  }, [requestTarget])


  //delete request in useState Array
  const deleteRequestFromArray = (requestId)=>{
    setRequests(requests.filter(req => req.id !== requestId))
  }
  

  //Check token and get all requests
  useEffect(() => {
      if (!isLoadingData) {
        setIsLoading(true)
      }
      CheckUser(userInfo)
        .then(response => {
          console.log(response.data);
          if (response.data.status === 1) {
            const formData = new FormData()
            formData.append("action", "getAllRequests")
            formData.append("target", requestTarget)
            formData.append("limit", pageLimit * 6)
            if (requestTarget === "user") {
              formData.append("user_id", userInfo.userID)
            }
            if (location.state !== null) {
              formData.append("limit", pageLimit * 6)
              formData.append("limit2", location.state.requestsLimit || 6)
            } else {
              formData.append("limit2", 6)
            }
            axios.post("requestApi.php", formData, {
              headers: {
                "Content-Type": "x-www-form-urlencoded",
              }
            })
              .then(response => {
                const { message } = response.data
                if (response.data.status === 1) {

                    let timeout = isLoadingData ? 1000 : 0
                    setTimeout(() => {
                      setRequests([...requests, ...response?.data?.request])
                    setTotalRequests(0)
                    window.history.replaceState(null, "")
                    setCanShowMore(true)
                    }, timeout);
                  
                  }else {
                   //handle can not show More requests ---  alert
                  if (message?.match(/ no more requests/gi) && isLoadingData) {
                    dispatchAlert("info", "No more requests at the moment", "Requests", 3000)
                  }
                }
              })
          } else {
            navigate("/")
          }
        }).finally(() => {
         setTimeout(() => {
          setIsLoading(false)
           setIsLoadingData(false)
         }, 1000);
         
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
    <div className={""}>

      {
        location.pathname.match(/home/)
        && 
        <Title
          classname={"page-title"}
          title={"All Requests"}
          style={{ fontSize: 24 }}
        />
      }

      {
        location.pathname.match(/myRequests/)
        && 
        <Title
          classname={"page-title"}
          title={"My Requests"}
          style={{ fontSize: 24 }}
        />
      }

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
        : ""
      }
       
      <scrollTargetContext.Provider value={{scrollTarget,setScrollTarget}}>
        <RequestsContainer
        deleteRequestFromArray={value =>deleteRequestFromArray(value)}
        pageLimit={pageLimit}
        requestsLimit = {totalRequests}
          requests={requests}
          isLoadingData={isLoadingData}
        />
      </scrollTargetContext.Provider>
      
      {
        !isLoading && requests.length > 5
                    &&
        <div>
          <ShowMore maxLength={6}
            pageLimit={location?.state?.pageLimit * 6 || pageLimit + 1}
            canShowMore={canShowMore}
            isLoadingData={isLoadingData}
            setIsLoadingData={(value) => setIsLoadingData(value)}
            setPageLimit={(value) => setPageLimit(value)}
          />
        </div>
     }
    </div>
  )
}

export default RequestsHandler



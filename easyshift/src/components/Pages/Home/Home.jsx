import React, { useEffect, useState } from 'react'
import Title from '../../Layout/Title/Title'
import RequestsContainer from '../../Elements/Request/RequestsContainer'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from '../../../AxiosApi/axios'
import CheckUser from '../../Helpers/CheckUser/CheckUser'


const Home = () => {
  const [requests, setRequests] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [pageLimit, setPageLimit] = useState(0)
  const [totalRequests, setTotalRequests] = useState(0)
  const [showCommentsTarget, setShowCommentsTarget] = useState(null)
  const [canShowMore, setCanShowMore] = useState(true);
  const userInfo = useSelector((state) => state.userInfo.value || JSON.parse(sessionStorage.getItem("userInfo")))
  
  
  useEffect(() => {
    CheckUser(userInfo)
      .then(response => {
      if (response.data.status === 1 ) {
    const formData = new FormData()
    formData.append("action", "getAllRequests")
    formData.append("target", "all")
    formData.append("limit",pageLimit * 6)
    axios.post(process.env.REACT_APP_API_URL + "requestApi.php", formData, {
      headers: {
        "Content-Type": "x-www-form-urlencoded",
        "Authorization":`Bearer ${sessionStorage.getItem("token")}`
      }
    })
      .then(response => {
        console.log(response.data);
        if (response.data.status === 1 ) {
          const requests = { ...response.data.request }
            setRequests(prev => [...prev, { ...requests }])
            setCanShowMore(true)
        } else {
          setCanShowMore(false)
          //handle can not show More requests with alert
        }
    })
      }
    })
   
   
  }, [pageLimit])


  useEffect(() => {
    setTotalRequests(requests.length)
  },[requests])
  
  const handleShowMore = () => {
    setIsLoadingData(true)
   
    setTimeout(() => {
      setRequests(prev => [ ...prev,
        {
          id: 1,
          username: "John",
          role: "Duty",
          date:"10/02/2023",
          shift_start: "10:30",
          shift_end: "18:15",
          request: "je voudrais commencer plus tot",
          total_comments:10,
          created_at:"15/05/06",
          locked_user_id:2
        },
        {
          id: 2,
          username: "John",
          role: "Photographer",
          date:"10/02/2023",
          shift_start: "10:30",
          shift_end: "18:15",
          request: "je voudrais commencer plus tot",
          total_comments:10,
          created_at:"15/05/06",
          locked_user_id:null
        },
        {
          id: 3,
          username: "John",
          role: "Photographer",
          date:"10/02/2023",
          shift_start: "10:30",
          shift_end: "18:15",
          request: "je voudrais commencer plus tot",
          total_comments:10,
          created_at:"15/05/06",
          locked_user_id:1
        },
        {
          id: 4,
          username: "John",
          role:"Photographer",
          date:"10/02/2023",
          shift_start: "10:30",
          shift_end: "18:15",
          request: "je voudrais commencer plus tot",
          total_comments:10,
          created_at:"15/05/06",
          locked_user_id: null,
          created_at:"15/05/06"
        },
        {
          id: 5,
          username: "John",
          role:"Photographer",
          date:"10/02/2023",
          shift_start: "10:30",
          shift_end: "18:15",
          request: "je voudrais commencer plus tot",
          total_comments:10,
          created_at:"15/05/06",
          locked_user_id:null
        },
        {
          id:6,
          username: "John",
          role:"Photographer",
          date:"10/02/2023",
          shift_start: "10:30",
          shift_end: "18:15",
          request: "je voudrais commencer plus tot",
          total_comments:10,
          created_at:"15/05/06",
          locked_user_id:null
        },
      ])
      setIsLoadingData(false)
    }, 1000);
    
  }

  
  return (
    <div className={`${showCommentsTarget ? "absolute-top z-200 back_gradient" : ""}`}>
      <Title classname={"page-title"}
        title={`${showCommentsTarget ? "View comments" : "All requests"}`}
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

export default Home

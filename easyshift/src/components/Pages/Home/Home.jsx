import React, { useEffect, useState } from 'react'
import Request from '../../Elements/Request/Request'
import Title from '../../Layout/Title/Title'
import LoadingSection from '../../Elements/Loading/LoadingSection'


const Home = () => {
  const [requests, setRequests] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [totalRequests, setTotalRequests] = useState(0)
  const [showCommentsTarget,setShowCommentsTarget] = useState(null)
 
  
  useEffect(() => {
    setRequests([
      {
        id: 1,
        username: "John",
        role:"Duty",
        shift_start: "10:30",
        shift_end: "18:15",
        request: "je voudrais commencer plus tot",
        total_comments:10,
        locked_user_id:2
      },
      {
        id: 2,
        username: "John",
        role:"Photographer",
        shift_start: "10:30",
        shift_end: "18:15",
        request: "je voudrais commencer plus tot",
        total_comments:10,
        locked_user_id:null
      },
      {
        id: 3,
        username: "John",
        role:"Photographer",
        shift_start: "10:30",
        shift_end: "18:15",
        request: "je voudrais commencer plus tot",
        total_comments:10,
        locked_user_id:1
      },
      {
        id: 4,
        username: "John",
        role:"Photographer",
        shift_start: "10:30",
        shift_end: "18:15",
        request: "je voudrais commencer plus tot",
        total_comments:10,
        locked_user_id:null
      },
      {
        id: 5,
        username: "John",
        role:"Photographer",
        shift_start: "10:30",
        shift_end: "18:15",
        request: "je voudrais commencer plus tot",
        total_comments:10,
        locked_user_id:null
      },
      {
        id:6,
        username: "John",
        role:"Photographer",
        shift_start: "10:30",
        shift_end: "18:15",
        request: "je voudrais commencer plus tot",
        total_comments:10,
        locked_user_id:null
      },
    ])
  }, [])


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
          role:"Duty",
          shift_start: "10:30",
          shift_end: "18:15",
          request: "je voudrais commencer plus tot",
          total_comments:10,
          locked_user_id:2
        },
        {
          id: 2,
          username: "John",
          role:"Photographer",
          shift_start: "10:30",
          shift_end: "18:15",
          request: "je voudrais commencer plus tot",
          total_comments:10,
          locked_user_id:null
        },
        {
          id: 3,
          username: "John",
          role:"Photographer",
          shift_start: "10:30",
          shift_end: "18:15",
          request: "je voudrais commencer plus tot",
          total_comments:10,
          locked_user_id:1
        },
        {
          id: 4,
          username: "John",
          role:"Photographer",
          shift_start: "10:30",
          shift_end: "18:15",
          request: "je voudrais commencer plus tot",
          total_comments:10,
          locked_user_id:null
        },
        {
          id: 5,
          username: "John",
          role:"Photographer",
          shift_start: "10:30",
          shift_end: "18:15",
          request: "je voudrais commencer plus tot",
          total_comments:10,
          locked_user_id:null
        },
        {
          id:6,
          username: "John",
          role:"Photographer",
          shift_start: "10:30",
          shift_end: "18:15",
          request: "je voudrais commencer plus tot",
          total_comments:10,
          locked_user_id:null
        },
      ])
      setIsLoadingData(false)
    }, 1000);
    
  }
  
  
  return (
    <div>
      <Title classname={"page-title"}
        title={` ${showCommentsTarget ? "View comments" : "All requests"}`}
        style={{ fontSize: 24 }}
      />

      <div className={`requests__container  ${showCommentsTarget ? "requests__container__showComments" : ""}`}>
        {showCommentsTarget &&
          <>
          <div onClick={()=>setShowCommentsTarget(null)}>exit</div>
            <Request showComments={true} request={showCommentsTarget}/> 
          </>
        }

        {requests.map(request =>

          <>
            {!showCommentsTarget &&
              <Request request={request} setShowCommentsTarget={(value)=>setShowCommentsTarget(value)} />
            }
            </>
        )}
        
          <LoadingSection isLoadingData={isLoadingData} />
      </div>

      {(!isLoadingData && !showCommentsTarget) && <div  className='btn container__flex--center--row pad-m show-more-btn mar-auto'>
        <span className='cta-btn container__flex--center--row '  onClick={handleShowMore}>Show more</span>
      </div>}
    </div>
  )
}

export default Home

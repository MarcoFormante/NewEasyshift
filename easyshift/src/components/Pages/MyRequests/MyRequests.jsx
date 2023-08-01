import React, { useEffect, useState } from 'react'
import Title from '../../Layout/Title/Title'
import LoadingSection from '../../Elements/Loading/LoadingSection'
import Request from '../../Elements/Request/Request'

const MyRequests = () => {
  const [requests, setRequests] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [totalRequests, setTotalRequests] = useState(0)
  
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
        title={"My requests"}
        style={{ fontSize: 24 }}
      />

      <div className='requests__container'>
        {requests.map(request =>

          <>
              <Request request={request} />
            </>
          )}
          <LoadingSection isLoadingData={isLoadingData} />
      </div>

      {!isLoadingData && <div  className='btn container__flex--center--row pad-m show-more-btn mar-auto'>
        <span className='cta-btn container__flex--center--row '  onClick={handleShowMore}>Show more</span>
      </div>}
    </div>
  )
}

export default MyRequests

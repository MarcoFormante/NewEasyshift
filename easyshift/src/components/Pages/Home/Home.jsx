import React, { useEffect, useState } from 'react'
import ph_duty from '../../../icons/PH_Duty.svg'
import ph_simple from '../../../icons/PH_simple.svg'


const Home = () => {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    setRequests([
      {
        id: 1,
        username: "John",
        role:"Duty",
        shift_start: "10:30",
        shift_end: "18:15",
        request: "je voudrais commencer plus tot",
        locked_user_id:null
      },
      {
        id: 2,
        username: "John",
        role:"Photographer",
        shift_start: "10:30",
        shift_end: "18:15",
        request: "je voudrais commencer plus tot",
        locked_user_id:null
      },
      {
        id: 3,
        username: "John",
        role:"Photographer",
        shift_start: "10:30",
        shift_end: "18:15",
        request: "je voudrais commencer plus tot",
        locked_user_id:null
      },
      {
        id: 4,
        username: "John",
        role:"Photographer",
        shift_start: "10:30",
        shift_end: "18:15",
        request: "je voudrais commencer plus tot",
        locked_user_id:null
      },
      {
        id: 5,
        username: "John",
        role:"Photographer",
        shift_start: "10:30",
        shift_end: "18:15",
        request: "je voudrais commencer plus tot",
        locked_user_id:null
      },
      {
        id:6,
        username: "John",
        role:"Photographer",
        shift_start: "10:30",
        shift_end: "18:15",
        request: "je voudrais commencer plus tot",
        locked_user_id:null
      },
    ])
  },[])
  
  return (
    <div>
      <div>
        {requests.map(request =>
          <div className='request-card'>
            <div className='request-card__user-info'>
              <span>{ request.username.slice(0,1).toUpperCase()}</span>
              <span>{ request.username}</span>
              <span style={request.role === "Duty" ?{backgroundImage:"url("+ ph_duty +")"}:{backgroundImage:"url("+ ph_simple +")"}}></span>
            </div>
            <div className='request-card__shift-request'></div>
            <div className='request-card__inpt-comment'></div>
            <div className='request-card__comments'></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home

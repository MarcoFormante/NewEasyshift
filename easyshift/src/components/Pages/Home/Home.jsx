import React, { useEffect, useState } from 'react'
import Request from '../../Elements/Request/Request'


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
  },[])
  
  return (
    <div>
      <div>
        {requests.map(request =>
          <>
            <Request request={request}/>
          </>
        )}
      </div>
    </div>
  )
}

export default Home

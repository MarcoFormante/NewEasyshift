import React from 'react'
import { useLocation } from 'react-router-dom'

const ViewRequest = () => {
  const location = useLocation()

  console.log({...location?.state});
  return (
    <div>
      Post
    </div>
  )
}

export default ViewRequest

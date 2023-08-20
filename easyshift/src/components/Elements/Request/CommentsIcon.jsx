import React from 'react'
import { useNavigate,useLocation, Link } from 'react-router-dom'



const CommentsIcon = ({requestIndex, pageLimit, requestsLimit, request, showComments }) => {
  const navigate = useNavigate()
  const location = useLocation()

  // const viewRequest = () => {
  //   if (!location.pathname.match(/viewRequest/)) {
  //     navigate(`/viewRequest/${request.id}`, { state: { requestsLimit, pageLimit, requestIndex, pathname: location.pathname } })
  //   }
   
  // }

  return (
    <div className='request-card__comments'>
      <div className='request-card__comments__container'>
        <span className='created_at'>created on {new Date(request?.created_on).toLocaleDateString("fr")}</span>
        {!showComments &&
          <Link to={"/viewRequest/" + request.id}
            replace={true}
            state={{requestsLimit,pageLimit,requestIndex, pathname: location.pathname}}
            className='request-card__comments__icon btn'>
          </Link>
        }
    </div>
    </div>
  )
}

export default CommentsIcon

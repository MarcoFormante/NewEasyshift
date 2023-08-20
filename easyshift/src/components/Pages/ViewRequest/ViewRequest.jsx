import React, { useContext, useEffect,useState } from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import CheckUser from '../../Helpers/CheckUser/CheckUser'
import axios from '../../../AxiosApi/axios'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../../Layout/Title/Title'
import RequestsContainer from '../../Elements/Request/RequestsContainer'
import { loadingContext } from '../../../App'
import { setAlert } from '../../../Redux/alertSlice'


const ViewRequest = () => {
  const userInfo = useSelector((state)=> state.userInfo.value)
  const [request, setRequest] = useState([])
  const [errorDeletedRequest,setErrorDeletedRequest]=useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  let { id } = useParams()
  const [trigger, setTrigger] = useState(0)
  const { setIsLoading } = useContext(loadingContext)
  const dispatch = useDispatch()

  useEffect(() => {
    setTrigger(location?.state?.trigger)
  },[location?.state?.trigger])
  
console.log(location);
  useEffect(() => {
      setRequest([])
      CheckUser(userInfo)
        .then(response => {
          console.log(response.data);
          if (response.data.status === 1) {
            setIsLoading(true)
            const formData = new FormData()
            formData.append("action", "viewPost")
            formData.append("requestId", id)
            if (location?.state?.notificationId) {
              formData.append("notificationId", location.state.notificationId)
            }
            axios.post("requestApi.php", formData, {
              headers: {
                "Content-Type": "x-www-form-urlencoded",
              },
            })
              .then(response => {
                console.log(response.data);
                if (response.data.status === 1) {
                 
                  if (response.data.rowCount > 0) {
                    setRequest([...response.data.request])
                  } else {
                    setErrorDeletedRequest(true)
                  }
              
                } else {
                  if (response?.data?.message?.match(/Error/g)) {
                    dispatch(setAlert({type:"error",text:"it is no possible to view this post, connection problem",title:"Error",timeout:3000}))
                  }
                }
              }).finally(setTimeout(() => {
                setIsLoading(false)
              }, 1000))
          
          } else {
            navigate("/")
          }
        })
  }, [trigger])
  

  const deleteRequestFromArray = () => {
    setRequest([])
    setErrorDeletedRequest(true)
  }

  return (
    <div className=''>

      {
        location.state !== null
        &&
        <div className='back-btn btn'
        onClick={() => navigate(location.state.pathname,
          {
            state:
            {
              requestsLimit: location.state.requestsLimit,
              pageLimit: location.state.pageLimit,
              requestIndex: location.state.requestIndex
            }
          })}
      >
      </div>
      }
      <Title classname={"page-title"}
        title={`View Post `}
        style={{ fontSize: 24 }}
      />
      {request.length > 0 &&
        <RequestsContainer
        deleteRequestFromArray={()=>deleteRequestFromArray()}
        requests={request}
        isLoadingData={false}
      />}
      {errorDeletedRequest
            && 
        <div className='container__flex--center--row ext-error'>This Post has been Deleted</div>
        }
    </div>
  )
}

export default ViewRequest

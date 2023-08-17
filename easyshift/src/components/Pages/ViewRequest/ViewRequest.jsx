import React, { useContext, useEffect,useState } from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import CheckUser from '../../Helpers/CheckUser/CheckUser'
import axios from '../../../AxiosApi/axios'
import { useSelector } from 'react-redux'
import Title from '../../Layout/Title/Title'
import RequestsContainer from '../../Elements/Request/RequestsContainer'
import { loadingContext } from '../../../App'


const ViewRequest = () => {
  const userInfo = useSelector((state)=> state.userInfo.value)
  const [request, setRequest] = useState([])
  const [errorDeletedRequest,setErrorDeletedRequest]=useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  let { id } = useParams()
  const [trigger, setTrigger] = useState(0)
  const {setIsLoading} = useContext(loadingContext)

  useEffect(() => {
    setTrigger(location?.state?.trigger)
  },[location?.state?.trigger])
  console.log(trigger);

  useEffect(() => {
      setRequest([])
      CheckUser(userInfo)
        .then(response => {
          if (response.data.status === 1) {
            setIsLoading(true)
            const formData = new FormData()
            formData.append("action", "viewPost")
            formData.append("requestId", id)
            axios.post(process.env.REACT_APP_API_URL + "requestApi.php", formData, {
              headers: {
                "Content-Type": "x-www-form-urlencoded",
              }
            })
              .then(response => {
                if (response.data.status === 1) {
                  console.log(response.data);
                  if (response.data.rowCount > 0) {
                    setRequest([...response.data.request])
                  } else {
                    setErrorDeletedRequest(true)
                  }
              
                } else {
                  alert(response.data.message)
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

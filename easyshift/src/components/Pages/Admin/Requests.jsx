import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Title from '../../Layout/Title/Title'
import TableAdmin from './TableAdmin'
import { useDispatch } from 'react-redux'
import axios from '../../../AxiosApi/axios'
import { setAlert } from '../../../Redux/alertSlice'
import ShowMore from '../../Elements/ShowMore/ShowMore'
import Comments from './Comments'

const Requests = () => {

    const [requests, setRequests] = useState([])
    const [pageLimit, setPageLimit] = useState(0)
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [canShowMore, setCanShowMore] = useState(false)
    const [comments, setComments] = useState([])
    const [requestTarget,setRequestTarget] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        axios.post("requestApi.php", {action: "getAllRequests", target:"all", limit : pageLimit * 10 , limit2: 10}, {
          headers: {
            "Content-Type":"multipart/form-data"
        }
      }) 
        .then(response => {
        console.log(response.data);
        if (response.data.status === 1) {
              const newRequests = response.data.request 
              setRequests([...requests, ...newRequests])
              setIsLoadingData(false)
              if (response.data.request.length  > 5) {
                  setCanShowMore(true)
              } else {
                setCanShowMore(false)  
            }

        } else {
            if (response?.data?.message?.match(/Error : no more requests/)) {
                dispatch(setAlert({type:"info",text:" No more requests",title:"",timeout:5000}))
            }
          }
      })
  }, [pageLimit])
  


  const deleteRequest = (id) => {
    axios.post("requestApi.php",{ action: "deleteRequest", requestId:id }, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })
    .then(response => {
        if (response.data.status === 1) {
            setRequests(requests.filter(request => request.id !== id))
            dispatch(setAlert({ type: "success", text: "Request Deleted", title: "Success", timeout: 5000 }))
        } else {
            dispatch(setAlert({type:"error",text:"Connection Problem",title:"Error",timeout:5000}))
        }
    })
    }
    

    const handleViewComments = (requestId) => {
        setRequestTarget(requests.filter(req => req.id === requestId))
        axios.post("commentApi.php", {
            action: "getComments",
            requestId
        },
            {
                headers: {
                    "Content-Type":"multipart/form-data"
                }
            }
        ).then(response => {
            console.log(response.data);
            if (response.data.status === 1) {
                if (response.data.rowCount > 0) {
                    
                    setComments(response.data.comments)
                    
                } else {
                    dispatch(setAlert({type:"info",text:"This Request has not comments",title:"",timeout:5000}))
                }
            } else {
                dispatch(setAlert({type:"error",text:"Connection Problem",title:"Error",timeout:5000}))
            }
        })
    }


    const closeCommentWindow = () => {
        console.log("si");
        setComments([])
    }


    const deleteLocalComment = (id, requestId) => {
        setComments(comments.filter(com => com.id !== id))
        let localRequest = requests.find(req => req.id === requestId)
        localRequest.total_comments -= 1
        setRequests([...requests])
    }

  return (
    <div>
          
    <div>
        <Link to={"/admin/home"}><span className='back-btn' style={{top:5}}></span></Link>
        <Title title={"Requests"} />

        <TableAdmin
            target={"requests"}
            requests={requests}
            deleteRequest={deleteRequest}
            handleViewComments={handleViewComments}
            
        />

        <ShowMore maxLength={6}
                pageLimit={pageLimit + 1}
                canShowMore={canShowMore}
                isLoadingData={isLoadingData}
                setIsLoadingData={(value) => setIsLoadingData(value)}
                setPageLimit={(value) => setPageLimit(value)}
        />
        </div> 
          {comments.length > 0 ?
            <Comments
                comments={comments}
                requestTarget={requestTarget}
                closeCommentWindow={closeCommentWindow}
                deleteLocalComment={deleteLocalComment}
            />
              :
              ""
          }
      
</div>
  )
}

export default Requests

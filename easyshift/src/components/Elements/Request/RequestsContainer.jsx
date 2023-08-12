import React, { useEffect } from 'react'
import Request from './Request'
import LoadingSection from '../Loading/LoadingSection'
import axios from '../../../AxiosApi/axios'


const RequestsContainer = ({requestScrollTarget, pageLimit,requestsLimit,showCommentsTarget, setShowCommentsTarget, isLoadingData, requests }) => {

  console.log(requests.length);
  useEffect(() => {
    if (showCommentsTarget) {
      //handle comments with axios
    }
  },[showCommentsTarget])

  return (
    <div>
      <div className={`requests__container  ${showCommentsTarget || requests.length < 7 ? "requests__container__showComments" : ""}`}>
        {showCommentsTarget &&
          <>
          <div className='back-btn btn' onClick={()=>setShowCommentsTarget(null)}></div>
            <Request showComments={true} request={showCommentsTarget}/> 
          </>
        }

        {requests.map((request,index) =>
          
          <div key={request?.id}>
            
            {(!showCommentsTarget && request?.username) &&
              <Request requestIndex={index} requestScrollTarget={requestScrollTarget} pageLimit={pageLimit} requestsLimit={requestsLimit} request={request} setShowCommentsTarget={(value)=>setShowCommentsTarget(value)} />
            }
          </div>
        )}
          <LoadingSection isLoadingData={isLoadingData} />
      </div>
    </div>
  )
}

export default RequestsContainer

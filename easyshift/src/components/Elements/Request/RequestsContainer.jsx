import React, { useEffect} from 'react'
import Request from './Request'
import LoadingSection from '../Loading/LoadingSection'


const RequestsContainer = ({ pageLimit, requestsLimit, showCommentsTarget, setShowCommentsTarget, isLoadingData, requests }) => {
  
  useEffect(() => {
    if (showCommentsTarget) {
      //handle comments with axios
    }
  },[showCommentsTarget])

  return (
    <div>
      <div className={`requests__container  ${requests.length < 7 ? "requests__container__showComments" : ""}`}>

        {requests.map((request,index) =>
          <div key={request.id}>
            <Request requestIndex={index}
              pageLimit={pageLimit}
              requestsLimit={requestsLimit}
              request={request}
            />
          </div>
        )}
        
          <LoadingSection isLoadingData={isLoadingData} />
      </div>
    </div>
  )
}

export default RequestsContainer

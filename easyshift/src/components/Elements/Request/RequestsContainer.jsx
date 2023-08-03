import React from 'react'
import Request from './Request'
import LoadingSection from '../Loading/LoadingSection'


const RequestsContainer = ({ showCommentsTarget, setShowCommentsTarget, isLoadingData, requests }) => {
  console.log(showCommentsTarget);
  return (
    <div>
      <div className={`requests__container  ${showCommentsTarget ? "requests__container__showComments" : ""}`}>
        {showCommentsTarget &&
          <>
          <div className='back-btn btn' onClick={()=>setShowCommentsTarget(null)}></div>
            <Request showComments={true} request={showCommentsTarget}/> 
          </>
        }

        {requests.map(request =>
          <div key={request.id}>
            {!showCommentsTarget &&
              <Request  request={request} setShowCommentsTarget={(value)=>setShowCommentsTarget(value)} />
            }
          </div>
        )}
          <LoadingSection isLoadingData={isLoadingData} />
      </div>
    </div>
  )
}

export default RequestsContainer

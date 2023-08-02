import React from 'react'
import Request from './Request'
import LoadingSection from '../Loading/LoadingSection'


const RequestsContainer = ({showCommentsTarget,setShowCommentsTarget,isLoadingData,requests}) => {
  return (
    <div>
      <div className={`requests__container  ${showCommentsTarget ? "requests__container__showComments" : ""}`}>
        {showCommentsTarget &&
          <>
          <div onClick={()=>setShowCommentsTarget(null)}>exit</div>
            <Request showComments={true} request={showCommentsTarget}/> 
          </>
        }

        {requests.map(request =>
          <>
            {!showCommentsTarget &&
              <Request request={request} setShowCommentsTarget={(value)=>setShowCommentsTarget(value)} />
            }
            </>
        )}
          <LoadingSection isLoadingData={isLoadingData} />
      </div>
    </div>
  )
}

export default RequestsContainer

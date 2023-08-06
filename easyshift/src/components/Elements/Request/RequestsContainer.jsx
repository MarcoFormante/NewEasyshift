import React, { useEffect } from 'react'
import Request from './Request'
import LoadingSection from '../Loading/LoadingSection'
import axios from '../../../AxiosApi/axios'


const RequestsContainer = ({ showCommentsTarget, setShowCommentsTarget, isLoadingData, requests }) => {
 console.log(requests.length);
  useEffect(() => {
    if (showCommentsTarget) {
      //handle comments
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
          
          <div >
            {(!showCommentsTarget && request[index]?.username) &&
              <Request request={request[index]} setShowCommentsTarget={(value)=>setShowCommentsTarget(value)} />
            }
          </div>
        )}
          <LoadingSection isLoadingData={isLoadingData} />
      </div>
    </div>
  )
}

export default RequestsContainer

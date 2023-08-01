import React from 'react'

const LoadingSection = ({isLoadingData}) => {
  return isLoadingData &&  (
    <div className='loading-section'>
      <div className='circle'></div>
    </div>
  )
}

export default LoadingSection

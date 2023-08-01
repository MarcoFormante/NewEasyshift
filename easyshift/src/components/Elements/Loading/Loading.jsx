import React from 'react'

const Loading = ({isLoading}) => {

  return isLoading && (
    <div className='loading-fp'>
          <div className='loading-fp__container'>
            <div className='loading-fp__item'>
                <div className='loading-fp__item__circle-md  container__flex--center--column'></div>
                <div className='loading-fp__item__circle-sd-left'></div>
                <div className='loading-fp__item__circle-sd-right'></div>
            </div>
        </div>
    </div>
  )
}

export default Loading

import React from 'react'

const ShiftRequest = ({shiftStart,shiftEnd,request}) => {
    
  return (
    <div className='request-card__shift-request'>
      <div className='request-card__shift-request__container'>
        <span className='request-card__shift-request__title'>Shift</span>
        <span><time>{shiftStart}</time> / <time>{ shiftEnd}</time></span>
      </div>
      <div className='request-card__shift-request__container'>
        <span className='request-card__shift-request__title'>Request</span>
        <span>{request}</span>
      </div>
    </div>
    
  )
}

export default ShiftRequest

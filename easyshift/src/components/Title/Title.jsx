import React from 'react'


const Title = ({ title, classname ,quote }) => {
  
  return (
    <div className='page-title'>
      <h1 className={classname}>{title}</h1>
      {quote ? <span className='brand__quote'>An easy way to change your day</span> : "" }
      
    </div>
  )
}

export default Title

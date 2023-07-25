import React from 'react'


const Title = ({ title, classname }) => {
  
  return (
    <div className='page-title'>
          <h1 className={classname}>{title}</h1>
    </div>
  )
}

export default Title

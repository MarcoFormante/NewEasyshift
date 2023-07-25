import React from 'react'


const Title = ({ title, titleClassname }) => {
  
  return (
    <div className='page-title'>
          <h1 className={titleClassname}>{title}</h1>
    </div>
  )
}

export default Title

import React from 'react'

const Title = ({title,style}) => {
  return (
    <div className='page-title'>
          <h1 style={{...style}}>{title}</h1>
    </div>
  )
}

export default Title

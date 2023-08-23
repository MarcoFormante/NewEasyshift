import React from 'react'
import Form from './Form'
import Title from '../../Layout/Title/Title'
import { Link } from 'react-router-dom'

const ReservedArea = () => {
  return (
    <div>
      <Link to={"/"}><span className='back-btn' style={{top:5}}></span></Link>
        <Title title={"Reserved Area"} quote={false} classname={""} />
      <Form/>
    </div>
  )
}

export default ReservedArea

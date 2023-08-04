import React, { useEffect, useState } from 'react'
import Title from '../../Layout/Title/Title'
import Form from './Form'



const Login = () => {
  

  return (
    <div>
       <div className='container__flex--center--column gap-20'>
        <Title title={"EASYSHIFT"} quote={true} classname={"brand"} />
        <h2>Login</h2>
        <Form/>
      </div>
       
    </div>
  )
}

export default Login

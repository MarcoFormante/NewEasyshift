import React, { useEffect, useState } from 'react'
import Title from '../../Layout/Title/Title'
import Form from './Form'
import { useDispatch } from 'react-redux'
import { setAlert } from '../../../Redux/alertSlice'

const Login = () => {
  const dispatch = useDispatch()

  function dispatchAlert(type,text,title,timeout,callback,priority) {
    dispatch(setAlert({type,text,title,timeout,callback,priority}))
  }
  

  return (
    <div>
       <div className='container__flex--center--column gap-20'>
        <Title title={"EASYSHIFT"} quote={true} classname={"brand"} />
        <h2>Login</h2>
        <Form dispatchAlert={dispatchAlert} />
      </div>
       
    </div>
  )
}

export default Login

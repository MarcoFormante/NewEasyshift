import React, { useEffect, useState } from 'react'
import Title from '../../Layout/Title/Title'
import Form from './Form'
import { useDispatch } from 'react-redux'
import { setAlert } from '../../../Redux/alertSlice'
import { Link } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const [admPath, setAdmPath] = useState(0)
  
  function dispatchAlert(type,text,title,timeout,callback,priority) {
    dispatch(setAlert({type,text,title,timeout,callback,priority}))
  }
  
  function visibleAdmPath() {
    setAdmPath(admPath + 1)
    console.log(admPath);
  }
  

  return (
    <div>
      <div className='container__flex--center--column gap-20'>
        { admPath > 4 && <Link to={"reservedArea"} className='adm_page_btn btn '>Admin</Link>}
        <Title title={"EASYSHIFT"} quote={true} classname={"brand"} />
        <h2 onClick={visibleAdmPath}>Login</h2>
        <Form dispatchAlert={dispatchAlert} />
      </div>
       
    </div>
  )
}

export default Login

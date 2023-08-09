import React, { useState } from 'react'
import axios from '../../../AxiosApi/axios'
import {useSelector} from 'react-redux'
import CheckUser from '../../Helpers/CheckUser/CheckUser'

const FormNewRequest = () => {
    const [date, setDate] = useState("")
    const [shiftStart, setShiftStart] = useState("")
    const [shiftEnd, setShiftEnd] = useState("")
    const [requestMessage, setRequestMessage] = useState("")
    const userInfo = useSelector((state) => state.userInfo.value)
    

    function errorsHandler(errorsArray,inputsArray, type) {
        inputsArray.forEach((inpt, index) => {
            if (!inpt) {
                errorsArray.push(type[index])
            } else {
                if (errorsArray.length > 0 && errorsArray.indexOf(type[index])) {
                    errorsArray.filter(err => err !== type[index])
                }
            }
           
        })
        return errorsArray.length > 0 ? false : true
    }
   
    const checkFormData = () => {
        let errorsArray = []
        const dateRegex = new RegExp(/\d{2,4}\-\d{1,2}\-\d{1,2}/)
        const dateIsValid = date.match(dateRegex)
        const shiftRegex = new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
        const shiftStartIsValid = shiftStart.match(shiftRegex) 
        const shiftEndIsValid = shiftEnd.match(shiftRegex)
        const requestMessageIsValid = requestMessage.length > 3 && requestMessage.length < 50;
        const userIdIsValid = userInfo.userID
        let formIsValid =
            errorsHandler(
                errorsArray,
                [dateIsValid, shiftStartIsValid, shiftEndIsValid,requestMessageIsValid,userIdIsValid],
                ["Date", "Shift-start","Shift-end","Request","userId"]
            )
        console.log(formIsValid);
        return formIsValid
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
       
       if (checkFormData()) {
           CheckUser(userInfo)
               .then(response => {
               if (response.data.status === 1) {
                const formData = new FormData()
                formData.append("action", "newRequest")
                formData.append("userId", userInfo.userID)
                formData.append("date", date)
                formData.append("shiftStart", shiftStart)
                formData.append("shiftEnd", shiftEnd)
                formData.append("request", requestMessage)
                axios.post(process.env.REACT_APP_API_URL + "/requestApi.php", formData, {
                    headers: {
                        "Content-Type": "x-www-form-urlencoded"
                    }
                })
                    .then(response => {
                    console.log(response.data);
                    }).catch(e => {
                    console.log(e);
                })
               }
           })
       } 
    }


  return (
      <form className='form__new-request container__flex--center--column' onSubmit={onSubmit}>
        <div className='form__new-request__container'>
            <div className='inpt__container'>
                <label htmlFor="date">Date</label>
                <input type="date" name="date" id="date" value={date} onChange={(e)=>setDate(e.target.value)} />
            </div>

            <div className='inpt__container'>
                <label htmlFor="timeS">Shift starts at</label>
                <input type="time" name="timeS" id="timeS" value={shiftStart} onChange={(e)=>setShiftStart(e.target.value)}/>
            </div>

            <div className='inpt__container'>
                <label htmlFor="timeE">Shift ends at</label>
                <input type="time" name="timeE" id="timeE" value={shiftEnd} onChange={(e)=>setShiftEnd(e.target.value)} />
            </div>
            
              <div className='request-message container__flex--center--column'>
                What's your request ?
                <textarea
                    name="requestMessage"
                    id="requestMessage"
                    cols="30"
                    rows="10"
                    placeholder='your request...'
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                >
                </textarea>
                <input type="submit" value="Send" className='cta-btn' />  
            </div>
        </div>
    </form>
  )
}

export default FormNewRequest

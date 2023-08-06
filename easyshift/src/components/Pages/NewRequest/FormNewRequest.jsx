import React, { useState } from 'react'
import axios from '../../../AxiosApi/axios'

const FormNewRequest = () => {
    const [date, setDate] = useState("")
    const [shiftStart, setShiftStart] = useState("")
    const [shiftEnd, setShiftEnd] = useState("")
    const [requestMessage, setRequestMessage] = useState("")
    
    const onSubmit = (e) => {
        e.preventDefault()
        // const formData = new FormData()
        // formData.append("action", "createRequest")
        // formData.append("user_id")
        // axios.post()
        
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

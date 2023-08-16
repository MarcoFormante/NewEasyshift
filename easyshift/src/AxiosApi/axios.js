import axios from 'axios'

export default axios.create(
    {
        baseURL: process.env.REACT_APP_API_URL,
        timeout: 8000,
            headers: {
            "Content-Type": "x-www-form-urlencoded"  
            }
        }
        
    )
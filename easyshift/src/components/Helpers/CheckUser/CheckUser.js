import axios from "../../../AxiosApi/axios";

export default function CheckUser(userInfo) {
    const formData = new FormData()
    formData.append("userInfo",JSON.stringify(userInfo))
    return axios.post(process.env.REACT_APP_API_URL + "checkUser.php", formData, {
        headers: {
            "Content-Type": "x-www-form-urlencoded",
            "Authorization":`Bearer ${sessionStorage.getItem("token")}`
        }
    })
}
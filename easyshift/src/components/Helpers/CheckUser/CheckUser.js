import axios from "../../../AxiosApi/axios";

export default function CheckUser(userInfo) {
    let target = "token";
   if (userInfo.username === "Admin") {
        target = "adminToken"
   } 
    const formData = new FormData()
    formData.append("userInfo",JSON.stringify(userInfo))
    return axios.post("checkUser.php", formData, {
        headers: {
            "Content-Type": "x-www-form-urlencoded",
            "Authorization":`Bearer ${sessionStorage.getItem(target)}`
        }
    })
}
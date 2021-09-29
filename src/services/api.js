import axios from "axios";

const Api = axios.create({
    baseURL:'http://indoor.cnxtv.com.br/api',
    headers: {
        'Authorization': 'Bearer '+ localStorage.getItem('token')
    }
})

export default Api;
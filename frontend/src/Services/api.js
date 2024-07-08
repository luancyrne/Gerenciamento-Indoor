import axios from "axios";

const Api = axios.create({
    baseURL:'http://localhost/api',
    headers: {
        'Authorization': 'Bearer '+ localStorage.getItem('token')
    }
})

export default Api;
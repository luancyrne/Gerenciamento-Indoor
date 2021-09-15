import axios from "axios";

const Api = axios.create({
    baseURL:'http://indoor.lcprojects.net/api',
    headers: {
        'Authorization': 'Bearer '+ localStorage.getItem('token')
    }
})

export default Api;
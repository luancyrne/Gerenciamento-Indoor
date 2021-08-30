import axios from "axios";

const Api = axios.create({baseURL:'http://indoor.lcprojects.net/api/', headers: { 'Content-Type': 'multipart/form-data', 'Accept': '*/*' }})

export default Api;
import axios from 'axios';

const devURL = 'http://172.31.7.28:8282'
const prodURL = 'http://3.239.159.169:8282'

export default axios.create({
    baseURL: prodURL,
    withCredentials: true,
    headers:{"ngrok-skip-browser-warning" : "true"} 
});
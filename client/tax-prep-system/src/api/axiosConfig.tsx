import axios from 'axios';

const devURL = 'http://localhost:8282'
const prodURL = 'http://3.239.159.169:8282'

export default axios.create({
    baseURL: devURL,
    withCredentials: true,
    headers:{"ngrok-skip-browser-warning" : "true"} 
});
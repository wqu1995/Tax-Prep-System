import axios from 'axios';

const devURL = 'http://localhost:8282'
const prodURL = 'http://107.22.81.71:8282'

export default axios.create({
    baseURL: devURL
    baseURL: devURL,
    headers:{
        "ngrok-skip-browser-warning" : "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    } 
});
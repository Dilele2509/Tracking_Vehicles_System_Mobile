import axios from 'axios';

/* Le Thuy Tuong Vy do this task */
const BASE_URL = "http://192.168.1.9:3001/api/"

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials:true
});
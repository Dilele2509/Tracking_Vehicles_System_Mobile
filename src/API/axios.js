import axios from 'axios';

const BASE_URL = "http://192.168.1.56:3001/api/"

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosDifferentAPI = axios.create({})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials:true
});
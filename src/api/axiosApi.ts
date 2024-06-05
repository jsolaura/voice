import axios from "axios";

export const BASE_URL = 'http://localhost:8080/api';

export const axiosApi = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})
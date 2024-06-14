import axios, {Axios, AxiosRequestConfig} from "axios";

export const BASE_URL = 'http://localhost:3000/api';

export const client = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})

export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await client.get(url, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const postData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await client.post<T>(url, data, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const putData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await client.put<T>(url, data, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteData = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await client.delete<T>(url, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};
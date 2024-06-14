import axios, {Axios, AxiosRequestConfig} from "axios";
import {APIResponse} from "@/types/common";

export const BASE_URL = 'http://localhost:3000/api';

const client = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})

export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    try {
        const response = await client.get<APIResponse<T>>(url, config);
        console.log('response', response);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const postData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    try {
        const response = await client.post<APIResponse<T>>(url, data, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const putData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    try {
        const response = await client.put<APIResponse<T>>(url, data, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteData = async <T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    try {
        const response = await client.delete<APIResponse<T>>(url, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};
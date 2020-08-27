import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_URL,
};

const client: AxiosInstance = axios.create(config);

export default client

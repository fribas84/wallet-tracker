import axios, { AxiosInstance } from 'axios'

const axiosClient: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API}`
})

export  { axiosClient };
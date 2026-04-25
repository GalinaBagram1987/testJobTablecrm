import axios from 'axios'
import { BASE_URL } from './routes.js'
import { setupInterceptors } from './interceptors.js'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

export const apiWithInterceptors = setupInterceptors(axiosInstance)

export default apiWithInterceptors
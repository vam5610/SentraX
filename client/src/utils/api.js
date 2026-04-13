import axios from "axios"

import { getToken, logout } from "./auth"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    if (status === 401) {
      logout()
    }
    if (status === 403) {
      window.alert("Access denied: your role does not permit this action.")
    }
    return Promise.reject(error)
  },
)

export default api

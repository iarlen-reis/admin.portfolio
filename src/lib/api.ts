import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const authToken = document.cookie.replace('token=', '')
  if (authToken.length > 15) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

import axios from 'axios'
import { Cookies } from 'react-cookie'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const getCsrfToken = async () => {
  try {
    await axios.get('https://admin.iarlenreis.com.br/sanctum/csrf-cookie', {
      withCredentials: true,
    })
  } catch (error) {
    console.error('Erro ao obter o CSRF token:', error)
  }
}

api.interceptors.request.use(async (config) => {
  await getCsrfToken()

  const authToken = new Cookies().get('token')

  if (authToken.length > 15) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

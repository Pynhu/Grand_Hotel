import axios from 'axios'

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})


httpClient.interceptors.request.use((config) => {
  if (config.url?.includes('/auth/refresh')) {
    return config
  }

  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`
  }
  return config
})


httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh') &&
      !originalRequest.url?.includes('/auth/login')) {

      originalRequest._retry = true

      try {
        const { data } = await httpClient.post('/auth/refresh')
        localStorage.setItem('jwt', data.jwt)
        originalRequest.headers.Authorization = `Bearer ${data.jwt}`
        return httpClient(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('jwt')
        localStorage.removeItem('isLoggedIn')
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

console.log('🔧 API Configuration:', BASE_URL)
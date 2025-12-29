import axios from 'axios'

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'


export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

httpClient.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`
  }
  return config
})
console.log('🔧 API Configuration:')
console.log('  BASE_URL:', BASE_URL)
console.log('  USE_MOCKS:', USE_MOCKS)
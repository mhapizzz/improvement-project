import axios from 'axios'

const getBaseUrl = () => {
  const configured = (import.meta.env.VITE_API_BASE_URL || '').trim()
  if (configured) return configured.replace(/\/$/, '')
  if (import.meta.env.DEV) return '' // use proxy in dev
  return 'http://inventory-manager.local'
}

const api = axios.create({
  baseURL: getBaseUrl() || undefined,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.statusText ||
      error?.message ||
      'Request failed'
    return Promise.reject(new Error(message))
  }
)

export async function httpGet(path) {
  const { data } = await api.get(path)
  return data
}

export async function httpPost(path, body) {
  const { data } = await api.post(path, body)
  return data
}



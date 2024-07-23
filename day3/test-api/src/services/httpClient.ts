import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      return Promise.reject(
        new Error(error.response.data.message || 'An error occurred')
      )
    }
    return Promise.reject(error)
  }
)

export default axiosInstance

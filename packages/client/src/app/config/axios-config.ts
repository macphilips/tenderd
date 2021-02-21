import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import firebase from "firebase"

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL

const TIMEOUT = 60 * 1000
axios.defaults.timeout = TIMEOUT
axios.defaults.baseURL = SERVER_API_URL

const setupAxiosInterceptors = (auth: firebase.auth.Auth) => {
  const onRequestSuccess = async (config: AxiosRequestConfig) => {
    const token = await auth.currentUser?.getIdToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }
  const onResponseSuccess = (response: AxiosResponse) => response
  const onResponseError = (err: any) => {
    const status = err.status || (err.response ? err.response.status : 0)
    if (status === 403 || status === 401) {
      // onUnauthenticated()
    }
    return Promise.reject(err)
  }
  axios.interceptors.request.use(onRequestSuccess)
  axios.interceptors.response.use(onResponseSuccess, onResponseError)
}

export default setupAxiosInterceptors

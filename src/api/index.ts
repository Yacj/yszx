import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { MessagePlugin } from 'tdesign-vue-next'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  hideLoading?: boolean
}

interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
}

const service = axios.create({
  baseURL: (import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true') ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 1000 * 60,
  responseType: 'json',
})
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    const message = error.message || '请求错误'
    return Promise.reject(message)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const code = response.status
    if (typeof code !== 'undefined' && code !== 200) {
      return Promise.reject(new Error('Error'))
    }
    if (response.data.status !== 'Success') {
      MessagePlugin.error(response.data.data)
      return Promise.reject(new Error(response.data.data))
    }
    return Promise.resolve(response)
  },
  (error) => {
    const message = error.message || '请求错误'
    return Promise.reject(message)
  },
)

function request<T = any>(config: CustomAxiosRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    service
      .request<BaseResponse<T>>(config)
      .then((res: AxiosResponse) => resolve(res.data))
      .catch((err: { message: string }) => reject(err))
  })
}

request.get = <T = any>(url: string, params?: object): Promise<T> =>
  request({
    method: 'get',
    url,
    params,
  })

request.post = <T = any>(url: string, params?: object): Promise<T> =>

  request({
    method: 'post',
    url,
    data: params,
  })

export default request

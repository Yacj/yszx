import request from '@/api'

export interface LoginDataInterface {
  username: string
  password: string
  captcha: string
  agencyId: number | string
  verify_hash: string
  isAjax: boolean
}
export const userService = {
  getAgency: (params: {
    keyword?: string
    PageSize?: number
    PageIndex?: number
  }) => {
    return request.get('/api/User/get/agency', params)
  },
  getPicCode: (params?: any) => {
    return request.get('/api/User/get/piccode', params)
  },
  login: (params: LoginDataInterface) => {
    return request.post('/api/User/login', params)
  },
  getUserInfo: (params: {
    token: string
  }) => {
    return request.get('/api/User/get/user_info', params)
  },
  guest: () => {
    return request.post('/api/User/login/guest')
  },
  is_exist: (params: {
    tel: string
  }) => {
    return request.get('/api/User/register/is_exist', params)
  },
  set_code: (params: {
    tel: string
  }) => {
    return request.get('/api/User/register/set_code', params)
  },
  mobile: (params: {
    mobile: string
    code: string
    verify_hash: string
    nick_name: string
    password: string
    repass: string
    isAjax: true
    return_url: string
  }) => {
    return request.post('/api/User/register/mobile', params)
  },
}

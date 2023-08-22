import request from '@/api'

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
  login: (params: {
    username: string
    password: string
    captcha: string
    agencyId: number
    verify_hash: string
    isAjax: boolean
  }) => {
    return request.post('/api/User/login', params)
  },
  getUserInfo: (params: {
    token: string
  }) => {
    return request.get('/api/User/get/user_info', params)
  },
}

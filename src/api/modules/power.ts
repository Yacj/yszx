import request from '@/api'

export const powerService = {
  get_organ_list: (params: {
    pageInt: number
    pageSize: number
    Status: 0 | 1 | 2
    IsPurchase: 0 | 1 | 2
    IsAuthorized?: boolean
    keywords?: string
  }) => {
    return request.get('/api/Power/organ/get_list', params)
  },
}

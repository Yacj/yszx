import type { LocationQueryValue } from 'vue-router'
import type { UnwrapNestedRefs } from 'vue'
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
  get_options: () => {
    return request.get('/api/Power/get_options')
  },
  add_options: (
    params: UnwrapNestedRefs<{
      organIDList: any[]
      isDownload: null
      time: any[]
      isPurchase: null
      cateIDList: any[]
    }>,
  ) => {
    return request.post('/api/Power/add_options', params)
  },
  get_info: (params: { orgID: string | null | LocationQueryValue[] }) => {
    return request.get('/api/Power/get_info', params)
  },
  update_info: (
    params: {
      orgID: number | string
      cateIDList: Array<number>
      startTime: string
      endTime: string
      isPurchase: boolean
      isDownload: boolean
    },
  ) => {
    return request.post('/api/Power/update_info', params)
  },
  update_Status: (
    params: {
      orgID: number | string
      Status: boolean
    },
  ) => {
    return request.get('/api/Power/update_Status', params)
  },
}

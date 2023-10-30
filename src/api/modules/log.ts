import type { LocationQueryValue } from 'vue-router'
import request from '@/api'

export const logService = {
  add_browse: (params: {
    resCode: string | null | LocationQueryValue[]
    resName: string | null | LocationQueryValue[]
    categoryCode: string | null | LocationQueryValue[]
    resType: string | null | LocationQueryValue[]
  }) => {
    return request.post('/api/Log/add_browse', params)
  },
  get_browse: (
    params: {
      type: 'Month' | 'Week'
    },
  ) => {
    return request.get('/api/Log/get_browse', params)
  },
}

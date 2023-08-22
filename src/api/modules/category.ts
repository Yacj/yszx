import request from '@/api'

export const categoryService = {
  get: (params: {
    orgID?: string | number
    hasRow: boolean
  }) => {
    return request.get('/api/Category/get', params)
  },
  resByCate: (params: { PageSize: number; PageIndex: number; Code: string | null }) => {
    return request.get('/api/Category/get/resByCate', params)
  },
}

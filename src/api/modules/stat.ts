import request from '@/api'

export const statService = {
  res_library: () => {
    return request.get('/api/Stat/res/library')
  },
}

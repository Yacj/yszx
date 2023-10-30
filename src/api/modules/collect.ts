import request from '@/api'

const collectService = {
  add: (params: {
    Name: string
  }) => {
    return request.post(`/api/Collect/add?Name=${params.Name}`)
  },
  get: () => {
    return request.get('/api/Collect/get')
  },
  delete: (params: {
    id: number
  }) => {
    return request.get('/api/Collect/delete', params)
  },
  update: (params: {
    id: number
    Name: string
  }) => {
    return request.get('/api/Collect/update', params)
  },
  res_list: (params: {
    CataID: number
    PageIndex: number
    PageSize: number
  }) => {
    return request.get('/api/Collect/res_list', params)
  },
  res_add: (
    params: {
      /**
       * 收藏夹ID
       */
      CollectID: number
      /**
       * 资源编码
       */
      ResCode: string
      /**
       * 资源类型
       */
      ResType: string
    },
  ) => {
    return request.post('/api/Collect/res_add', params)
  },
  res_delete: (params: {
    CataID: number
    ResCode: string
  }) => {
    return request.get('/api/Collect/res_delete', params)
  },
}

export default collectService

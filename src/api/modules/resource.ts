import request from '@/api'

export const resourceService = {
  get_details: (params: {
    ResCode: string
    ResType: string
  }) => {
    return request.get('/api/Resource/get_details', params)
  },
  getByChapterID: (params: {
    ChapterID: string
  }) => {
    return request.get('/api/Resource/Resouce/getByChapterID', params)
  },
}

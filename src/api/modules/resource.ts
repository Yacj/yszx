import type {LocationQueryValue} from 'vue-router'
import request from '@/api'

export type ResDetailType = 'Couse' | 'File' | 'Test' | 'Exam' | 'Book' | 'Image'

export const resourceService = {
  get_details: (params: {
    ResCode: string | LocationQueryValue[] | null
    ResType: ResDetailType
  }) => {
    return request.get('/api/Resource/get_details', params)
  },
  getByChapterID: (params: {
    ChapterID: string
  }) => {
    return request.get('/api/Resource/Resouce/getByChapterID', params)
  },
  download: (params: {
    ResCode: string | LocationQueryValue[] | null
    ResType: ResDetailType
    chapterID?: string
  }) => {
    return request.get('/api/Resource/download', params)
  },
  get_recommend: (params: {
    ResCode: string | LocationQueryValue[] | null
  }) => {
    return request.get('/api/Resource/get_recommend', params)
  },
  homeList: () => {
    return request.get('/api/Resource/homeList')
  },
  hotList: (params: {
    pageSize: number
  }) => {
    return request.get('/api/Resource/hotList', params)
  },
}

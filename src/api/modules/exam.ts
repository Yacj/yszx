import type { LocationQueryValue } from 'vue-router'
import request from '@/api'

export const examService = {
  set: (params: {
    userID: string
    userName: string
    resCode: string | LocationQueryValue[]
    answerTime: 0
    isEnd: true
    resultList: string[]
  }) => {
    return request.post('/api/ResExam/result/set', params)
  },
  get_result: (params: {
    userID: string
    ID: string | LocationQueryValue[]
  }) => {
    return request.get('/api/ResExam/result/get', params)
  },
}

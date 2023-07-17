import { defineStore } from 'pinia'
import storageUtil from '@/utils/storage'

export const useUserStore = defineStore({
  id: 'User',
  state: () => ({
    token: storageUtil.getItem('token') || '',
    userInfo: storageUtil.getItem('userInfo') || {},
    failure_times: storageUtil.getItem('failure_times') || 0,
  }),
  getters: {
    isLogin(): boolean {
      let isLogin = false
      if (this.token) {
        const time = new Date().getTime()
        if (time < Number.parseInt(this.failure_times) * 1000) {
          isLogin = true
        }
        else {
          this.token = ''
          storageUtil.removeItem('token')
        }
      }
      return isLogin
    },
  },
  actions: {
    async login(data: any) {
      const token = '121212'
      this.token = token
      this.failure_times = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 * 365
      storageUtil.setItem('token', token)
      storageUtil.setItem('failure_times', this.failure_times)
    },
    logout() {
      this.token = ''
      this.failure_times = 0
      storageUtil.removeItem('token')
      storageUtil.removeItem('failure_times')
    },
  },
})

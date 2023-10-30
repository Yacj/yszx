import { defineStore } from 'pinia'
import storageUtil from '@/utils/storage'
import type { LoginDataInterface } from '@/api/modules/user'
import { userService } from '@/api/modules/user'
import { deepClone } from '@/utils/object'
export const useUserStore = defineStore({
  id: 'User',
  state: () => ({
    token: storageUtil.getItem('token') || '',
    guestToken: storageUtil.getItem('guestToken') || '',
    userInfo: storageUtil.getItem('userInfo') || {},
    failure_times: storageUtil.getItem('failure_times') || 0,
    orgID: storageUtil.getItem('orgID') || '',
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
    async login(data: LoginDataInterface) {
      const resData = await userService.login(data)
      if (resData.data) {
        await this.getUserInfo(resData.data.access_token)
      }
    },
    // 游客登陆
    async guestLogin() {
      const {
        data: {
          userToken,
        },
      } = await userService.guest()
      storageUtil.setItem('guestToken', userToken)
      this.guestToken = userToken
    },
    async getUserInfo(token: string) {
      userService.getUserInfo({ token }).then((res) => {
        const data = deepClone(res.data)
        delete data.userToken
        delete data.orgID
        this.userInfo = data
        storageUtil.setItem('userInfo', data)

        this.orgID = res.data.orgID
        storageUtil.setItem('orgID', res.data.orgID)

        this.token = token
        storageUtil.setItem('token', token)

        this.failure_times = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 * 365
        storageUtil.setItem('failure_times', this.failure_times)

        // 登陆成功后，能成功获取正式的用户信息 最好要删除游客数据
        this.guestToken = ''
        storageUtil.removeItem('guestToken')
      })
    },
    logout() {
      this.token = ''
      this.failure_times = 0
      this.userInfo = {}
      this.orgID = ''
      storageUtil.removeItem('userInfo')
      storageUtil.removeItem('orgID')
      storageUtil.removeItem('token')
      storageUtil.removeItem('failure_times')
    },
  },
})

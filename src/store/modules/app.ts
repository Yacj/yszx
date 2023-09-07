import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'App',
  state: () => ({
    colorScheme: 'light',
  }),
  getters: {
  },
  actions: {
    setColorScheme(val: string) {
      this.colorScheme = val
    },
  },
})

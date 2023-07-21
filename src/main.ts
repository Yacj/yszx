import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/store'
import router from '@/router'

import '@unocss/reset/tailwind-compat.css' // unocss reset
import 'virtual:uno.css'

import 'tdesign-vue-next/es/style/index.css'

// main.css
import './styles/main.css'

// svg图标
import 'virtual:svg-icons-register'

// 进度条css
import 'nprogress/nprogress.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

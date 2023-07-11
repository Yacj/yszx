import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/store'
import router from '@/router'

// main.css
import './styles/main.css'

// unocss reset
import '@unocss/reset/tailwind.css'
import 'uno.css'

// svg图标
import 'virtual:svg-icons-register'

// 进度条css
import 'nprogress/nprogress.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

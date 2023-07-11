import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import { setPageTitle } from '@/utils'

let routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login.vue'),
    meta: {
      title: '登录',
    },
  },
]
const routesContext: any = import.meta.glob('./modules/*.ts', { eager: true })
Object.keys(routesContext).forEach((v) => {
  routes.push(routesContext[v].default)
})
routes.push({
  path: '/:pathMatch(.*)*',
  component: () => import('@/pages/[...all].vue'),
  meta: {
    title: '找不到页面',
  },
})
routes = routes.flat()
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to) => {
  setPageTitle(to.meta.title ?? '')
  NProgress.done()
})

export default router

import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import { MessagePlugin } from 'tdesign-vue-next'
import { setPageTitle } from '@/utils'
import { useUserStore } from '@/store/modules/user'

let routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/pages/403.vue'),
    meta: {
      title: '暂无权限',
    },
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/pages/test.vue'),
    meta: {
      title: '测试',
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
  const userStore = useUserStore()
  const token = userStore.token
  if (!token && to.meta.needLogin) {
    MessagePlugin.error('请先登录')
    next(`/login?redirect=${to.fullPath}`)
  }
  else {
    next()
  }
})

router.afterEach((to) => {
  if (to.path === '/home/list') {
    setPageTitle(to.query.name || '列表页')
  }
  else {
    setPageTitle(to.meta.title ?? '')
  }
  NProgress.done()
})

export default router

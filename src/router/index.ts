import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import { MessagePlugin } from 'tdesign-vue-next'
import { setPageTitle } from '@/utils'
import { useUserStore } from '@/store/modules/user'
import useKeepAliveStore from '@/store/modules/keepAlive'

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
export const routesContext: any = import.meta.glob('./modules/*.ts', { eager: true})
export const asyncRoutes: RouteRecordRaw[] = Object.keys(routesContext).map(key => routesContext[key] || {})

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

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  const token = userStore.token
  const guestToken = userStore.guestToken
  if (!token && !guestToken) {
    useUserStore().guestLogin()
  }
  if (!token && to.meta.needLogin) {
    MessagePlugin.error('请先登录')
    next(`/login?redirect=${to.fullPath}`)
  }
  else {
    const toRole: any = to.meta?.role
    if (to.meta.requireAuth && !toRole.includes(userStore.role)) {
      next('/403')
    }
    next()
  }
})

router.afterEach((to, from) => {
  const keepAliveStore = useKeepAliveStore()
  const cache = to.meta?.cache
  const fromCache: any = from.meta?.cache
  if (cache) {
    const componentName = to.matched.at(-1)?.components?.default.name
    if (componentName) {
      keepAliveStore.add(componentName)
    }
    else {
      console.warn('该页面组件未设置组件名，会导致缓存失效，请检查')
    }
  }
  if (fromCache) {
    const componentName = from.matched.at(-1)?.components?.default.name
    if (componentName) {
      switch (typeof from.meta.cache) {
        case 'string':
          if (from.meta.cache !== to.name) {
            keepAliveStore.remove(componentName)
          }
          break
        case 'object':
          if (!fromCache.includes(to.name as string)) {
            keepAliveStore.remove(componentName)
          }
          break
      }
    }
  }
  if (to.path === '/home/list') {
    setPageTitle(to.query.name || '列表页')
  }
  else {
    setPageTitle(to.meta.title ?? '')
  }
  document.documentElement.scrollTop = 0
  NProgress.done()
})

export default router

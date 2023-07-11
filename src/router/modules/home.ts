import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/layouts/index.vue'),
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '',
        name: 'HomeIndex',
        component: () => import('@/pages/home/index.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
]

export default routes

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
      {
        path: 'list',
        name: 'HomeList',
        component: () => import('@/pages/home/list.vue'),
        meta: {
          title: '列表页',
        },
      },
      {
        path: 'detail',
        name: 'HomeDetail',
        component: () => import('@/pages/home/detail.vue'),
        meta: {
          title: '详情页',
        },
      },
    ],
  },
]

export default routes

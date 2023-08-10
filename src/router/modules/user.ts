export default {
  path: '/user',
  name: 'User',
  component: () => import('@/layouts/index.vue'),
  meta: {
    title: '用户',
  },
  children: [
    {
      path: '',
      name: 'UserIndex',
      component: () => import('@/pages/user/index.vue'),
      meta: {
        title: '用户',
      },
    },
    {
      path: 'recent',
      name: 'UserRecent',
      component: () => import('@/pages/user/index.vue'),
      meta: {
        title: '最近浏览',
      },
      children: [
        {
          path: '',
          name: 'UserRecentIndex',
          component: () => import('@/pages/user/recent.vue'),
        },
      ],
    },
    {
      path: 'collection',
      name: 'UserCollection',
      component: () => import('@/pages/user/index.vue'),
      meta: {
        title: '我的收藏',
      },
      children: [
        {
          path: '',
          name: 'UserCollectionIndex',
          component: () => import('@/pages/user/collection.vue'),
          meta: {
            title: '我的收藏',
          },
        },
      ],
    },
  ],
}

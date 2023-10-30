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
        needLogin: true,
      },
    },
    {
      path: 'resource',
      name: 'UserResource',
      component: () => import('@/pages/user/index.vue'),
      meta: {
        title: '看板统计',
        needLogin: true,
      },
      children: [
        {
          path: '',
          name: 'UserResourceIndex',
          component: () => import('@/pages/user/resource.vue'),
          meta: {
            title: '看板统计',
          },
        }
      ]
    },
    {
      path: 'recent',
      name: 'UserRecent',
      component: () => import('@/pages/user/index.vue'),
      meta: {
        title: '最近浏览',
        needLogin: true,
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
        needLogin: true,
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
    {
      name: 'info',
      path: 'info',
      component: () => import('@/pages/user/index.vue'),
      meta: {
        title: '个人信息',
        needLogin: true,
      },
      children: [
        {
          path: '',
          name: 'UserInfoIndex',
          component: () => import('@/pages/user/info.vue'),
          meta: {
            title: '个人信息',
          },
        },
      ],
    },
    {
      name: 'safe',
      path: 'safe',
      component: () => import('@/pages/user/index.vue'),
      meta: {
        title: '安全设置',
        needLogin: true,
      },
      children: [
        {
          path: '',
          name: 'UserSafeIndex',
          component: () => import('@/pages/user/safe.vue'),
          meta: {
            title: '安全设置',
          },
        },
      ],
    },
    {
      name: 'exam',
      path: 'exam',
      component: () => import('@/pages/user/index.vue'),
      meta: {
        title: '我的考试',
        needLogin: true,
      },
      children: [
        {
          path: '',
          name: 'UserExamIndex',
          component: () => import('@/pages/user/exam.vue'),
          meta: {
            title: '我的考试',
          },
        },
      ],
    },
  ],
}

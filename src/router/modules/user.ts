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
        icon: 'clarity:resource-pool-outline-alerted',
      },
      children: [
        {
          path: '',
          name: 'UserResourceIndex',
          component: () => import('@/pages/user/resource.vue'),
          meta: {
            title: '看板统计',
          },
        },
      ],
    },
    {
      path: 'recent',
      name: 'UserRecent',
      component: () => import('@/pages/user/index.vue'),
      meta: {
        title: '最近浏览',
        needLogin: true,
        icon: 'mdi:recent',
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
        icon: 'heroicons-outline:collection',
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
      name: 'exam',
      path: 'exam',
      component: () => import('@/pages/user/index.vue'),
      meta: {
        title: '我的考试',
        needLogin: true,
        icon: 'healthicons:i-exam-qualification-outline',
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
    {
      name: 'authority',
      path: 'authority',
      component: () => import('@/pages/user/index.vue'),
      meta: {
        title: '授权管理',
        requireAuth: true,
        role: ['admin'],
        icon: 'mdi:account-cog',
      },
      children: [
        {
          path: '',
          name: 'UserAuthorityIndex',
          component: () => import('@/pages/user/authority.vue'),
        },
        {
          path: 'add',
          name: 'UserAuthorityAdd',
          component: () => import('@/pages/user/updateAuthority.vue'),
          meta: {
            title: '添加授权',
          },
        },
        {
          path: 'edit',
          name: 'UserAuthorityEdit',
          component: () => import('@/pages/user/updateAuthority.vue'),
          meta: {
            title: '修改授权',
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
        icon: 'tabler:message',
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
        icon: 'mingcute:safe-alert-line',
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
  ],
}

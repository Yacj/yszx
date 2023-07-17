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
  ],
}

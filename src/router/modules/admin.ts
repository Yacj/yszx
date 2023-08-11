export default {
  path: '/admin',
  name: 'Admin',
  component: () => import('@/layouts/index.vue'),
  meta: {
    title: '管理',
  },
  children: [
    {
      path: '',
      name: 'AdminIndex',
      component: () => import('@/pages/admin/index.vue'),
      meta: {
        title: '管理',
      },
    },
  ],
}

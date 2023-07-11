<script setup lang="ts">
import { SearchIcon } from 'tdesign-icons-vue-next'

const menuList = [
  {
    name: '首页',
    path: '/',
    id: 1,
    children: [],
  },
  {
    name: '教学案例',
    path: '/case',
    id: 2,
    children: [
      {
        name: '学前',
        path: '/case/preschool',
        id: 21,
      },
      {
        name: '小学',
        path: '/case/primary',
        id: 22,
      },
      {
        name: '初中',
        path: '/case/middle',
        id: 23,
      },
      {
        name: '高中',
        path: '/case/high',
        id: 24,
      },
    ],
  },
  {
    name: '教学题库',
    path: '/question',
    id: 3,
    children: [],
  },
  {
    name: '教学指导',
    path: '/guide',
    id: 4,
    children: [],
  },
  {
    name: '信息素养',
    path: '/info',
    id: 5,
    children: [],
  },
  {
    name: '教资认证',
    path: '/certification',
    id: 6,
    children: [],
  },
  {
    name: '教学模板',
    path: '/template',
    id: 7,
    children: [],
  },
  {
    name: '课本教材',
    path: '/textbook',
    id: 8,
    children: [],
  },
]
</script>

<template>
  <t-head-menu :value="menuList[0].id" expand-type="popup">
    <template #logo>
      <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-light.png" alt="logo" class="h-8 mr-3">
    </template>
    <template v-for="item in menuList" :key="item.id">
      <t-menu-item v-if="item.children.length === 0" :value="item.id" :to="item.path">
        {{ item.name }}
      </t-menu-item>
      <t-submenu v-else :value="item.id" :title="item.name">
        <t-menu-item v-for="child in item.children" :key="child.id" :value="child.path" :to="child.path">
          {{ child.name }}
        </t-menu-item>
      </t-submenu>
    </template>
    <t-input class="ml-12 w-60" type="search" :clearable="true" placeholder="请输入关键词搜索">
      <template #suffixIcon>
        <SearchIcon :style="{ cursor: 'pointer' }" />
      </template>
    </t-input>
    <template #operations>
      <t-space break-line>
        <router-link to="Login">
          登录
        </router-link>
        <t-divider layout="vertical" />
        <span>注册</span>
      </t-space>
    </template>
  </t-head-menu>
</template>

<style scoped lang="scss">
:deep(.t-head-menu__inner){
  height: 75px;
  @apply container mx-auto
}
:deep(.t-menu__operations:not(:empty)){
  height: 75px;
}
:deep(.t-menu__content){
  font-size: 15px;
}
</style>

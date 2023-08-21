<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

const route = useRoute()
const userMenuList = ref([
  {
    name: '最近浏览',
    path: '/user/recent',
    id: 1,
    icon: 'mdi:recent',
  },
  {
    name: '我的收藏',
    path: '/user/collection',
    id: 2,
    icon: 'heroicons-outline:collection',
  },
  {
    name: '我的考试',
    path: '/user/exam',
    id: 3,
    icon: 'ph:exam',
  },
  {
    name: '个人信息',
    path: '/user/info',
    id: 4,
    icon: 'ic:outline-info',
  },
  {
    name: '安全设置',
    path: '/user/safe',
    id: 5,
    icon: 'mingcute:safe-alert-line',
  },
])
const userMenuId = ref(userMenuList.value.find(item => item.path === route.path)?.id)
const router = useRouter()
function handleMenuClick(path: any, id: number) {
  router.push(path)
  userMenuId.value = id
}
</script>

<template>
  <div class="max-w-screen-xl mx-auto my-5">
    <t-breadcrumb>
      <t-breadcrumb-item to="/">
        首页
      </t-breadcrumb-item>
      <t-breadcrumb-item>个人中心</t-breadcrumb-item>
      <t-breadcrumb-item>
        {{ userMenuList.find(item => item.id === userMenuId)?.name }}
      </t-breadcrumb-item>
    </t-breadcrumb>
    <t-row :gutter="[24, 24]" class="mt-5">
      <t-col :flex="1" class="user-menu">
        <t-card :bordered="false">
          <div class="user-menu-header mt-3 flex-center flex-col">
            <t-avatar size="100px">
              W
            </t-avatar>
            <div class="user-menu-header-info mt-2">
              <div class="text-xl">
                王老师
              </div>
            </div>
          </div>
          <t-menu :value="userMenuId">
            <t-menu-item v-for="item in userMenuList" :key="item.id" :value="item.id" @click="handleMenuClick(item.path, item.id)">
              <template #icon>
                <SvgIcon :name="item.icon" type="iconify" :size="20" class="mr-3" />
              </template>
              {{ item.name }}
            </t-menu-item>
          </t-menu>
        </t-card>
      </t-col>
      <t-col :flex="6">
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
      </t-col>
    </t-row>
  </div>
</template>

<style scoped lang="scss">
:deep(.user-menu){
  .t-card__body{
    padding: 5px 0;
  }
  .t-menu__item{
    font-size: 15px;
  }
}

</style>

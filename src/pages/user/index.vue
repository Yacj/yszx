<script setup lang="ts">
import type { Ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { useUserStore } from '@/store/modules/user'
import userRouter from '@/router/modules/user'

interface UserMenuList {
  name: string
  path: string
  id: number
  icon: any
}

let currentId = 0

const userMenuList: Ref<UserMenuList[]> = ref([])
const userMenuId = ref(0)
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const router = useRouter()
const route = useRoute()
const roles = computed(() => userStore.role)

onMounted(() => {
  handleAuthorityMenu()
})

function handleAuthorityMenu() {
  const routerArray = userRouter.children
  routerArray.forEach((route) => {
    // 判断是否要跳过空路径
    if (route.path === '') {
      return
    }

    // 判断是否需要认证
    if (route.meta.requireAuth) {
      // 如果有角色要求且用户角色不匹配，则跳过
      if (route.meta.role && route.meta.role.length > 0 && !route.meta.role.includes(roles.value)) {
        return
      }
    }

    // 添加到array，同时递增id
    userMenuList.value.push({
      name: route.meta.title,
      path: `/user/${route.path}`,
      id: currentId++,
      icon: route.meta.icon,
    })
  })
  userMenuId.value = Number(userMenuList.value.find(item => item.path === route.path)?.id)
}
function handleMenuClick(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="max-w-[1350px] mx-auto my-5">
    <t-row :gutter="[24, 24]">
      <t-col :flex="1" class="user-menu">
        <div class="fixed">
          <t-breadcrumb>
            <t-breadcrumb-item to="/">
              首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>个人中心</t-breadcrumb-item>
            <t-breadcrumb-item>
              {{ userMenuList.find(item => item.id === userMenuId)?.name }}
            </t-breadcrumb-item>
          </t-breadcrumb>
          <t-card :bordered="false" class="!mt-5">
            <div class="user-menu-header mt-3 flex-center flex-col">
              <t-avatar v-if="userInfo.realName" size="100px">
                {{ userInfo.realName[0] || userInfo.nickName[0] }}
              </t-avatar>
              <div class="user-menu-header-info mt-2">
                <div class="text-xl">
                  {{ userInfo.realName || userInfo.nickName }}
                </div>
              </div>
            </div>
            <t-menu v-model:value="userMenuId">
              <t-menu-item v-for="item in userMenuList" :key="item.id" :value="item.id" class="!my-2" @click="handleMenuClick(item.path)">
                <template #icon>
                  <SvgIcon :name="item.icon" type="iconify" :size="20" class="mr-3" />
                </template>
                {{ item.name }}
              </t-menu-item>
            </t-menu>
          </t-card>
        </div>
      </t-col>
      <t-col :flex="6" class="!ml-11 !mt-10">
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

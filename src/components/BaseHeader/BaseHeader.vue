<script setup lang="ts">
import { ChevronDownIcon, PoweroffIcon, UserCircleIcon } from 'tdesign-icons-vue-next'
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next'

import { useUserStore } from '@/store/modules/user'
import { categoryService } from '@/api/modules/category'

const title = import.meta.env.VITE_APP_TITLE
const searchVal = ref('')
const menuList = ref([])

const userStore = useUserStore()
const token = computed(() => userStore.token)
const userInfo = computed(() => userStore.userInfo)
const orgId = computed(() => userStore.orgID)
const router = useRouter()
const route = useRoute()
const menuId = ref<number>(2)

onMounted(() => {
  getCateGoryList()
})

function getCateGoryList() {
  categoryService.get({
    orgID: orgId.value,
    hasRow: false,
  }).then((res) => {
    const data = res.data
    data.map((item: any) => {
      item.path = `/home/list?name=${item.name}&id=${item.cid}&code=${item.code}`
      if (item.row.length > 0) {
        item.row.map((row: any) => {
          row.path = `/home/list?name=${row.name}&id=${row.cid}&code=${item.code}`
          return row
        })
      }
      return item
    })
    data.unshift({
      name: '首页',
      path: '/home',
      cid: 0,
      row: [],
      level: 0,
      code: '',
    })
    menuList.value = data
    if (route.path === '/home') {
      menuId.value = 0
    }
    else {
      menuId.value = getMenuId() || -1
    }
  }).catch((err) => {
    console.log(err)
  })
}

function handleNav(path: string, id: number) {
  router.push(path)
  if (path === '/home') {
    menuId.value = 0
  }
  else {
    menuId.value = id
  }
}

function handleLogout() {
  const dialog = DialogPlugin.confirm({
    header: '提示',
    body: '确定退出登录吗？',
    onConfirm: () => {
      MessagePlugin.success('退出登录成功')
      userStore.logout()
      router.push('/login')
      dialog.hide()
    },
  })
}

watch(() => route.path, () => {
  menuId.value = route.path === '/home' ? 0 : getMenuId()
})

function handleNavSearch() {
  console.log('12')
}

function getMenuId() {
  let findId = 0
  menuList.value.forEach((item) => {
    if (item.row.length > 0) {
      item.row.forEach((row: any) => {
        if (row.cid === Number(route.query.id)) {
          findId = Number(row.cid)
        }
      })
    }
    else {
      if (item.cid === Number(route.query.id)) {
        findId = Number(item.cid)
      }
    }
  })
  return findId
}
</script>

<template>
  <t-head-menu :value="menuId" expand-type="popup">
    <template #logo>
      <h1 class="text-3xl font-bold tracking-wide">
        {{ title }}
      </h1>
    </template>
    <template v-for="item in menuList" :key="item.cid">
      <t-menu-item
        v-if="item.row.length === 0" :value="item.cid"
        @click="handleNav(item.path, item.cid)"
      >
        {{ item.name }}
      </t-menu-item>
      <t-submenu v-else :value="item.cid" :title="item.name">
        <t-menu-item v-for="child in item.row" :key="child.cid" :value="child.cid" @click="handleNav(child.path, child.cid)">
          {{ child.name }}
        </t-menu-item>
      </t-submenu>
    </template>
    <!--    <t-input-adornment> -->
    <!--      <t-input -->
    <!--        v-model="searchVal" placeholder="请输入关键词搜索" class="ml-12 !w-60" size="medium" -->
    <!--        @enter="handleNavSearch" -->
    <!--      /> -->
    <!--      <template #append> -->
    <!--        <t-button type="submit" @click="handleNavSearch"> -->
    <!--          <SearchIcon :style="{ cursor: 'pointer' }" /> -->
    <!--        </t-button> -->
    <!--      </template> -->
    <!--    </t-input-adornment> -->

    <template #operations>
      <t-space v-if="token === ''" break-line :size="2">
        <!--        <router-link :to="`/login?redirect=${route.path}`"> -->
        <!--          登录 -->
        <!--        </router-link> -->
        <router-link to="/login">
          登录
        </router-link>
        <!--        <t-divider layout="vertical" /> -->
        <!--        <router-link to="login"> -->
        <!--          注册 -->
        <!--        </router-link> -->
      </t-space>
      <div v-else class="flex-center">
        <t-dropdown :min-column-width="120" trigger="click">
          <template #dropdown>
            <t-dropdown-menu>
              <t-dropdown-item class="user-dropdown-container-item mb-2" @click="handleNav('/user/recent', -1)">
                <UserCircleIcon />
                个人中心
              </t-dropdown-item>
              <t-dropdown-item class="user-dropdown-container-item" @click="handleLogout">
                <PoweroffIcon />
                退出登录
              </t-dropdown-item>
            </t-dropdown-menu>
          </template>
          <t-button class="header-user-btn" theme="default" variant="text" size="large">
            <div class="header-user-account flex">
              <t-avatar size="medium">
                {{ userInfo.realName[0] }}
              </t-avatar>
              <div class="relative top-[5px] ml-2">
                {{ userInfo.realName }}
              </div>
            </div>
            <template #suffix>
              <ChevronDownIcon />
            </template>
          </t-button>
        </t-dropdown>
      </div>
    </template>
  </t-head-menu>
</template>

<style scoped lang="scss">
:deep(.t-head-menu__inner) {
  height: 75px;
  padding: 0 var(--td-comp-margin-xxxxl);
  @apply mx-auto
}

:deep(.t-menu__operations:not(:empty)) {
  height: 75px;
}

:deep(.t-menu__content) {
  font-size: 15px;
}

.user-dropdown-container-item {
  .t-dropdown__item-text {
    @apply flex-y-center
  }

  .t-icon {
    font-size: var(--td-comp-size-xxxs);
    margin-right: var(--td-comp-margin-s);
  }
}
</style>

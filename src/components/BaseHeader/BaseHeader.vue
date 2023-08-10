<script setup lang="ts">
import {SearchIcon} from 'tdesign-icons-vue-next'
import {DialogPlugin, MessagePlugin} from 'tdesign-vue-next'
import {useUserStore} from '@/store/modules/user'
import {UserCircleIcon, PoweroffIcon, ChevronDownIcon} from 'tdesign-icons-vue-next'

const searchVal = ref('')
const menuList = [
  {
    name: '首页',
    path: '/home',
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
    // path: '/question',
    path: '/home/list',
    id: 3,
    children: [],
  },
  {
    name: '教学指导',
    // path: '/guide',
    path: '/home/list',
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

const userStore = useUserStore()
const {token} = userStore
const router = useRouter()
const route = useRoute()
const menuId = ref<Number>(0)

if (route.path === '/home') {
  menuId.value = 1
} else {
  menuId.value = getMenuId()
}
// handleSetMenuId()
// handleSetRouteMatchedTitle()

function handleSetMenuId() {
  const {query} = route
  if (query.name) {
    menuId.value = Number(menuList.find(item => item.name === query.name)?.id)
  }
}

function handleSetRouteMatchedTitle() {
  document.title = <string>route.query.name || '首页'
  route.matched.map((item) => {
    if (item.path === route.path) {
      item.meta.title = route.query.name || '首页'
      return item
    }
    return item
  })
}

function handleNav(path: string, id: number) {
  router.push(path)
  menuId.value = id
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
  menuId.value = route.path === '/home' ? 1 : getMenuId()
})
// onBeforeRouteUpdate(async (to, from) => {
//   if (to.path === '/home') {
//     menuId.value = 1
//   } else {
//     menuId.value = Number(menuList.find(item => item.id === +to.query.id)?.id)
//   }
//   to.meta.title = to.query.name || '首页'
//   to.matched.map((item) => {
//     if (item.path === to.path) {
//       item.meta.title = to.query.name || '首页'
//       return item
//     }
//     return item
//   })
// })

function handleNavSearch() {
  console.log('12')
}

function getMenuId() {
  return Number(menuList.find(item => item.id === Number(route.query.id))?.id)
}
</script>

<template>
  <t-head-menu :value="menuId" expand-type="popup">
    <template #logo>
      <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-light.png" alt="logo" class="h-8 mr-3">
    </template>
    <template v-for="item in menuList" :key="item.id">
      <t-menu-item
        v-if="item.children.length === 0" :value="item.id"
        @click="handleNav(`${item.path === '/home' ? `${item.path}` : `${item.path}?name=${item.name}&id=${item.id}`}`, item.id)"
      >
        {{ item.name }}
      </t-menu-item>
      <t-submenu v-else :value="item.id" :title="item.name">
        <t-menu-item v-for="child in item.children" :key="child.id" :value="child.path" :to="child.path">
          {{ child.name }}
        </t-menu-item>
      </t-submenu>
    </template>
    <t-input-adornment>
      <t-input v-model="searchVal" placeholder="请输入关键词搜索" class="ml-12 !w-60" @enter="handleNavSearch"
               size="medium"/>
      <template #append>
        <t-button type="submit" @click="handleNavSearch">
          <SearchIcon :style="{ cursor: 'pointer' }"/>
        </t-button>
      </template>
    </t-input-adornment>

    <template #operations>
      <t-space v-if="token === ''" break-line :size="2">
        <router-link to="/login">
          登录
        </router-link>
        <t-divider layout="vertical"/>
        <router-link to="login">
          注册
        </router-link>
      </t-space>
      <div v-else class="flex-center">
        <t-dropdown :min-column-width="120" trigger="click">
          <template #dropdown>
            <t-dropdown-menu>
              <t-dropdown-item class="user-dropdown-container-item mb-2" @click="handleNav('/user/recent',0)">
                <UserCircleIcon/>
                个人中心
              </t-dropdown-item>
              <t-dropdown-item class="user-dropdown-container-item" @click="handleLogout">
                <PoweroffIcon/>
                退出登录
              </t-dropdown-item>
            </t-dropdown-menu>
          </template>
          <t-button class="header-user-btn" theme="default" variant="text" size="large">
            <div class="header-user-account">
              <t-avatar size="medium"> W </t-avatar>

              {{ token }}
            </div>
            <template #suffix>
              <ChevronDownIcon/>
            </template>
          </t-button>
        </t-dropdown>
      </div>
    </template>
  </t-head-menu>
</template>

<style scoped lang="scss">
:global(.t-menu__popup-wrapper) {
  width: 100px;
}

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

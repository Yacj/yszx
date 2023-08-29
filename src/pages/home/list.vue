<script setup lang="ts">
// import { DownloadIcon, HeartFilledIcon, HeartIcon } from 'tdesign-icons-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import type { LocationQueryValue } from 'vue-router'
import { fileDownload } from '@/utils/file'
import { useUserStore } from '@/store/modules/user'
import { categoryService } from '@/api/modules/category'
import baseUrl from '@/utils/url'
import Result from '@/components/Result/Result.vue'

const list = ref([])
const userStore = useUserStore()
const token = computed(() => userStore.token)
const route = useRoute()
const orgId = computed(() => userStore.orgID)
const {
  query: { id: RouteId },
} = route

// 分类
const categoryList = ref([])
const categoryId = ref(0)

const cateList = ref([])
const Code = ref<string | LocationQueryValue[] | null>('')

const total = ref(0)
const pagination = ref({
  current: 1,
  pageSize: 12,
})

const loadMoreShow = ref(false)
watch(
  () => route.query,
  (value) => {
    const {
      id,
      code,
    } = value
    if (id) {
      categoryId.value = Number(id)
    }
    if (code) {
      Code.value = code
      getResByCateList()
    }
  },
  { immediate: true, deep: true },
)

onMounted(() => {
  nextTick(() => {
    const scrollToTop = (element: any): void => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    scrollToTop(document.querySelector('.filter'))
    getCategoryList()
  })
})

function getCategoryList() {
  categoryService.get({
    orgID: orgId.value,
    hasRow: true,
  }).then((res) => {
    categoryList.value = res.data
    categoryId.value = Number(RouteId) || res.data[0].cid
  })
}

function handleCategoryClick(id: number, code: string) {
  categoryId.value = id
  Code.value = code
  cateList.value = []
  list.value = []
  pagination.value = {
    current: 1,
    pageSize: 12,
  }
  getResByCateList()
}

function handleCategoryRowClick(code: string) {
  Code.value = code
  list.value = []
  pagination.value = {
    current: 1,
    pageSize: 12,
  }
  getResByCateList()
}

function getResByCateList() {
  categoryService.resByCate({
    Code: Code.value,
    PageIndex: pagination.value.current,
    PageSize: pagination.value.pageSize,
  }).then((res) => {
    const {
      categoryGroups,
      resRow,
      total: ResTotal,
    } = res.data
    const CateList = cateList.value
    if (CateList.length === 0) {
      cateList.value = categoryGroups
    }
    else {
      categoryGroups.forEach((item: any) => {
        const index = CateList.findIndex(row => row.level === item.level)
        if (index !== -1) {
          CateList[index] = item
        }
        else {
          CateList.push(item)
        }
      })
    }
    total.value = ResTotal
    loadMoreShow.value = pagination.value.current * pagination.value.pageSize < total.value
    if (pagination.value.current === 1) {
      list.value = resRow
    }
    else {
      list.value = list.value.concat(resRow)
    }
  })
}
function handleDownload() {
  fileDownload('http://wlapi.jqweike.cn/wlxt_Data/WKK/GZ/FL0601/RJGZ010108/0101/03/wlxtRJGZYW0000003.mp4')
  MessagePlugin.success('下载成功')
}

function handleClickCollect(isCollect: boolean, index: number) {
  if (token.value) {
    MessagePlugin.success(isCollect ? '取消收藏成功' : '收藏成功')
    list.value[index].isCollect = !isCollect
  }
  else {
    MessagePlugin.warning('请先登录')
  }
}

function handleLoadMoreClick() {
  pagination.value.current += 1
  getResByCateList()
}

function handleNavTo(resCode: string, type: string) {
  window.open(`/#/home/detail?ResCode=${resCode}&ResType=${type}`, '_blank')
}
</script>

<template>
  <div class="home-list max-w-screen-1430 mx-auto my-7">
    <div class="filter">
      <t-card :bordered="false">
        <ul class="space-y-2 mb-5">
          <li class="flex-y-center border-dashed border-b-1 pb-1">
            <div class="filter-title">
              <span>分类：</span>
            </div>
            <div class="ml-5 flex-1">
              <t-button
                v-for="item in categoryList"
                :key="item.cid"
                :variant="item.cid === categoryId ? 'base' : 'text'"
                :theme="item.cid === categoryId ? 'primary' : 'default'"
                class="m-1"
                @click="handleCategoryClick(item.cid, item.code)"
              >
                {{ item.name }}
              </t-button>
            </div>
          </li>
          <li
            v-for="(item, index) in cateList" :key="index + 1"
            class="flex-y-center cate-list border-dashed border-b-1 pb-1"
          >
            <div class="filter-title">
              <span>{{ item.name }}：</span>
            </div>
            <div class="ml-5 flex-1">
              <t-button
                v-for="row in item.row"
                :key="row.cid"
                :variant="row.code === Code ? 'base' : 'text'"
                :theme="row.code === Code ? 'primary' : 'default'"
                class="m-1"
                @click="handleCategoryRowClick(row.code)"
              >
                {{ row.name }}
              </t-button>
            </div>
          </li>
        </ul>
      </t-card>
    </div>
    <div v-if="list.length > 0" class="list mt-6 ">
      <!--      <t-card :bordered="false"> -->
      <!--        <div class="space-x-6 flex-y-center text-sm"> -->
      <!--          <div class="cursor-pointer filter-text filter-active"> -->
      <!--            综合 -->
      <!--          </div> -->
      <!--          <t-divider layout="vertical" /> -->
      <!--          <div class="cursor-pointer filter-text"> -->
      <!--            点击 -->
      <!--          </div> -->
      <!--          <t-divider layout="vertical" /> -->
      <!--          <div class="cursor-pointer filter-text"> -->
      <!--            最新 -->
      <!--          </div> -->
      <!--        </div> -->
      <!--      </t-card> -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <t-card v-for="item in list" :key="item.id" :bordered="false" class="list-card">
          <template #cover>
            <t-image :src="baseUrl.file + item.logo" alt="" class="h-[190px]" @click="handleNavTo(item.resCode, item.type)" />
          </template>
          <router-link
            :to="{
              name: 'HomeListDetail',
              query: {
                ResCode: item.resCode,
                ResType: item.type,
              },
            }"
            :aria-label="item.title"
            target="_blank"
          >
            <div class="text-base h-11 cursor-pointer text-ellipsis overflow-hidden">
              {{ item.name }}
            </div>
          </router-link>
          <!--          <template #footer> -->
          <!--            <div class="grid grid-cols-2 gap-5"> -->
          <!--              <div class="flex-y-center cursor-pointer"> -->
          <!--                <transition :name="item.isCollect ? 'zoom' : '' " mode="out-in"> -->
          <!--                  <HeartFilledIcon -->
          <!--                    v-if="item.isCollect" key="like" -->
          <!--                    class="text-2xl collect-icon collect-active" -->
          <!--                    @click="handleClickCollect(item.isCollect, index)" -->
          <!--                  /> -->
          <!--                  <HeartIcon -->
          <!--                    v-else key="unlike" class="text-2xl collect-icon" -->
          <!--                    @click="handleClickCollect(item.isCollect, index)" -->
          <!--                  /> -->
          <!--                </transition> -->
          <!--                <span class="ml-1 text-base"> -->
          <!--                  收藏 -->
          <!--                </span> -->
          <!--              </div> -->
          <!--              <div class="flex-center ml-auto" @click="handleDownload"> -->
          <!--                <DownloadIcon class="text-xl" /> -->
          <!--                <span class="ml-1 text-base"> -->
          <!--                  下载 -->
          <!--                </span> -->
          <!--              </div> -->
          <!--              &lt;!&ndash;              <div class="flex-center"> &ndash;&gt; -->
          <!--              &lt;!&ndash;                <ShareIcon class="" /> &ndash;&gt; -->
          <!--              &lt;!&ndash;                <span class=" ml-2"> &ndash;&gt; -->
          <!--              &lt;!&ndash;                  分享 &ndash;&gt; -->
          <!--              &lt;!&ndash;                </span> &ndash;&gt; -->
          <!--              &lt;!&ndash;              </div> &ndash;&gt; -->
          <!--            </div> -->
          <!--          </template> -->
        </t-card>
      </div>
      <div class="loading-more flex-center mt-8">
        <t-button
          v-if="loadMoreShow"
          variant="outline"
          class="w-30"
          @click="handleLoadMoreClick"
        >
          加载更多
        </t-button>
      </div>
    </div>
    <Result v-else type="404" height="120" title="暂无数据" />
  </div>
</template>

<style scoped lang="scss">
:deep(.filter) {
  .t-card__body {
    padding: 10px 20px 0 17px;
  }
}

.filter {
  .filter-title {
    font-size: 15px;
    line-height: 50px;
    color: var(--td-gray-color-7);
  }
}

.filter-text {
  transition: color .2s;

  &:hover {
    color: var(--brand-main);
  }
}

.collect-active, .filter-active {
  color: var(--brand-main);
}

/** 动画进行时的class **/
.zoom-enter-active, .zoom-leave-active {
  transition: all .15s cubic-bezier(0.42, 0, 0.34, 1.55);
}

/** 设置进场开始的状态和离场结束的状态，都是缩放到0 **/
.zoom-enter, .zoom-leave-to {
  transform: scale(0);
}

/** 设置进场结束的状态和离场开始的状态, 都是缩放到1 **/
.zoom-enter-to, .zoom-leave {
  transform: scale(1);
}

.list-card {
  transition: transform .2s, box-shadow .2s;
  box-shadow: 0 4px 8px 0 rgba(95, 101, 105, .05);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    //transform: scale(1.02);
    box-shadow: 0 4px 8px 0 rgba(95, 101, 105, .1);
  }
}

.cate-list:last-child {
  border-bottom: none;
}
</style>

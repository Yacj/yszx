<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router'
import { ChevronDownIcon, ChevronUpIcon } from 'tdesign-icons-vue-next'
import { nextTick } from 'vue'
import { formatDay } from '@/utils/dateUtils'
import { replaceUrlImage } from '@/utils'
import { useUserStore } from '@/store/modules/user'
import { categoryService } from '@/api/modules/category'
import Result from '@/components/Result/Result.vue'
import UserAddCollect from '@/pages/home/components/UserAddCollect.vue'
import collectService from '@/api/modules/collect'

defineOptions({
  name: 'HomeListIndex',
})

const filterRef = ref(null)
const list = ref([])
const userStore = useUserStore()
const token = computed(() => userStore.token)
const route = useRoute()
const orgId = computed(() => userStore.orgID)
const {
  query: { id: RouteId },
} = route
const router = useRouter()
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

const filterLoading = ref(false)
const isOpenCollect = ref(false)
const collectParams = ref({})

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
  filterLoading.value = true
  categoryService.get({
    orgID: orgId.value,
    hasRow: true,
  }).then((res) => {
    categoryList.value = res.data
    categoryId.value = Number(RouteId) || res.data[0].cid
    filterLoading.value = false
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
  const twoHeight = 40 * 2
  categoryService.resByCate({
    Code: Code.value,
    PageIndex: pagination.value.current,
    PageSize: pagination.value.pageSize,
  }).then(async (res) => {
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
    await nextTick()
    if (filterRef.value) {
      filterRef.value.forEach((item, index) => {
        const currentHeight = item.offsetHeight
        const isOpen = currentHeight > twoHeight
        const listHeight = isOpen ? `${twoHeight}px` : null
        cateList.value[index].listOpenFlag = isOpen
        cateList.value[index].listHeight = listHeight
        cateList.value[index].showListBtnFlag = isOpen
      })
    }
  })
}
function handleLoadMoreClick() {
  cateList.value.forEach(item => item.listOpenFlag = false)
  pagination.value.current += 1
  getResByCateList()
}

function handleDetailTo(resCode: string, type: string, resName: string) {
  window.open(`/#/home/detail?ResCode=${resCode}&ResType=${type}&ResName=${resName}&categoryCode=${Code.value}`, '_blank')
}

function handleAddCollect(CollectID: number) {
  const params = {
    ...collectParams.value,
    CollectID,
  }
  collectService.res_add(params).then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <div class="home-list max-w-screen-1430 mx-auto my-7">
    <div class="filter">
      <t-card :bordered="false" :loading="filterLoading">
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
                class="!m-1"
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
            <div
              ref="filterRef"
              class="ml-5 flex-1 filter-row relative"
              :style="{ 'max-height': item.listOpenFlag ? item.listHeight : '' }"
            >
              <t-button
                v-for="row in item.row"
                :key="row.cid"
                :variant="row.code === Code ? 'base' : 'text'"
                :theme="row.code === Code ? 'primary' : 'default'"
                class="!m-1"
                @click="handleCategoryRowClick(row.code)"
              >
                {{ row.name }}
              </t-button>
              <div
                v-if="item.showListBtnFlag"
                class="absolute right-[-7px] bottom-0"
                @click="item.listOpenFlag = !item.listOpenFlag"
              >
                <t-button theme="default" variant="text" size="small">
                  <template #icon>
                    <ChevronDownIcon v-if="item.listOpenFlag" />
                    <ChevronUpIcon v-else />
                  </template>
                  {{ item.listOpenFlag ? "更多" : "收起" }}
                </t-button>
              </div>
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
      <div
        class="grid grid-cols-1 lg:grid-cols-4 gap-6"
      >
        <t-card v-for="item in list" :key="item.id" :bordered="false" class="list-card" size="small">
          <template #cover>
            <div v-if="item.type === 'Book'" class="flex-center w-full mt-2" @click="handleDetailTo(item.resCode, item.type, item.name)">
              <t-image
                :src="replaceUrlImage(item.logo)"
                class="max-w-45"
                fit="cover"
              />
            </div>
            <div v-if="item.type !== 'Book'" @click="handleDetailTo(item.resCode, item.type, item.name)">
              <t-image
                :src="replaceUrlImage(item.logo)"
                class="h-[190px]"
                fit="cover"
              />
            </div>
          </template>
          <div
            class="text-base h-11 cursor-pointer text-ellipsis overflow-hidden mt-1"
            @click="handleDetailTo(item.resCode, item.type, item.name)"
          >
            {{ item.name }}
          </div>
          <template v-if="item.type !== 'Book'" #footer>
            <div v-if="item.type === 'Exam'" class="flex justify-between items-center">
              <div class="text-[13px] text-[color:var(--td-gray-color-7)]">
                发布时间：{{ item.createTime.replace(/T.*/, "") }}
              </div>
              <t-button
                block
                class="!w-20"
                @click="handleDetailTo(item.resCode, item.type, item.name)"
              >
                答题
              </t-button>
            </div>
            <div v-else class="">
              <div class="time text-[13px] text-[color:var(--td-gray-color-7)]">
                发布时间：{{ formatDay(item.createTime, 'YYYY-MM-DD') }}
              </div>
              <!--              <div class="flex-y-center cursor-pointer" @click="handleCollect(item.resCode, item.type)"> -->
              <!--                <CollectionIcon class="text-xl " /> -->
              <!--                <span class="ml-1 text-base"> -->
              <!--                  收藏 -->
              <!--                </span> -->
              <!--              </div> -->
              <!--              <div class="flex-center ml-auto" @click="handleDownload(item.resCode, item.type)"> -->
              <!--                <DownloadIcon class="text-xl" /> -->
              <!--                <span class="ml-1 text-base"> -->
              <!--                  下载 -->
              <!--                </span> -->
              <!--              </div> -->
              <!--              <div class="flex-center"> -->
              <!--                <ShareIcon class="" /> -->
              <!--                <span class=" ml-2"> -->
              <!--                  分享 -->
              <!--                </span> -->
              <!--              </div> -->
            </div>
          </template>
<!--          <div v-if="item.type === 'Book'" class="flex"   @click="handleDetailTo(item.resCode, item.type, item.name)">-->
<!--            <t-image-->
<!--              :src="replaceUrlImage(item.logo)"-->
<!--              class="h-[190px] !rounded !w-[140px]"-->
<!--              fit="cover"-->
<!--            />-->
<!--            <div class="ml-5 flex-1 relative">-->
<!--              <div class="name text-base font-bold">-->
<!--                {{ item.name }}-->
<!--              </div>-->
<!--              <div class="time absolute bottom-1">-->
<!--                发布时间：{{ formatDay(item.createTime) }}-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
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
    <UserAddCollect :visible="isOpenCollect" @confirm="handleAddCollect" @close="isOpenCollect = false" />
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
:deep(.t-skeleton__col){
  background-color: var(--td-gray-color-2 );
}
.filter-row{
  overflow: hidden;
  transition: all 0.3s ease-in;
}
</style>

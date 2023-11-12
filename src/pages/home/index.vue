<script setup lang="ts">
import { formatDay } from '../../utils/dateUtils'
import { replaceUrlImage } from '@/utils'
import { resourceService } from '@/api/modules/resource'
import Result from '@/components/Result/Result.vue'

const skeletonRowCol = computed(() => {
  return [
    [1, 1, 1].map(() => ({ type: 'rect', content: '', width: '33%', height: '180px' })),
    [1, 1, 1].map(() => ({ type: 'rect', content: '', width: '33%', height: '50px' })),
    [1, 1, 1].map(() => ({ type: 'rect', content: '', width: '33%', height: '50px' })),
  ]
})
const loading = ref(false)
const homeList = ref([])
const hotList = ref([])

onMounted(() => {
  loading.value = true
  getHomeList()
})

function getHomeList() {
  resourceService.homeList().then((res) => {
    homeList.value = res.data
    loading.value = false
  })
  resourceService.hotList({
    pageSize: 8,
  }).then((res) => {
    hotList.value = res.data
  })
}
function shouldShowImages(title: string): boolean {
  const allowedTitles = ['热门案例', '信息素养']
  return allowedTitles.includes(title)
}
function handleDetailTo(resCode: string, type: string, resName: string, Code: string) {
  window.open(`/#/home/detail?ResCode=${resCode}&ResType=${type}&ResName=${resName}&categoryCode=${Code}`, '_blank')
}
</script>

<template>
  <div class="home my-5">
    <div class="swiper container mx-auto">
      <t-swiper :duration="300" :interval="2000">
        <t-swiper-item>
          <div class="swiper-item">
            <img src="../../assets/img/banner_1.png" alt="">
          </div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="swiper-item">
            <img src="../../assets/img/banner_2.png" alt="">
          </div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="swiper-item">
            <img src="../../assets/img/banner_3.png" alt="">
          </div>
        </t-swiper-item>
      </t-swiper>
    </div>
    <div class="ad container mx-auto mt-5">
      <div class="grid gap-2  grid-cols-1 sm:grid-cols-3 2xl:gap-5">
        <div
          class="rounded-sm h-full group flex justify-center relative overflow-hidden  transition duration-300 ease-in-out hover:opacity-90 cursor-pointer"
        >
          <router-link to="home/list?name=教学案例&id=700&code=B">
            <img src="../../assets/img/ad01.png" class="bg-skin-thumbnail h-36 w-full rounded" alt="">
          </router-link>
        </div>
        <div class="rounded-sm h-full group flex justify-center relative overflow-hidden hover:opacity-90 cursor-pointer">
          <router-link to="home/list?name=教资认证&id=1005&code=F">
            <img src="../../assets/img/ad02.png" class="bg-skin-thumbnail h-36 w-full rounded" alt="">
          </router-link>
        </div>
        <div class="rounded-sm h-full group flex justify-center relative overflow-hidden hover:opacity-90 cursor-pointer">
          <router-link to="home/list?name=教学指导&id=555&code=E">
            <img src="../../assets/img/ad03.png" class="bg-skin-thumbnail h-36 w-full rounded" alt="">
          </router-link>
        </div>
      </div>
    </div>
    <div class="wh-full container mx-auto mt-8">
      <t-skeleton :row-col="skeletonRowCol" animation="gradient" :loading="loading" class="space-y-10 mb-10">
        <div class="container mx-auto p-6 md:p-0">
          <div class="flex-y-center justify-between">
            <h3 class="text-2xl font-bold dark:text-white  mt-3 title-before">
              热门资源
            </h3>
          </div>
          <div class="hot-class-list flex mt-5 w-full">
            <Result v-if="hotList.length === 0" :height="120" title="暂无数据" />
            <ul
              class="grid gap-1 2xl:gap-4 grid-cols-1 lg:grid-cols-4 w-full"
            >
              <t-card v-for="item in hotList" :key="item.cid" class="home-full-card" :bordered="false">
                <template #cover>
                  <div @click="handleDetailTo(item.resCode, item.type, item.name, item.cateCode)">
                    <t-image fit="cover" :src="replaceUrlImage(item.logo)" alt="" class="h-[152px]" />
                  </div>
                </template>
                <div class="desc text-base font-400 " @click="handleDetailTo(item.resCode, item.type, item.name, item.cateCode)">
                  {{ item.name }}
                </div>
              </t-card>
            </ul>
          </div>
        </div>
        <!--        <div class="hot w-full"> -->
        <!--          <h4 class="text-2xl font-bold dark:text-white text-center mt-3 hot-title"> -->
        <!--            热门分类 -->
        <!--          </h4> -->
        <!--          <ul class="grid gap-1  grid-cols-1 sm:grid-cols-3 2xl:gap-5 max-w-screen-lg mx-auto mt-9"> -->
        <!--            <li v-for="item in hostList" :key="item.id" class="text-center relative  cursor-pointer transition duration-300 ease-in-out hover:scale-104 mx-auto"> -->
        <!--              <img src="../../assets/img/hot-bg.jpg" class="rounded-md w-[325px] h-[222px]" alt=""> -->
        <!--              <span class="absolute bg-gray-900 bg-opacity-30 flex justify-center w-[325px]  h-[222px] items-center text-white rounded-md inset-0 text-2xl"> -->
        <!--                {{ item.name }} -->
        <!--              </span> -->
        <!--            </li> -->
        <!--          </ul> -->
        <!--        </div> -->
        <!--        <div class="hot-class container mx-auto"> -->
        <!--          <div class="flex-y-center justify-between"> -->
        <!--            <div class="title-left flex-center"> -->
        <!--              <h3 class="text-2xl font-bold dark:text-white title-before"> -->
        <!--                热门案例 -->
        <!--              </h3> -->
        <!--              <t-tabs v-model="value" class="ml-10 !bg-transparent" size="large"> -->
        <!--                <t-tab-panel :value="1" label="学前音乐" /> -->
        <!--                <t-tab-panel :value="2" label="小学英语" /> -->
        <!--                <t-tab-panel :value="3" label="初中语文" /> -->
        <!--              </t-tabs> -->
        <!--            </div> -->
        <!--            <div class="other"> -->
        <!--              <span> -->
        <!--                查看全部 > -->
        <!--              </span> -->
        <!--            </div> -->
        <!--          </div> -->
        <div v-for="item in homeList" :key="item.cateCode" class="container mx-auto p-6 md:p-0">
          <div class="flex-y-center justify-between">
            <h3 class="text-2xl font-bold dark:text-white  mt-3 title-before">
              {{ item.title }}
            </h3>
          </div>
          <div class="hot-class-list flex mt-5">
            <div v-if="shouldShowImages(item.title)" class="w-[268px]">
              <img v-if="item.title === '热门案例'" src="../../assets/img/img-cover-1.png" alt="" class="rounded">
              <img v-if="item.title === '信息素养'" src="../../assets/img/img-cover.png" alt="" class="rounded">
            </div>
            <div
              class="flex-1"
              :class="shouldShowImages(item.title) ? 'ml-5' : ''"
            >
              <Result v-if="item.row.length === 0" :height="120" title="暂无数据" />
              <ul
                v-else class="grid gap-1  grid-cols-4 2xl:gap-6"
              >
                <t-card v-for="data in item.row.slice(0, 8)" :key="data.cateCode" class="home-full-card" :bordered="false" size="small">
                  <template v-if="shouldShowImages(item.title)" #cover>
                    <div @click="handleDetailTo(data.resCode, data.type, data.name, data.cateCode)">
                      <t-image fit="cover" :src="replaceUrlImage(data.logo)" alt="" class="h-[152px]" />
                    </div>
                  </template>
                  <div v-if="shouldShowImages(item.title)" class="desc text-base font-400 h-11 cursor-pointer text-ellipsis " @click="handleDetailTo(data.resCode, data.type, data.name, data.cateCode)">
                    {{ data.name }}
                  </div>
                  <div v-else class="flex">
                    <t-image :src="replaceUrlImage(data.logo)" class="h-50" />
                    <div class="ml-5 flex-1 relative">
                      <div class="name text-base font-bold">
                        {{ data.name }}
                      </div>
                      <div class="time absolute bottom-1">
                        发布时间：{{ formatDay(data.createTime) }}
                      </div>
                    </div>
                  </div>
                </t-card>
              </ul>
            </div>
          </div>
        </div>
      </t-skeleton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.swiper-item {
  display: flex;
  height: 435px;
  background-color: #4b5b76;
  color: #fff;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 20px;
}

:deep(.hot-card) {
    border-radius: 0;
}
.hot-title{
  position: relative;
  &::after{
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 50px;
    height: 2px;
    background-color: var(--td-brand-color);
  }
}
.title-before{
  position: relative;
  &::before{
    content: '';
    position: absolute;
    left: -10px;
    top: 49%;
    transform: translateY(-50%);
    width: 3px;
    height: 25px;
    background-color: var(--td-brand-color);
  }
}
:deep(.hot-class){
  .t-tabs__nav-container.t-is-top::after{
    background-color: transparent !important;
  }
  .t-tabs__bar{
    background-color: transparent !important;
  }
}
:deep(.home-card){
  border-radius: 0 !important;
}
.home-full-card{
  //box-shadow: 0 6px 10px 0 rgba(95,101,105,.15);
  transition: all .2s;
  cursor: pointer;
  &:hover{
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    transform: translateY(-5px);
  }
}
:deep(.t-skeleton__col){
  background-color: var(--td-gray-color-2 );
}
</style>

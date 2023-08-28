<script setup lang="ts">
import Result from '@/components/Result/Result.vue'

const hostList = ref([
  {
    name: '教学案例',
    id: 1,
  },
  {
    name: '教学题库',
    id: 2,
  },
  {
    name: '教学指导',
    id: 3,
  },
  {
    name: '信息素养',
    id: 4,
  },
  {
    name: '教资认证',
    id: 5,
  },
  {
    name: '教学模板',
    id: 6,
  },
])

const value = ref(1)

// 资源列表
const resourceList = ref([
  {
    id: 1,
    name: '能力提示',
  },
  {
    id: 2,
    name: '信息素养',
  },
  {
    id: 3,
    name: '教学模板',
  },
  {
    id: 4,
    name: '能力提升',
  },
  {
    id: 5,
    name: '学科教学案例',
  },
])

// 课本教材
const textbookList = ref([
  {
    id: 1,
    name: '五年级上',
  },
  {
    id: 2,
    name: '七年级下',
  },
  {
    id: 3,
    name: '八年级上',
  },
  {
    id: 4,
    name: '高中数学',
  },
  {
    id: 5,
    name: '高中物理',
  },
])
const skeletonRowCol = computed(() => {
  return [
    [1, 1, 1].map(() => ({ type: 'rect', content: '', width: '33%', height: '180px' })),
    [1, 1, 1].map(() => ({ type: 'rect', content: '', width: '33%', height: '50px' })),
    [1, 1, 1].map(() => ({ type: 'rect', content: '', width: '33%', height: '50px' })),
  ]
})
const loading = ref(false)
// setTimeout(() => {
//   loading.value = false
// }, 2000)
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
      <div class="grid gap-4  grid-cols-1 sm:grid-cols-3 2xl:gap-5">
        <div
          class="rounded-sm h-full group flex justify-center relative overflow-hidden  transition duration-300 ease-in-out hover:opacity-90 cursor-pointer"
        >
          <img src="../../assets/img/ad.png" class="bg-skin-thumbnail h-36 w-full" alt="">
        </div>
        <div class="rounded-sm h-full group flex justify-center relative overflow-hidden hover:opacity-90 cursor-pointer">
          <img src="../../assets/img/ad.png" class="bg-skin-thumbnail h-36 w-full" alt="">
        </div>
        <div class="rounded-sm h-full group flex justify-center relative overflow-hidden hover:opacity-90 cursor-pointer">
          <img src="../../assets/img/ad.png" class="bg-skin-thumbnail h-36 w-full" alt="">
        </div>
      </div>
    </div>
    <div class="wh-full container mx-auto mt-8">
      <t-skeleton :row-col="skeletonRowCol" animation="gradient" :loading="loading" class="space-y-10 mb-10">
        <div class="hot w-full">
          <h4 class="text-2xl font-bold dark:text-white text-center mt-3 hot-title">
            热门分类
          </h4>
          <ul class="grid gap-1  grid-cols-1 sm:grid-cols-3 2xl:gap-5 max-w-screen-lg mx-auto mt-9">
            <li v-for="item in hostList" :key="item.id" class="text-center relative  cursor-pointer transition duration-300 ease-in-out hover:scale-104 mx-auto">
              <img src="../../assets/img/hot-bg.jpg" class="rounded-md w-[325px] h-[222px]" alt="">
              <span class="absolute bg-gray-900 bg-opacity-30 flex justify-center w-[325px]  h-[222px] items-center text-white rounded-md inset-0 text-2xl">
                {{ item.name }}
              </span>
            </li>
          </ul>
        </div>
        <div class="ranking container mx-auto p-6 md:p-0">
          <div class="flex-y-center justify-between">
            <h3 class="text-2xl font-bold dark:text-white  mt-3 title-before">
              资源排行
            </h3>
            <div class="other">
              查看全部>
            </div>
          </div>
          <div class="mt-5 grid grid-cols-1 md:grid-cols-5 gap-6">
            <Result v-if="resourceList.length === 0" :height="120" title="暂无数据" />
            <t-card v-for="item in resourceList" :key="item.id" hover-shadow :bordered="false" class="home-full-card">
              <template #cover>
                <router-link to="/home/list?name=信息素养&id=1&code=A">
                  <img src="../../assets/img/list-cover.png" alt="" class="h-[152px]">
                </router-link>
              </template>
              <router-link to="/home/list?name=信息素养&id=1&code=A">
                <div class="desc text-base font-400">
                  {{ item.name }}
                </div>
              </router-link>
            </t-card>
          </div>
        </div>
        <div class="hot-class container mx-auto">
          <div class="flex-y-center justify-between">
            <div class="title-left flex-center">
              <h3 class="text-2xl font-bold dark:text-white title-before">
                热门案例
              </h3>
              <t-tabs v-model="value" class="ml-10 !bg-transparent" size="large">
                <t-tab-panel :value="1" label="学前音乐" />
                <t-tab-panel :value="2" label="小学英语" />
                <t-tab-panel :value="3" label="初中语文" />
              </t-tabs>
            </div>
            <div class="other">
              <span>
                查看全部 >
              </span>
            </div>
          </div>
          <div class="hot-class-list flex mt-3">
            <div class="w-[230px]">
              <img src="../../assets/img/img-cover-1.png" alt="" class="rounded">
            </div>
            <div class="flex-1 ml-5">
              <!--              <Result :height="120" title="暂无数据" /> -->
              <ul class="grid gap-1  grid-cols-1 sm:grid-cols-5 2xl:gap-6">
                <t-card class="home-full-card" :bordered="false">
                  <template #cover>
                    <router-link to="/home/list?name=信息素养&id=1&code=A">
                      <img src="../../assets/img/list-cover.png" alt="" class="h-[152px]">
                    </router-link>
                  </template>
                  <router-link to="/home/list?name=信息素养&id=1&code=A">
                    <div class="desc  text-base font-400">
                      2021年教师资格证面试备考指导
                    </div>
                  </router-link>
                </t-card>
              </ul>
            </div>
          </div>
        </div>
        <div class=" container mx-auto">
          <div class="flex-y-center justify-between">
            <div class="title-left flex-center">
              <h3 class="text-2xl font-bold dark:text-white title-before">
                信息素养
              </h3>
            </div>
            <div class="other">
              <span>
                查看全部 >
              </span>
            </div>
          </div>
          <div class="hot-class-list flex mt-3">
            <div class="w-[230px]">
              <img src="../../assets/img/img-cover.png" alt="" class="rounded">
            </div>
            <div class="flex-1 ml-5">
              <!--              <Result :height="120" title="暂无数据" /> -->
              <ul class="grid gap-1  grid-cols-1 sm:grid-cols-5 2xl:gap-6">
                <t-card class="home-full-card" :bordered="false">
                  <template #cover>
                    <router-link to="/home/list?name=信息素养&id=1&code=A">
                      <img src="../../assets/img/list-cover.png" alt="" class="h-[152px]">
                    </router-link>
                  </template>
                  <router-link to="/home/list?name=信息素养&id=1&code=A">
                    <div class="desc  text-base font-400">
                      word
                    </div>
                  </router-link>
                </t-card>
              </ul>
            </div>
          </div>
        </div>
        <div class="container mx-auto p-6 md:p-0">
          <div class="flex-y-center justify-between">
            <h3 class="text-2xl font-bold dark:text-white  mt-3 title-before">
              课本教材
            </h3>
            <div class="other">
              查看全部>
            </div>
          </div>
          <div class="mt-5 grid grid-cols-1 md:grid-cols-5 gap-6">
            <Result v-if="resourceList.length === 0" :height="120" title="暂无数据" />
            <t-card v-for="item in textbookList" :key="item.id" hover-shadow :bordered="false" class="home-full-card">
              <template #cover>
                <router-link to="/home/list?name=信息素养&id=1&code=A">
                  <img src="../../assets/img/list-cover.png" alt="" class="h-[152px]">
                </router-link>
              </template>
              <router-link to="/home/list?name=信息素养&id=1&code=A">
                <div class="desc text-base font-400">
                  {{ item.name }}
                </div>
              </router-link>
            </t-card>
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

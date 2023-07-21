<script setup lang="ts">
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
</script>

<template>
  <div class="home space-y-5 mt-5 mb-5">
    <div class="swiper container mx-auto">
      <t-swiper :duration="300" :interval="2000">
        <t-swiper-item v-for="item in 6" :key="item">
          <div class="swiper-item">
            {{ item }}
          </div>
        </t-swiper-item>
      </t-swiper>
    </div>
    <div class="ad container mx-auto">
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
    <div class="hot w-full">
      <t-card :bordered="false">
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
      </t-card>
    </div>
    <div class="ranking container mx-auto">
      <div class="flex-y-center justify-between">
        <h3 class="text-2xl font-bold dark:text-white  mt-3 title-before">
          资源排行
        </h3>
        <div class="other">
          查看全部>
        </div>
      </div>
      <div class="mt-5 grid grid-cols-5 gap-6">
        <t-card hover-shadow :bordered="false">
          <router-link to="/home/detail">
            <div class="cover">
              <img src="../../assets/img/list-cover.png" alt="">
            </div>
            <div class="desc text-center text-base mt-3 font-400">
              2021年教师资格证面试备考指导
            </div>
          </router-link>
        </t-card>
        <t-card hover-shadow :bordered="false">
          <div class="cover">
            <img src="../../assets/img/list-cover.png" alt="">
          </div>
          <div class="desc text-center text-base mt-3 font-400">
            2021年教师资格证面试备考指导
          </div>
        </t-card>
        <t-card hover-shadow :bordered="false">
          <div class="cover">
            <img src="../../assets/img/list-cover.png" alt="">
          </div>
          <div class="desc text-center text-base mt-3 font-400">
            2021年教师资格证面试备考指导
          </div>
        </t-card>
        <t-card hover-shadow :bordered="false">
          <div class="cover">
            <img src="../../assets/img/list-cover.png" alt="">
          </div>
          <div class="desc text-center text-base mt-3 font-400">
            2021年教师资格证面试备考指导
          </div>
        </t-card>
        <t-card hover-shadow :bordered="false">
          <div class="cover">
            <img src="../../assets/img/list-cover.png" alt="">
          </div>
          <div class="desc text-center text-base mt-3 font-400">
            2021年教师资格证面试备考指导
          </div>
        </t-card>
      </div>
    </div>
    <t-card class="home-card" :bordered="false">
      <div class="hot-class container mx-auto">
        <div class="flex-y-center justify-between">
          <div class="title-left flex-center">
            <h3 class="text-2xl font-bold dark:text-white title-before">
              热门课程
            </h3>
            <t-tabs v-model="value" class="ml-10" size="large">
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
            <img src="../../assets/img/img-cover.png" alt="">
          </div>
          <div class="flex-1 ml-5">
            <ul class="grid gap-1  grid-cols-1 sm:grid-cols-5 2xl:gap-6">
              <t-card class="home-full-card" :bordered="false">
                <template #cover>
                  <img src="../../assets/img/list-cover.png" alt="" class="h-[152px]">
                </template>
                <router-link to="/home/detail">
                  <div class="desc text-center text-base font-400">
                    2021年教师资格证面试备考指导
                  </div>
                </router-link>
              </t-card>
            </ul>
          </div>
        </div>
      </div>
    </t-card>
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
  box-shadow: 0 6px 10px 0 rgba(95,101,105,.15);
  transition: all .2s;
  cursor: pointer;
  &:hover{
    transform: translateY(-2px);
    //box-shadow: 0 12px 20px 0 rgba(95,101,105,.15);
    box-shadow: 0 6px 10px 0 rgba(95,101,105,.3);
  }
}
</style>

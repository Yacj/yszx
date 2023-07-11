<script setup lang="ts">
</script>

<template>
  <div class="home container mx-auto mt-5">
    <div class="swiper">
      <t-swiper class="tdesign-demo-block--swiper" :duration="300" :interval="2000">
        <t-swiper-item v-for="item in 6" :key="item">
          <div class="swiper-item">{{ item }}</div>
        </t-swiper-item>
      </t-swiper>
      <!-- gird 布局 一行三个-->
      <div class="grid gap-3 grid-cols-3">
        <div>
          1
        </div>
        <div>
          2
        </div>
        <div>
          3
        </div>
      </div>
    </div>
    <div class="h-50">
      12
    </div>
    <div class="h-50">
      12
    </div>
    <div class="h-50">
      12
    </div>
    <div class="h-50">
      12
    </div>
    <div class="h-50">
      12
    </div>
    <div class="h-50">
      12
    </div>
  </div>
</template>

<style scoped>
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
</style>

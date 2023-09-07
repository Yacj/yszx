<script setup lang="ts">
// 历史数据
import Result from '@/components/Result/Result.vue'

const historyList = ref([])
</script>

<template>
  <t-card title="我的足迹" class="card-title" :bordered="false" >
    <div v-if="historyList.length === 0" />
    <Result v-else type="404" title="暂无数据" />
  </t-card>
</template>

<style scoped lang="scss">

</style>

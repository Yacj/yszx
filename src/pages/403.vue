<script setup lang="ts">
import Result from '@/components/Result/Result.vue'
</script>

<template>
  <Result title="暂无权限" tip="抱歉，您无权限访问此页面。请联系管理员后重试">
    <t-button @click="() => $router.push('/')">
      返回首页
    </t-button>
  </Result>
</template>

<style scoped lang="scss">

</style>

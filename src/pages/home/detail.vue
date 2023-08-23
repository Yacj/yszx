<script setup lang="ts">
import CouseDetail from '@/pages/home/components/CouseDetail.vue'
import FileDetail from '@/pages/home/components/FileDetail.vue'

const route = useRoute()
const {
  query: {
    ResCode,
    ResType,
  },
} = route
</script>

<template>
  <div class="content-detail container mx-auto mt-8">
    <CouseDetail v-if="ResType === 'Couse'" :res-code="ResCode" />
    <FileDetail v-else :res-code="ResCode" />
  </div>
</template>

<style scoped lang="scss">
:deep(.preview){
  .t-card__body{
    padding:10px;
  }
}
:deep(.recommend){
  .t-card__body{
    padding:10px;
  }
}
</style>

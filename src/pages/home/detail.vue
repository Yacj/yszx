<script setup lang="ts">
import CouseDetail from '@/pages/home/components/CouseDetail.vue'
import ExamDetail from "@/pages/home/components/ExamDetail.vue";
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
    <CouseDetail v-if="ResType === 'Couse'" :rescode="ResCode" :restype="ResType" />
    <ExamDetail v-else-if="ResType === 'Exam'" :rescode="ResCode" :restype="ResType" />
    <FileDetail v-else :rescode="ResCode" :restype="ResType" />
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

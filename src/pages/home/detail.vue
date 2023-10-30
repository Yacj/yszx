<script setup lang="ts">
import { logService } from '@/api/modules/log'
import BookDetail from '@/pages/home/components/BookDetail.vue'
import CouseDetail from '@/pages/home/components/CouseDetail.vue'
import ExamDetail from '@/pages/home/components/ExamDetail.vue'
import FileDetail from '@/pages/home/components/FileDetail.vue'

defineOptions({
  name: 'HomeListDetail',
})
const route = useRoute()
const {
  query: {
    ResCode,
    ResType,
    ResName,
    categoryCode,
  },
} = route

onMounted(() => {
  handleAddLog()
})

function handleAddLog() {
  const params = {
    resCode: ResCode,
    resName: ResName,
    categoryCode,
    resType: ResType,
  }
  logService.add_browse(params).then((res) => {})
}
</script>

<template>
  <div class="content-detail container mx-auto mt-8">
    <CouseDetail v-if="ResType === 'Couse'" :rescode="ResCode" :restype="ResType" />
    <ExamDetail v-if="ResType === 'Exam'" :rescode="ResCode" :restype="ResType" />
    <BookDetail v-if="ResType === 'Book'" :rescode="ResCode" :restype="ResType" />
    <FileDetail v-if="ResType === 'File' || ResType === 'Test' " :rescode="ResCode" :restype="ResType" />
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

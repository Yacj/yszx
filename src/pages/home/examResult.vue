<script setup lang="ts">
import { examService } from '@/api/modules/exam'
import { useUserStore } from '@/store/modules/user'
import { isObjectEmpty } from '@/utils/is'

const route = useRoute()
const {
  id,
} = route?.query
const userStore = useUserStore()
const typeCode = ref('1')
const resultData = ref({})

onMounted(() => {
  getExamDetail()
})

function getExamDetail() {
  examService.get_result({
    userID: userStore.userInfo.userID,
    ID: id,
  }).then((res) => {
    console.log(res)
    resultData.value = res.data
  })
}
</script>

<template>
  <div class="content-detail container mx-auto mt-8">
    <t-card v-if="!isObjectEmpty(resultData)" :bordered="false">
      <t-radio-group v-model:value="typeCode" variant="default-filled">
        <t-radio-button value="1">
          答题报告
        </t-radio-button>
        <t-radio-button value="2">
          题目解析
        </t-radio-button>
        <t-radio-button value="3">
          重新考试
        </t-radio-button>
      </t-radio-group>
      <div class="result-content py-8 px-12">
        <div class="result-title text-center text-2xl font-bold">
          {{ resultData.data.examName }}
        </div>
        <div class="result-source mt-10">
          <t-progress theme="circle" :percentage="20" size="large" />
        </div>
      </div>
    </t-card>
  </div>
</template>

<style scoped>

</style>

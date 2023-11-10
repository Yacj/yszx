<script setup lang="ts">
import type { PageInfo, PrimaryTableCol } from 'tdesign-vue-next'
import { formatDay } from '@/utils/dateUtils'
import { useUserStore } from '@/store/modules/user'
import { examService } from '@/api/modules/exam'

const userStore = useUserStore()
const columns: PrimaryTableCol[] = [
  {
    title: '试卷名称',
    colKey: 'examName',
    width: 200,
    ellipsis: true,
  },
  {
    title: '正确率',
    colKey: 'accuracy',
    align: 'center',
  },
  {
    title: '开始时间',
    colKey: 'createTime',
    align: 'center',
  },
  {
    title: '考试用时',
    colKey: 'answerTime',
    align: 'center',
  },
  {
    title: '总分',
    colKey: 'totalScore',
    align: 'center',
  },
  {
    title: '试卷得分',
    colKey: 'score',
    align: 'center',
  },
  {
    title: '总题',
    colKey: 'totalSub',
    align: 'center',
  },
  {
    title: '试卷对题数',
    align: 'center',
    colKey: 'rightSub',
  },
]
const examList = ref([])

const pagination = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1,
})

onMounted(() => {
  handleGetExamList()
})

function handleGetExamList() {
  examService.get_list({
    userID: userStore.userInfo.userID,
    pageIndex: pagination.value.defaultCurrent,
    pageSize: pagination.value.defaultPageSize,
  }).then((res) => {
    const {
      rows,
      total,
    } = res.data
    pagination.value.total = total
    examList.value = rows
  })
}
function handlePageChange(pageInfo: PageInfo) {
  pagination.value.defaultPageSize = pageInfo.pageSize
  pagination.value.defaultCurrent = pageInfo.current
  handleGetExamList()
}
</script>

<template>
  <t-card title="考试记录" class="card-title" :bordered="false">
    <t-table
      :columns="columns"
      :data="examList"
      row-key="id"
      :stripe="true"
      :pagination="pagination"
      @page-change="handlePageChange"
    >
      <template #answerTime="{ row }">
        {{ `${row.answerTime}秒` }}
      </template>
      <template #createTime="{ row }">
        {{ formatDay(row.createTime) }}
      </template>
    </t-table>
  </t-card>
</template>

<style scoped lang="scss">

</style>

<script setup lang="ts">
import type { PrimaryTableCol } from 'tdesign-vue-next'
import type { Ref } from 'vue'
import { ChevronDownIcon, ChevronUpIcon, RollbackIcon } from 'tdesign-icons-vue-next'
import { formatDay } from '@/utils/dateUtils'
import { examService } from '@/api/modules/exam'
import { useUserStore } from '@/store/modules/user'
import { roundToInteger } from '@/utils'
import { isObjectEmpty } from '@/utils/is'

interface TableProps {
  allSub: number
  rightSub: number
  errorSub: number
  accuracy: number | string
  averageScore: number | string
  beat: number | string
}

const route = useRoute()
const router = useRouter()
const {
  id,
} = route?.query

const userStore = useUserStore()
const typeCode = ref('1')
const resultData = ref({})
const columns: PrimaryTableCol[] = [
  {
    title: '总题数',
    align: 'center',
    colKey: 'allSub',
  },
  {
    title: '对题数',
    align: 'center',
    colKey: 'rightSub',
  },
  {
    title: '错题数',
    align: 'center',
    colKey: 'errorSub',
  },
  {
    title: '正确率',
    align: 'center',
    colKey: 'accuracy',
  },
  {
    title: '全站平均得分',
    align: 'center',
    colKey: 'averageScore',
  },
  {
    title: '已击败考生',
    align: 'center',
    colKey: 'beat',
  },
]
const tableData: Ref<TableProps[]> = ref([])
const examList: Ref<any[]> = ref([])

onMounted(() => {
  getExamDetail()
})

function getExamDetail() {
  examService.get_result({
    userID: userStore.userInfo.userID,
    ID: id,
  }).then((res) => {
    const {
      data: {
        score,
        totalScore,
        averageScore,
        answerTime,
        beat,
        createTime,
      },
      rows: {
        allSub,
        rightSub,
        errorSub,
        accuracy,
        list,
      },
    } = res.data || {}
    resultData.value = {
      ...res.data,
      formattedCreateTime: formatDay(createTime, 'YYYY-MM-DD HH:mm:ss'),
      useTime: `${roundToInteger(answerTime / 60)}分 ${roundToInteger(answerTime % 60)}秒`,
      totalReg: roundToInteger(score / totalScore * 100),
    }
    tableData.value.push({
      allSub,
      errorSub,
      rightSub,
      accuracy: `${roundToInteger(accuracy)}%`,
      averageScore,
      beat,
    })
    examList.value = list.map((item: any) => ({ ...item, isOpen: false }))
  })
}

function handleToBack() {
  router.back()
}
</script>

<template>
  <div v-if="!isObjectEmpty(resultData)" class="content-detail container mx-auto mt-5">
    <t-card :bordered="false">
      <div class="flex justify-between">
        <t-radio-group v-model:value="typeCode" variant="default-filled">
          <t-radio-button value="1">
            答题报告
          </t-radio-button>
          <t-radio-button value="2">
            题目解析
          </t-radio-button>
        </t-radio-group>
        <t-button @click="handleToBack">
          <template #icon>
            <RollbackIcon />
          </template>
          重新考试
        </t-button>
      </div>
      <div class="result-title text-center">
        <div class="text-2xl font-bold">
          {{ resultData.data.examName }}
        </div>
        <div class="flex-center text-[14px] mt-5">
          <div>
            交卷时间：
            {{ resultData.formattedCreateTime }}
          </div>
          <t-divider layout="vertical" />
          <div>
            答题用时：
            {{ resultData.useTime }}
          </div>
        </div>
      </div>
    </t-card>
    <t-card v-if="typeCode === '1'" class="result-content !px-12 !pb-10" :bordered="false">
      <div class="result-source">
        <div class="flex-center my-8">
          <t-progress theme="circle" :percentage="resultData.totalReg" size="large">
            <template #label>
              <div class="flex items-center justify-center">
                {{ resultData.totalReg }}
              </div>
              <div class="total-desc">
                总分 {{ resultData.data.totalScore }}
              </div>
            </template>
          </t-progress>
        </div>
        <t-table row-key="index" :columns="columns" :data="tableData" />
      </div>
    </t-card>
    <div v-if="typeCode === '2'" class="w-290 flex relative mt-6 ">
      <div class="exam-list space-y-6">
        <t-card v-for="item in examList" :key="item.id" class="!p-2" :bordered="false">
          <div class="list-title text-base" v-html="item.examData.stem" />
          <ul>
            <li v-for="data in item.examData.options" :key="data.key" class="list-item my-5">
              <div v-html="data.value" />
            </li>
          </ul>
          <div class="mt-5 border-t-dashed border-t-1 !pt-5 flex justify-between">
            <div>
              正确答案：{{ item.subAnswer }}，您的答案是：{{ item.userAnswer || '未填写' }}
              <span class="ml-7">
                (<t-link :theme="item.isRight ? 'success' : 'warning'" hover="color" class="!mx-1">
                  回答{{ item.isRight ? '正确' : '错误' }}
                </t-link>)
              </span>
            </div>
            <div class="cursor-pointer color-theme " @click="item.isOpen = !item.isOpen">
              {{ item.isOpen ? '收起' : '展开' }}解析
              <ChevronUpIcon v-if="!item.isOpen" />
              <ChevronDownIcon v-else />
            </div>
          </div>
          <div v-if="item.isOpen" class="font-bold">
            <div class="mt-5 mb-3">
              解析：
            </div>
            <div v-html="item.examData.analysis" />
          </div>
        </t-card>
      </div>
      <div class="ml-2 flex-1 space-y-5 exam-right fixed right-49">
        <t-card :bordered="false">
          <div class="m-5 answer-title">
            答题卡
          </div>
          <div class="answer-cards">
            <ul class="p-5 grid grid-cols-5 gap-3">
              <li
                v-for="(item, index) in examList" :key="item.subID" class=""
              >
                <t-button
                  :theme="item.isRight ? 'success' : 'danger'"
                  class="!w-12 !h-12"
                >
                  <div class="">
                    <div>
                      {{ index + 1 }}
                    </div>
                    <div>
                      {{ item.isRight ? '✔' : '✘' }}
                    </div>
                  </div>
                </t-button>
              </li>
            </ul>
          </div>
        </t-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.total-desc{
    font-weight: 100;
    color: var(--td-gray-color-6);
    font-size: 17px;
    margin-top: 20px;
}
:deep(.exam-right){
  .t-card__body{
    padding: 0 !important;
  }
}
:deep(.t-table__header){
  th{
    background: var(--td-gray-color-1) !important;
    color: var(--td-text-color-primary) !important;
  }
}

.answer-title{
  font: var(--td-font-title-large);
  font-weight: 400;
  position: relative;
  &::after{
    content: "";
    display: inline-block;
    width: 43px;
    height: 4px;
    background: var(--td-brand-color);
    border-radius: 2px;
    position: absolute;
    left: 0;
    bottom: -10px;
  }
}
</style>

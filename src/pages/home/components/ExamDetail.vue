<script setup lang="ts">
import { isObject } from '@vueuse/core'
import { DialogPlugin } from 'tdesign-vue-next'
import { AlarmIcon } from 'tdesign-icons-vue-next'
import { examService } from '@/api/modules/exam'
import { resourceService } from '@/api/modules/resource'
import type { DetailFileProps } from '@/pages/home/components/prop'
import { useCountDown } from '@/hooks/useCountDown'
import { useUserStore } from '@/store/modules/user'

const props = defineProps<DetailFileProps>()
const userStore = useUserStore()
const token = computed(() => userStore.token)
const router = useRouter()
const examList = ref([])
const resultList = ref([])

if (!token.value) {
  const tokenConfirm = DialogPlugin.confirm({
    body: '您尚未登录，请先登录后再试',
    header: '提示',
    confirmBtn: '去登录',
    cancelBtn: '返回',
    onConfirm: () => {
      router.push('/login')
      tokenConfirm.destroy()
    },
    onClose: () => {
      router.push('/')
      tokenConfirm.hide()
    },
  })
}

const {
  start,
  count,
  pause,
  resume,
} = useCountDown()
const examData = ref({})
onMounted(() => {
  getExamDetail()
})

function getExamDetail() {
  resourceService.get_details({
    ResCode: props.rescode,
    ResType: props.restype,
  }).then((res) => {
    const ResData = res.data
    const dataList = ResData.dataList
    if (isObject(ResData.data)) {
      examData.value = ResData.data
      const {
        time,
      } = ResData.data
      start(time * 60)
    }
    dataList.forEach((item) => {
      resultList.value.push({
        subID: item.id,
        UserAnswer: '',
        order: item.order,
      })
    })
    console.log(resultList.value)
    examList.value = dataList
  })
}

const formatTime = computed(() => {
  const seconds = count.value
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const paddedHours = hours.toString().padStart(2, '0')
  const paddedMinutes = minutes.toString().padStart(2, '0')
  const paddedSeconds = remainingSeconds.toString().padStart(2, '0')

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
})

watch(
  () => count.value,
  (val) => {
    if (val === 0) {
      pause()
    }
  },
)

function handleClickPause() {
  pause()
  const resumeConfirm = DialogPlugin.confirm({
    body: '您已暂停考试,是否继续?',
    header: '温馨提示',
    confirmBtn: '立刻交卷',
    cancelBtn: '继续答题',
    onConfirm: () => {
      console.log('交卷')
      resumeConfirm.destroy()
    },
    onClose: () => {
      resume()
      resumeConfirm.hide()
    },
  })
}
function onChange(id: number, event: string) {
  const foundItem = resultList.value.find(item => item.subID === id)
  if (foundItem) {
    foundItem.UserAnswer = event
  }
}

function handleSubmitExam() {
  pause()
  const userID: string = userStore.userInfo.userID
  const userName: string = userStore.userInfo.realName
  const resCode = props.rescode
  const answerTime: number = examData.value.time * 60 - count.value
  const isEnd: boolean = true
  const params = {
    userID,
    userName,
    resCode,
    answerTime,
    isEnd,
    resultList: resultList.value.map(({ order, ...rest }) => rest),
  }
  console.log(params)
  examService.set(params).then((res) => {
    console.log(res)
  })
  // const params ={
  //   userID,
  //   userName,
  //   resCode,
  //   answerTime: count.value,
  //   isEnd: false,
  //   resultList: resultList.value
  // }
}
</script>

<template>
  <div class="flex mt-6 mb-3 relative mb-27">
    <t-card class="w-300 !p-5" :bordered="false">
      <div class="exam-title text-center">
        <h4 class="text-2xl font-bold dark:text-white">
          {{ examData.name }}
        </h4>
        <div class="space-x-6 text-[18px] mt-5">
          <span>分数：{{ examData.totalScore }}分</span>
          <span>时间：{{ examData.time }} 分钟</span>
        </div>
      </div>
      <div class="exam-list mt-10 space-y-6">
        <div v-for="item in examList" :key="item.id" class="border-dashed border-b-1 pb-4">
          <div class="list-title text-base" v-html="item.stem" />
          <div>
            <div v-if="item.queType === 'Single'">
              <ul class="p-3 space-y-3 mt-3">
                <li v-for="data in item.options" :key="data.key" class="text-base">
                  <div v-html="data.value" />
                </li>
              </ul>
              <t-radio-group v-model:value="item.keyword" class="!px-3 mt-2" @change="onChange(item.id, $event)">
                <t-radio v-for="data in item.options" :key="data.key" allow-uncheck :value="data.key">
                  {{ data.key }}
                </t-radio>
              </t-radio-group>
            </div>
            <t-textarea
              v-else
              class="!mt-5"
              placeholder="请在此作答"
              :autosize="{ minRows: 3, maxRows: 15 }"
              @change="onChange(item.id, $event)"
            />
          </div>
        </div>
      </div>
    </t-card>
    <div class="ml-2 flex-1 space-y-5 exam-right fixed right-40">
      <t-card :bordered="false">
        <div class="exam-right-cardTitle flex-center">
          <AlarmIcon class="!text-xl mr-1" />
          剩余时间
        </div>
        <div class="text-center text-2xl leading-15 tracking-[2px]">
          {{ formatTime }}
        </div>
        <div class="text-center mb-2 space-x-3">
          <t-button variant="outline" @click="handleClickPause">
            暂停
          </t-button>
          <t-button variant="outline">
            下次再做
          </t-button>
        </div>
      </t-card>
      <t-card :bordered="false">
        <div class="exam-right-cardTitle">
          答题卡
        </div>
        <div class="answer-cards">
          <ul class="p-5  grid grid-cols-5 gap-3">
            <li
              v-for="item in resultList" :key="item.subID" class=""
              :class="item.UserAnswer ? 'active' : ''"
            >
              {{ item.order }}
            </li>
          </ul>
        </div>
      </t-card>
      <div>
        <t-button block class="!h-11" @click="handleSubmitExam">
          提交并查看结果
        </t-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.exam-right){
  .t-card__body{
    padding: 0 !important;
  }
}
.exam-right{
  .exam-right-cardTitle{
    background: var(--td-brand-color-6);
    @apply wh-full rounded-t-md text-white text-center text-base font-bold leading-11
  }
  .answer-cards{
    ul{
      li{
        margin-left: 13px !important;
        color: #9999;
        @apply w-10 h-10 border rounded bg-neutral-100 text-center text-base leading-10 ml-0  mt-0 border-solid
      }
    }
    .active{
      transition: all 0.3s ease;
      background: var(--td-success-color-4);
      border:1px solid var(--td-success-color-4);
      color:white;
    }
  }
}
</style>

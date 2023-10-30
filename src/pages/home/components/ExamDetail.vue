<script setup lang="ts">
import { isObject } from '@vueuse/core'
import { DialogPlugin } from 'tdesign-vue-next'
import { AlarmIcon, PauseCircleIcon, PlayCircleIcon } from 'tdesign-icons-vue-next'
import { examService } from '@/api/modules/exam'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { resourceService } from '@/api/modules/resource'
import type { DetailFileProps } from '@/pages/home/prop'
import { useCountDown } from '@/hooks/useCountDown'
import { useUserStore } from '@/store/modules/user'

const props = defineProps<DetailFileProps>()
const userStore = useUserStore()
const token = computed(() => userStore.token)
const router = useRouter()
const examList = ref([])
const resultList: any = ref([])

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

const examData = ref({})
const {
  start,
  count,
  pause,
  resume,
  isActive,
} = useCountDown()

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
      const alert = DialogPlugin.alert({
        body: '时间已到，强制提交',
        header: '温馨提示',
        onConfirm: () => {
          alert.destroy()
          handleSendExam()
        },
      })
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
      resumeConfirm.destroy()
      handleSubmitExam()
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
  const emptyUserAnswerCount = resultList.value.filter(item => item.UserAnswer === '').length
  const tips = emptyUserAnswerCount === 0 ? '您确认提交该试卷么？' : `您还有 ${emptyUserAnswerCount} 题未作答，确定提交吗？`
  const confirm = DialogPlugin.confirm({
    body: tips,
    header: '温馨提示',
    confirmBtn: '确定',
    cancelBtn: '取消',
    onConfirm: () => {
      confirm.destroy()
      handleSendExam()
    },
    onClose: () => {
      resume()
      confirm.hide()
    },
  })
}

function handleSendExam() {
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
  examService.set(params).then((res) => {
    if (res.data) {
      router.push(`/home/examResult?id=${res.data}`)
    }
  })
}
</script>

<template>
  <div class="mb-3 relative mb-27">
    <t-card :bordered="false">
      <div class="exam-title">
        <h4 class="text-2xl font-bold dark:text-white">
          {{ examData.name }}
        </h4>
        <div class="space-x-3 text-[13px] mt-5">
          试卷说明：
          <span>本试卷共 {{ examList.length }} 题</span>
          <span>满分分数：{{ examData.totalScore }}分</span>
          <span>考试时间：{{ examData.time }} 分钟</span>
        </div>
      </div>
    </t-card>
    <div class="w-290  flex relative mt-6 ">
      <div class="exam-list space-y-6">
        <t-card v-for="item in examList" :key="item.id" class="!p-2" :bordered="false">
          <div class="list-title text-base" v-html="item.stem" />
          <div v-if="item.queType === 'Single'">
            <ul class="p-3 space-y-3 mt-3">
              <li v-for="data in item.options" :key="data.key" class="text-base">
                <div v-html="data.value" />
              </li>
            </ul>
            <t-radio-group v-model:value="item.keyword" class="!px-3 !mt-2 border-t-dashed border-t-1 !pt-5 !w-full" @change="onChange(item.id, $event)">
              <t-radio v-for="data in item.options" :key="data.key" :value="data.key">
                {{ data.key }}
              </t-radio>
            </t-radio-group>
          </div>
          <t-textarea
            v-else
            class="!mt-5 border-t-dashed border-t-1 !pt-5"
            placeholder="请在此作答"
            :autosize="{ minRows: 3, maxRows: 15 }"
            @change="onChange(item.id, $event)"
          />
        </t-card>
      </div>
      <div class="ml-2 flex-1 space-y-5 exam-right fixed right-49">
        <t-card :bordered="false">
          <div class="exam-right-cardTitle flex-center">
            <AlarmIcon class="!text-xl mr-1" />
            剩余时间
          </div>
          <div class="text-center text-2xl leading-15 tracking-[2px] flex-center">
            <PauseCircleIcon v-if="isActive" class="!mr-3 cursor-pointer" @click="handleClickPause" />
            <PlayCircleIcon v-else class="!mr-3 cursor-pointer" @click="handleClickPause" />
            {{ formatTime }}
          </div>
        </t-card>
        <t-card :bordered="false">
          <div class="exam-right-cardTitle flex-center">
            <SvgIcon name="ic:outline-question-answer" class="!text-xl mr-1" type="iconify" />
            答题卡
          </div>
          <div class="answer-cards">
            <ul class="p-5 grid grid-cols-5 gap-3">
              <li
                v-for="item in resultList" :key="item.subID"
                :class="item.UserAnswer ? 'active' : ''"
              >
                {{ item.order }}
              </li>
            </ul>
          </div>
        </t-card>
        <t-button block class="!h-11" shape="circle" @click="handleSubmitExam">
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

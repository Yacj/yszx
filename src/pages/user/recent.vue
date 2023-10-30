<script setup lang="ts">
// 历史数据
import { MessagePlugin } from 'tdesign-vue-next'
import { formatDay, formatRelativeDate } from '../../utils/dateUtils'
import { logService } from '@/api/modules/log'
import Result from '@/components/Result/Result.vue'
import type { ResDetailType } from '@/api/modules/resource'
import { resourceService } from '@/api/modules/resource'
import { fileDownload } from '@/utils/file'
import baseUrl from '@/utils/url'

const historyList = ref([])
const type = ref('Month')
const router = useRouter()
onMounted(() => {
  getBrowseHistory()
})
const options = [
  {
    label: '2022-01-01',
    content: '事件一',
  },
  {
    label: '2022-02-01',
    content: '事件二',
  },
  {
    label: '2022-03-01',
    content: '事件三',
  },
  {
    label: '2022-04-01',
    content: '事件四',
  },
]
function getBrowseHistory() {
  logService.get_browse({
    type: type.value,
  }).then((res) => {
    console.log(res)
    historyList.value = res.data
  })
}
function handleDownload(ResCode: string, ResType: ResDetailType) {
  resourceService.download({
    ResCode,
    ResType,
  }).then((res) => {
    fileDownload(baseUrl.file + res.data)
    MessagePlugin.success('文件下载成功')
  })
}
function handleDetailTo(resCode: string, type: string, resName: string, Code: string) {
  router.push({
    path: '/home/detail',
    query: {
      ResCode: resCode,
      ResType: type,
      ResName: resName,
      categoryCode: Code,
    },
  })
}
</script>

<template>
  <t-card title="我的足迹" class="card-title" :bordered="false">
    <template #actions>
      <t-radio-group v-model:value="type" variant="default-filled" @change="getBrowseHistory">
        <t-radio-button value="Month">
          月度
        </t-radio-button>
        <t-radio-button value="Week">
          周度
        </t-radio-button>
      </t-radio-group>
    </template>
    <Result v-if="historyList.length === 0" type="404" title="暂无数据" />
    <div v-else class="timeline">
      <div v-for="(item, index) in historyList" :key="index + 1" class="time-line-list my-2">
        <div class="line-list-header flex">
          <h2 class="text-2xl font-bold mr-5">
            {{ formatRelativeDate(item.time) }}
          </h2>
          <t-divider class="flex-1" />
        </div>
        <t-list size="large" class="user-res-list">
          <t-list-item v-for="row in item.row" :key="row.resCode" class="cursor-pointer" @click="handleDetailTo(row.resCode, row.resType, row.resName, row.categoryCode)">
            <t-list-item-meta :title="row.resName" :description="`浏览时间：${formatDay(row.createTime, 'YYYY-MM-DD HH:mm:ss')}`" />
          </t-list-item>
        </t-list>
      </div>
    </div>
  </t-card>
</template>

<style scoped lang="scss">

</style>

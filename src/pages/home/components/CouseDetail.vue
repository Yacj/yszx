<script setup lang="ts">
import { CollectionIcon, DownloadIcon } from 'tdesign-icons-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import type { DetailFileProps } from '@/pages/home/prop'
import { resourceService } from '@/api/modules/resource'
import { fileDownload } from '@/utils/file'
import baseUrl from '@/utils/url'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.vue'
import UserAddCollect from '@/pages/home/components/UserAddCollect.vue'
import collectService from '@/api/modules/collect'

const props = defineProps<DetailFileProps>()

const isAddCollection = ref(false)
const videoSrc = ref('')
const resourceData = ref({})
const chapterList = ref([])
const ChapterID = ref('')
const expanded = ref([])

onMounted(() => {
  getResDetail()
})

function getResDetail() {
  resourceService.get_details({
    ResCode: props.rescode,
    ResType: props.restype,
  }).then((res) => {
    const {
      chapter,
      resource,
    } = res.data
    chapterList.value = chapter
    if (chapter) {
      if (chapter[0].sub.length === 0) {
        ChapterID.value = chapter[0].id
      }
      else {
        ChapterID.value = chapter[0].sub[0].id
      }
      chapter.forEach((item: any) => {
        if (item.sub.length > 0) {
          expanded.value.push(item.id)
        }
      })
    }
    resourceData.value = resource
    getChapterVideoData()
  })
}

function handleClick(id: number) {
  ChapterID.value = `${id}`
  getChapterVideoData()
}

function getChapterVideoData() {
  resourceService.getByChapterID({
    ChapterID: ChapterID.value,
  }).then((res) => {
    const {
      videoPath,
    } = res.data
    videoSrc.value = baseUrl.file + videoPath
  })
}
function handleFileDown() {
  resourceService.download({
    ResCode: props.rescode,
    ResType: props.restype,
    ChapterID: ChapterID.value,
  }).then((res) => {
    fileDownload(baseUrl.file + res.data)
    MessagePlugin.success('文件下载成功')
  })
}
function formatSecondsToMinutes(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
}
function handleCollection() {
  isAddCollection.value = true
}
function handleCollectConfirm(e: number) {
  const params = {
    ResCode: props.rescode,
    ResType: props.restype,
    CollectID: e,
  }
  collectService.res_add(params).then((res) => {
    if (res) {
      MessagePlugin.success('收藏成功')
    }
    else {
      MessagePlugin.error('收藏失败')
    }
    isAddCollection.value = false
  })
}
</script>

<template>
  <div class="course-detail flex wh-full mb-5">
    <div class="course-detail-left w-290 mr-5">
      <t-card :bordered="false" class="course-detail-play">
        <VideoPlayer :src="videoSrc" class="w-full !h-150" />
        <template #footer>
          <div class="flex justify-between">
            <div>
              <h1 class="text-xl">
                {{ resourceData.name }}
              </h1>
            </div>
            <div class="space-x-3">
              <t-button class="file-entry" variant="outline" @click="handleCollection">
                <template #icon>
                  <CollectionIcon class="file-icon" />
                </template>
                视频收藏
              </t-button>
              <t-button class="file-entry" variant="outline" @click="handleFileDown">
                <template #icon>
                  <DownloadIcon class="file-icon" />
                </template>
                文件下载
              </t-button>
            </div>
          </div>
        </template>
      </t-card>
      <t-card :bordered="false" class="mt-5">
        <t-tabs :default-value="1">
          <t-tab-panel :value="1" label="介绍">
            <p class="m-8">
              {{ resourceData.content }}
              {{ resourceData.keyword }}
            </p>
          </t-tab-panel>
        </t-tabs>
      </t-card>
    </div>
    <div class="course-detail-right flex-1 h-190 overflow-y-scroll relative">
      <t-card title="章节目录" :bordered="false" header-bordered>
        <t-menu
          v-model:expanded="expanded"
          :value="ChapterID"
          class="!wh-full"
        >
          <template v-for="item in chapterList" :key="item.id">
            <t-menu-item
              v-if="item.sub.length === 0"
              :value="item.id"
              @click="handleClick(item.id)"
            >
              {{ item.name }}
            </t-menu-item>
            <t-submenu
              v-else
              :value="item.id"
              :title="item.name"
            >
              <template v-for="row in item.sub" :key="row.id">
                <t-menu-item
                  :value="row.id"
                  @click="handleClick(row.id)"
                >
                  {{ row.name }}
                  ({{ formatSecondsToMinutes(row.playTime) }})
                </t-menu-item>
              </template>
            </t-submenu>
          </template>
        </t-menu>
      </t-card>
    </div>
  </div>
  <UserAddCollect :visible="isAddCollection" @confirm="handleCollectConfirm" @close="isAddCollection = false" />
</template>

<style scoped lang="scss">
:deep(.course-detail-left) {
  .t-card__body {
    padding: 0;
  }
}

:deep(.course-detail-right) {
  .t-button {
    justify-content: normal;
  }

  .t-card__body {
    padding: 0;
  }
}
</style>

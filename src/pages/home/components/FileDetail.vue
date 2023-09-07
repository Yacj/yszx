<script setup lang="ts">
import { DownloadIcon, FullscreenIcon } from 'tdesign-icons-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import { fileTypeEnum } from '@/utils/enums'
import { resourceService } from '@/api/modules/resource'
import baseUrl from '@/utils/url'
import { fileDownload } from '@/utils/file'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.vue'

const props = defineProps({
  resCode: {
    type: String,
    required: true,
  },
})
const fileRef = ref<HTMLElement | null>(null)
const { toggle } = useFullscreen(fileRef)
const typeName = ref('')
const fileData = ref({})
const fileLoading = ref(false)

// 推荐列表
const recommendList = ref([])
//
const resName = ref('')
onMounted(() => {
  handleGetFileDetails()
})

function handleGetFileDetails() {
  fileLoading.value = true
  resourceService.get_details({
    ResCode: props.resCode,
    ResType: 'File',
  }).then((res) => {
    const {
      format,
      name,
    } = res.data
    resName.value = name
    typeName.value = format
    fileData.value = res.data
    fileLoading.value = false
  })
}

function getFileType(type: string) {
  const typeName = type.split('.')[1]
  return Object.keys(fileTypeEnum).find(key => fileTypeEnum[key].includes(typeName))
}
function handleFileDown() {
  fileDownload(baseUrl.file + fileData.value.path)
  MessagePlugin.success('文件下载成功')
}
function handleRenderMask() {
  return h('div', {
    style: {
      background: 'rgba(0,0,0,.4)',
      color: '#fff',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }, '预览查看大图')
}
</script>

<template>
  <div class="flex mt-6 mb-3 preview">
    <t-card
      :bordered="false"
      :title="`资源预览 - ${resName} `"
      class="!mr-3 card-title"
      :loading="fileLoading"
    >
      <div
        class="h-250 w-295 overflow-y-scroll relative"
      >
        <embed
          v-if="getFileType(typeName) === 'pdf' "
          ref="fileRef"
          :src="`${baseUrl.file + fileData.path}`"
          class="wh-full"
        >
        <div v-if="getFileType(typeName) === 'img'" ref="fileRef" class="img">
          <t-space direction="vertical" class="w-full">
            <t-image-viewer
              v-for="item in fileData.temRow"
              :key="item.id"
              :images="[baseUrl.file + item.resPath]"
              :close-on-overlay="true"
            >
              <template #trigger="{ open }">
                <t-image
                  :src="baseUrl.file + item.resPath"
                  fit="cover"
                  :overlay-content="handleRenderMask"
                  overlay-trigger="hover"
                  @click="open"
                />
              </template>
            </t-image-viewer>
          </t-space>
        </div>
        <div v-if="getFileType(typeName) === 'word'" class="h-250 w-295 overflow-y-scroll relative">
          <embed
            ref="fileRef"
            :src="`https://view.officeapps.live.com/op/view.aspx?src=${baseUrl.file + fileData.path}`"
            class="wh-full"
          >
        </div>
        <div v-if="getFileType(typeName) === 'html'">
          <iframe
            ref="fileRef"
            :src="baseUrl.file + fileData.path"
            class="wh-full"
          />
        </div>
        <div v-if="getFileType(typeName) === 'video'" class="h-150">
          <VideoPlayer id="fileDetail" ref="fileRef" :src="baseUrl.file + fileData.path" class="w-full !h-150" />
        </div>
      </div>
      <template #actions>
        <div class="space-x-3">
          <t-button
            variant="outline"
            @click="toggle"
          >
            <template #icon>
              <FullscreenIcon />
            </template>
            全屏
          </t-button>
          <!--          <t-button variant="outline"> -->
          <!--            点击收藏 -->
          <!--          </t-button> -->
          <t-button class="file-entry" @click="handleFileDown">
            <template #icon>
              <DownloadIcon class="file-icon" />
            </template>
            文件下载
          </t-button>
        </div>
      </template>
    </t-card>
    <div class="flex-1 recommend">
      <t-card title="资源推荐" :bordered="false" header-bordered>
        <!--        <t-space direction="vertical" class="w-full"> -->
        <!--          <t-card title="推荐1" :bordered="false"> -->
        <!--            121212231212 -->
        <!--          </t-card> -->
        <!--          <t-card title="推荐1" :bordered="false"> -->
        <!--            121212231212 -->
        <!--          </t-card> -->
        <!--          <t-card title="推荐1" :bordered="false"> -->
        <!--            121212231212 -->
        <!--          </t-card> -->
        <!--        </t-space> -->
      </t-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-entry{
  &:hover{
    .file-icon{
      animation: iconJump .3s;
    }
  }
}
</style>

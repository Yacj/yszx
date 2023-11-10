<script setup lang="ts">
import { CollectionIcon, DownloadIcon, FullscreenIcon } from 'tdesign-icons-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import { fileDownload } from '@/utils/file'
import type { DetailFileProps } from '@/pages/home/prop'
import { fileTypeEnum } from '@/utils/enums'
import { resourceService } from '@/api/modules/resource'
import baseUrl from '@/utils/url'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.vue'
import UserAddCollect from '@/pages/home/components/UserAddCollect.vue'
import collectService from '@/api/modules/collect'
import { replaceUrlImage } from '@/utils'

const props = defineProps<DetailFileProps>()
const fileRef = ref<HTMLElement | null>(null)
const { toggle } = useFullscreen(fileRef)
const typeName = ref('')
const fileData = ref({})
const fileLoading = ref(false)
const isAddCollection = ref(false)
// 推荐列表
const recommendList = ref([])
const resName = ref('')

onMounted(() => {
  handleGetFileDetails()
  handleGetRecommend()
})

function handleGetFileDetails() {
  fileLoading.value = true
  resourceService.get_details({
    ResCode: props.rescode,
    ResType: props.restype,
  }).then((res) => {
    const {
      format,
      name,
    } = res.data
    resName.value = name
    typeName.value = format
    fileData.value = res.data
    fileLoading.value = false
    // if (typeName.value === '.docx') {
    //   const fileUrl = baseUrl.file + fileData.value.path
    //   axios.get(
    //     fileUrl,
    //     {
    //       responseType: 'blob',
    //     },
    //   ).then((res) => {
    //     console.log(res)
    //   }).catch((err) => {
    //     console.error(err)
    //   })
    // }
  })
}

function handleGetRecommend() {
  resourceService.get_recommend({
    ResCode: props.rescode,
  }).then((res) => {
    recommendList.value = res.data
  })
}
function getFileType(type: string): string | undefined {
  const typeName = type.split('.')[1]
  return Object.keys(fileTypeEnum).find(key => fileTypeEnum[key].includes(typeName))
}
function handleFileDown() {
  resourceService.download({
    ResCode: props.rescode,
    ResType: props.restype,
  }).then((res) => {
    fileDownload(baseUrl.file + res.data)
    MessagePlugin.success('文件下载成功')
  })
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
const router = useRouter()
function handleNavTo(resCode: string, type: string, resName: string, Code: string) {
  window.open(`/#/home/detail?ResCode=${resCode}&ResType=${type}&ResName=${resName}&categoryCode=${Code}`, '_blank')
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
  <div class="flex mt-6 mb-3 preview">
    <t-card
      :bordered="false"
      :title="`资源预览 - ${resName} `"
      class="!mr-3 card-title"
      :loading="fileLoading"
    >
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
          <t-button variant="outline" @click="handleCollection">
            <template #icon>
              <CollectionIcon class="file-icon" />
            </template>
            点击收藏
          </t-button>
          <t-button class="file-entry" @click="handleFileDown">
            <template #icon>
              <DownloadIcon class="file-icon" />
            </template>
            文件下载
          </t-button>
        </div>
      </template>
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
          <div v-if="props.restype === 'Image'">
            <t-image-viewer :images="[replaceUrlImage(fileData.path)]">
              <template #trigger="{ open }">
                <t-image :src="replaceUrlImage(fileData.path)" fit="cover" class="cursor-pointer" @click="open" />
              </template>
            </t-image-viewer>
          </div>
          <t-space v-else direction="vertical" class="w-full">
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
          <!--          <embed -->
          <!--            ref="fileRef" -->
          <!--            :src="typeName === '.doc' -->
          <!--              ? `https://view.officeapps.live.com/op/view.aspx?src=${baseUrl.file + fileData.path}` -->
          <!--              : `${baseUrl.file + fileData.path}` -->
          <!--            " -->
          <!--            class="wh-full" -->
          <!--          >     -->
          <embed
            ref="fileRef"
            :src="`${baseUrl.file + fileData.path}`"
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
    </t-card>
    <div class="flex-1 recommend h-180 overflow-y-scroll relative ">
      <t-card :bordered="false" header-bordered class="card-title">
        <template #title>
          <div class="title">
            资源推荐
          </div>
        </template>
        <t-space direction="vertical" class="w-full">
          <t-card
            v-for="(item, index) in recommendList" :key="index + 1" class="cursor-pointer"
            :bordered="false"
            @click="handleNavTo(item.resCode, item.type, item.name, item.cateCode)"
          >
            <template #cover>
              <t-image
                :src="baseUrl.file + item.logo"
                class="h-[150px]"
                fit="cover"
              />
            </template>
            <div class="text-center text-base font-medium mt-1 cursor-pointer hover:text-[color:var(--td-brand-color)]">
              {{ item.name }}
            </div>
            <t-divider />
          </t-card>
        </t-space>
      </t-card>
    </div>
    <UserAddCollect :visible="isAddCollection" @confirm="handleCollectConfirm" @close="isAddCollection = false" />
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
:deep(.recommend){
  .t-card__title--bordered{
    border: none;
  }
  .title{
    position: relative;
    &::after{
      content: "";
      display: inline-block;
      width: 40px;
      height: 2px;
      background: var(--td-brand-color);
      border-radius: 2px;
      position: absolute;
      left: 0;
      bottom: -10px;
    }
  }
}
</style>

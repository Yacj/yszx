<script setup lang="ts">
import { FullscreenIcon } from 'tdesign-icons-vue-next'
import { fileTypeEnum } from '@/utils/enums'
import { resourceService } from '@/api/modules/resource'
import baseUrl from '@/utils/url'

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
resourceService.get_details({
  ResCode: props.resCode,
  ResType: 'File',
}).then((res) => {
  console.log(res)
  const {
    format,
  } = res.data
  typeName.value = format
  fileData.value = res.data
})
function getFileType(type: string) {
  const typeName = type.split('.')[1]
  return Object.keys(fileTypeEnum).find(key => fileTypeEnum[key].includes(typeName))
}
</script>

<template>
  <div class="flex mt-6 mb-3 preview">
    <t-card :bordered="false" title="资源预览" class="!mr-3 card-title">
      <div
        class="h-250 w-295 overflow-y-scroll relative"
      >
        <embed
          v-if="getFileType(typeName) === 'pdf' "
          ref="fileRef"
          :src="`https://wlapi.jqweike.cn/pdfRead/web/viewer.html?file=${baseUrl.file + fileData.path}`"
          class="wh-full"
        >
        <div v-if="getFileType(typeName) === 'img'" ref="fileRef" class="img">
          <t-space direction="vertical">
            <t-image
              :src="baseUrl.file + fileData.path"
              fit="cover"
            />
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
          <!--          <t-button variant="outline"> -->
          <!--            <template #icon> -->
          <!--              <DownloadIcon /> -->
          <!--            </template> -->
          <!--            点击下载 -->
          <!--          </t-button> -->
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

</style>

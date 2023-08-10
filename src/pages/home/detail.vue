<script setup lang="ts">
import { DownloadIcon, FullscreenIcon } from 'tdesign-icons-vue-next'
import { fileTypeEnum } from '@/utils/enums'

const fileRef = ref<HTMLElement | null>(null)
const { toggle } = useFullscreen(fileRef)
//*
// 定义一个enum类型
// 比如 word:['docx','doc']
// 返回 word
// */
function getFileType(type: string) {
  const typeName = type.split('.')[1]
  return Object.keys(fileTypeEnum).find(key => fileTypeEnum[key].includes(typeName))
}
const typeName = 'test.jpg'
console.log(getFileType('.doc'))
</script>

<template>
  <div class="content-detail container mx-auto mt-8">
    <div class="flex mt-6 mb-3 preview">
      <t-card :bordered="false" title="资源预览" class="mr-3 card-title">
        <div
          class="h-180 w-295 overflow-y-scroll relative"
        >
          <embed
            v-if="getFileType(typeName) === 'pdf' "
            ref="fileRef"
            src="https://wlapi.jqweike.cn/pdfRead/web/viewer.html?file=http://wlapi.jqweike.cn/\wlxt_Data\WAK\GZ\FL19\RJGZ020101\01\wlxtRJGZSX20211024000049.pdf"
            class="wh-full"
          >
          <div v-if="getFileType(typeName) === 'img'" ref="fileRef" class="img">
            <t-space direction=vertical>
              <t-image
                src="https://tdesign.gtimg.com/demo/demo-image-1.png"
                fit="cover"
              />
              <t-image
                src="https://tdesign.gtimg.com/demo/demo-image-1.png"
                fit="cover"
              />
            </t-space>
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
            <t-button variant="outline">
              点击收藏
            </t-button>
            <t-button variant="outline">
              <template #icon>
                <DownloadIcon />
              </template>
              点击下载
            </t-button>
          </div>
        </template>
      </t-card>
      <div class="flex-1 recommend">
        <t-card title="资源推荐" :bordered="false" header-bordered>
          <t-space direction="vertical" class="w-full">
            <t-card title="推荐1" :bordered="false">
              121212231212
            </t-card>
            <t-card title="推荐1" :bordered="false">
              121212231212
            </t-card>
            <t-card title="推荐1" :bordered="false">
              121212231212
            </t-card>
          </t-space>
        </t-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.preview){
  .t-card__body{
    padding:10px;
  }
}
:deep(.recommend){
  .t-card__body{
    padding:10px;
  }
}
</style>

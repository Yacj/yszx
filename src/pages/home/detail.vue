<script setup lang="ts">
import {DownloadIcon, FullscreenIcon} from 'tdesign-icons-vue-next'

const fileRef = ref<HTMLElement | null>(null)
const fileTypeList: [] = ['word', 'pdf', 'img', 'video', 'html']
const { toggle } = useFullscreen(fileRef)
</script>

<template>
  <div class="content-detail max-w-screen-xl mx-auto mt-8">
    <Breadcrumb />
    <div class="flex mt-6 mb-3 preview">
      <t-card :bordered="false" title="资源预览" class="mr-3 card-title">
        <div
          class="h-180 w-240"
        >
          <embed
            ref="fileRef"
            src="https://wlapi.jqweike.cn/pdfRead/web/viewer.html?file=http://wlapi.jqweike.cn/\wlxt_Data\WAK\GZ\FL19\RJGZ020101\01\wlxtRJGZSX20211024000049.pdf"
            class="wh-full"
          >
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
                <DownloadIcon  />
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

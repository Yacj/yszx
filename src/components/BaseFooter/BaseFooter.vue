<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { getImageUrl } from '@/utils'

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
  }, '点击查看大图')
}
</script>

<template>
  <t-footer class="p-4 bg-white sm:p-8 dark:bg-gray-800 base-footer">
    <div class="mx-auto max-w-screen-2xl">
      <div class="md:flex md:justify-between divide-x-1">
        <div class="mb-6 md:mb-0">
          <ul class="space-y-4">
            <li class="flex-y-center">
              <SvgIcon name="carbon:phone-filled" class="mr-2" :size="21" type="iconify" />
              公司电话：400 030 1316
            </li>
            <li class="flex-y-center">
              <SvgIcon name="ic:round-email" class="mr-2" :size="21" type="iconify" />
              公司邮箱：kefu@kingchannels.com
            </li>
            <li class="flex-y-center">
              <SvgIcon name="mdi:web" class="mr-2" :size="21" type="iconify" />
              公司官网：www.wlxt.cn
            </li>
            <li class="flex-y-center">
              <SvgIcon name="mdi:company" class="mr-2" :size="21" type="iconify" />
              公司地址：北京市海淀区农大南路88号1号一层1-108
            </li>
          </ul>
        </div>
        <div class="pl-15">
          <ul class="space-y-8">
            <li>
              未来学堂-教育资源库及案例系统V3.0
            </li>
            <li>
              ©2018~2023科恰喏斯 版权所有京ICP备19005664号-3
            </li>
            <li>
              京公安备 11010802039143
            </li>
          </ul>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 pl-15">
          <t-image-viewer :images="[getImageUrl('footer-license.png')]" :closeOnOverlay="true">
            <template #trigger="{ open }">
              <t-image
                :src="getImageUrl('footer-license.png')" class="h-33 w-35"
                :overlay-content="handleRenderMask"
                overlay-trigger="hover"
                @click="open"
              />
            </template>
          </t-image-viewer>
          <t-image-viewer :images="[getImageUrl('license2.jpg')]">
            <template #trigger="{ open }">
              <t-image
                :src="getImageUrl('license2.jpg')" class="h-33 w-35"
                :overlay-content="handleRenderMask"
                overlay-trigger="hover"
                @click="open"
              />
            </template>
          </t-image-viewer>
          <t-image-viewer :images="[getImageUrl('footer-code.png')]">
            <template #trigger="{ open }">
              <t-image
                :src="getImageUrl('footer-code.png')" class="h-33 w-35"
                :overlay-content="handleRenderMask"
                overlay-trigger="hover"
                @click="open"
              />
            </template>
          </t-image-viewer>
        </div>
      </div>
    </div>
  </t-footer>
</template>

<style scoped lang="scss">
.base-footer {
  background-color: var(--footer-bg);
  color: var(--td-font-white-1)
}
</style>

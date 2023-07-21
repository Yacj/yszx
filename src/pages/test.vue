<script setup lang="ts">
import { isObjectEmpty } from '@/utils/is'

const files = ref([{
  name: 'avatar1.jpg',
  url: 'https://tdesign.gtimg.com/site/avatar.jpg'
}, {
  name: 'avatar2.jpg',
  url: 'https://avatars.githubusercontent.com/u/11605702?v=4'
}])
const uploadRef = ref(null)
function requestUpload(file) {
  console.log(file)
  return true
}

function requestMethod(file) {
  console.log(file)
}
function testUpload() {
  console.log(files.value)
}
const disabled = computed(() => {
  return isObjectEmpty(files.value)
})
console.log(disabled.value)
</script>

<template>
  <div class="container mx-auto">
    <t-upload
      ref="uploadRef"
      v-model="files"
      :auto-upload="false"
      :before-upload="requestUpload"
      placeholder="自定义上传方法需要返回成功或失败信息"
      theme="image"
      accept="image/*"
      multiple
    />
    <t-button :disabled="disabled" @click="testUpload" size="large">
      上传
    </t-button>
  </div>
</template>

<style scoped>

</style>

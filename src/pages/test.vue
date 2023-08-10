<script setup lang="ts">
import type { UploadFile } from 'tdesign-vue-next'
import { isObjectEmpty } from '@/utils/is'
import { deepClone } from '@/utils/object'
import TextOverflow from '@/components/TextOverflow/TextOverflow.vue'

const valObject = ref({
  name: 'avatar1.jpg',
  url: 'https://tdesign.gtimg.com/site/avatar.jpg',
})

const files = ref([{
  name: 'avatar1.jpg',
  url: 'https://tdesign.gtimg.com/site/avatar.jpg',
}, {
  name: 'avatar2.jpg',
  url: 'https://avatars.githubusercontent.com/u/11605702?v=4',
}])
const uploadRef = ref(null)
function requestUpload(file: UploadFile) {
  console.log(file)
  return true
}

function requestMethod(file: UploadFile) {
  console.log(file)
}
function testUpload() {
  console.log(files.value)
}
const disabled = computed(() => {
  return isObjectEmpty(files.value)
})
function handleClickObject(val) {
  const object = deepClone(valObject.value)
  if (val === 'add') {
    object.id = '12'
  }
  else {
    delete object.name
  }
  console.log(object)
  console.log(valObject.value)
}
const text = ref('测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件测试多行文本组件')
</script>

<template>
  <div class="container mx-auto">
    <TextOverflow :max-lines="2" :width="500">
      <template #text>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </template>
      <template #default="{ clickToggle, expanded }">
        <t-button variant="text" theme="primary" class="btn" @click="clickToggle">
          {{ expanded ? "收起" : "展开" }}
        </t-button>
      </template>
    </TextOverflow>
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
    <t-button :disabled="disabled" size="large" @click="testUpload">
      上传
    </t-button>
    <t-space>
      <t-button @click="handleClickObject('add')">
        新增对象
      </t-button>
      <t-button @click="handleClickObject('del')">
        删除对象
      </t-button>
    </t-space>
  </div>
</template>

<style scoped>

</style>

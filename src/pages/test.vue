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

const box = [
  {
    number: 1,
    bg: 'blue',
  },

  {
    number: 2,
    bg: 'pink',
  },

  {
    number: 3,
    bg: 'red',
  },
]

const containerEl = ref<HTMLDivElement>()

function scrollEvent(e: UIEvent) {
  const containerEl = e.target as HTMLDivElement
}

// 上一张
function pre() {
  const el = containerEl.value
  if (!el) { return }

  const scrollLeft = el?.scrollLeft

  if (scrollLeft > 0) {
    el.scrollLeft = scrollLeft - 300
  }
}

function next() {
  const el = containerEl.value
  if (!el) { return }

  const scrollLeft = el?.scrollLeft

  const max = (box.length - 1) * 300 // 轮播图的数量 -1

  if (scrollLeft < max) {
    el.scrollLeft = scrollLeft + 300
  }
}
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
    <div class="relative z-0 mt-15">
      <input id="floating_standard" type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" ">
      <label for="floating_standard" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Floating standard</label>
    </div>

    <div
      class="w-100vw h-100vh text-14px text-black flex justify-center items-center mt-10"
    >
      <div
        class="w-60px h-60px rounded-full bg-black flex items-center justify-center"
        @click.stop="pre"
      >
        <span class="text-white">上一张</span>
      </div>

      <div
        ref="containerEl"
        class="w-300px h-300px overflow-auto flex snap-x snap-mandatory scroll-smooth"
        @scroll="scrollEvent"
      >
        <div
          v-for="(item, index) in box"
          :key="index+1"
          class="w-300px h-300px shrink-0 leading-300px text-center snap-center"
          :style="{ backgroundColor: item.bg }"
        >
          <span class="text-100px text-white">{{ item.number }}</span>
        </div>
      </div>

      <div
        class="w-60px h-60px rounded-full bg-black flex items-center justify-center"
        @click="next"
      >
        <span class="text-white">下一张</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

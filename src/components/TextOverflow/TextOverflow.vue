<script setup lang="ts">
import { computed, defineProps, nextTick, onMounted, ref } from 'vue'

interface Props {
  text: string
  maxLines: number
  width: number
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  maxLines: 1,
  width: 0,
})

const offset = ref<number>(props.text.length)
const expanded = ref<boolean>(false)
const slotBoxWidth = ref<number>(0)
const textBoxWidth = ref<number | string | null>(props.width)
const showSlotNode = ref<boolean>(false)
const slotRef = ref<HTMLElement | null>(null)
const textOverflow = ref<HTMLElement | null>(null)
const overEllipsis = ref<HTMLElement | null>(null)

const boxStyle = computed(() => {
  if (props.width) {
    return {
      width: `${props.width}px`,
    }
  }
  return {}
})

const realText = computed(() => {
  // 是否被截取
  const isCutOut = offset.value !== props.text.length
  let realText = props.text
  if (isCutOut && !expanded.value) {
    realText = `${props.text.slice(0, offset.value)}...`
  }
  return realText
})

function calculateOffset(from: number, to: number): void {
  nextTick(() => {
    if (Math.abs(from - to) <= 1) {
      return
    }
    if (isOverflow()) {
      to = offset.value
    }
    else {
      from = offset.value
    }
    offset.value = Math.floor((from + to) / 2)
    calculateOffset(from, to)
  })
}

function isOverflow(): boolean {
  const { len, lastWidth } = getLines()

  if (len < props.maxLines) {
    return false
  }
  if (props.maxLines) {
    // 超出部分 行数 > 最大行数 或则  已经是最大行数但最后一行宽度 + 后面内容超出正常宽度
    const lastLineOver
            = len === props.maxLines && lastWidth + (slotBoxWidth.value || 0) > (textBoxWidth.value || 0)
    if (len > props.maxLines || lastLineOver) {
      return true
    }
  }
  return false
}

function getLines() {
  if (overEllipsis.value) {
    const clientRects = overEllipsis.value
    return {
      len: clientRects.length,
      lastWidth: clientRects[clientRects.length - 1]?.width || 0,
    }
  }
  return { len: 0, lastWidth: 0 }
}

function toggle() {
  expanded.value = !expanded.value
}

onMounted(() => {
  const { len } = getLines()
  if (len > props.maxLines) {
    showSlotNode.value = true
    nextTick(() => {
      slotBoxWidth.value = slotRef.value?.clientWidth || 0
      textBoxWidth.value = textOverflow.value?.clientWidth || 0
      calculateOffset(0, props.text.length)
    })
  }
})
</script>

<template>
  <div ref="textOverflow" class="text-overflow" :style="boxStyle">
    <div>
      <span ref="overEllipsis" class="color-3c fs24">
        <slot name="text">
          {{ realText }}
        </slot>
        <!--        <span v-html="realText"></span> -->
      </span>
    </div>
    <div v-if="showSlotNode" ref="slotRef" class="flex-box">
      <div class="slot-box">
        <slot :click-toggle="toggle" :expanded="expanded" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.slot-box{
  display: block;
}
</style>

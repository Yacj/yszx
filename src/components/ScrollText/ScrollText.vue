<script setup lang="ts">
interface Props {
  content: string
  width: number
  duration: number
}
const props = withDefaults(defineProps<Props>(), {
  content: '',
  width: 0,
  duration: 0,
})
const contentRef: any = ref(null)
let requestId: any
let isScrolling = false

function startScroll() {
  if (!isScrolling) {
    isScrolling = true
    const containerWidth = contentRef.value.parentElement.clientWidth
    const contentWidth = contentRef.value.scrollWidth

    if (contentWidth > containerWidth) {
      const duration = props.duration
      const start = performance.now()

      const step = (timestamp: number) => {
        const elapsed = timestamp - start
        const progress = Math.min(elapsed / duration, 1)
        const scrollDistance = contentWidth - containerWidth
        contentRef.value.style.transform = `translateX(${-scrollDistance * progress}px)`

        if (progress < 1) {
          requestId = requestAnimationFrame(step)
        }
        else {
          isScrolling = false
          requestId = undefined
          startScroll() // Continue scrolling seamlessly
        }
      }

      requestId = requestAnimationFrame(step)
    }
    else {
      isScrolling = false
    }
  }
}

function stopScroll() {
  if (requestId) {
    cancelAnimationFrame(requestId)
    requestId = undefined
  }
  isScrolling = false
}

onMounted(() => {
  startScroll()
})

onBeforeUnmount(() => {
  stopScroll()
})

watch(
  () => props.content,
  () => {
    stopScroll()
    startScroll()
  },
)
</script>

<template>
  <div
    class="scroll-text-container"
    :style="{ width: `${width}px` }"
    @mouseenter="stopScroll"
    @mouseleave="startScroll"
  >
    <div ref="contentRef" class="scroll-text-content">
      {{ content }}
    </div>
  </div>
</template>

<style scoped>
.scroll-text-container {
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
}

.scroll-text-content {
  display: inline-block;
  animation: none;
}
</style>

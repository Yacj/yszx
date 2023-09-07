<script setup lang="ts">
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'

const props = defineProps({
  src: {
    type: String,
    default: '',
    required: true,
  },
  id: {
    type: String,
    default: 'mse',
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
  height: {
    type: [String, Number],
    default: '100%',
  },
})
const emits = defineEmits(['triggerEvent'])
const player = ref() as any
const defaultOptions = {
  autoplay: true,
  lang: 'zh-cn',
  keyShortcut: 'on',
  keyShortcutStep: { // 设置调整步长
    currentTime: 15, // 播放进度调整步长，默认10秒
    volume: 0.2, // 音量调整步长，默认0.1
  },
  playbackRate: [0.5, 1, 1.5, 2, 2.5],
  download: false,
  pip: true,
  screenShot: false,
  cssFullscreen: false,
}
watch(
  () => props.src,
  (newVal) => {
    if (newVal) {
      handleInitPlayer()
    }
  },
)
onMounted(() => {
  handleInitPlayer()
})

function handleInitPlayer() {
  const options: object = {
    ...defaultOptions,
    id: props.id,
    url: props.src,
    width: props.width,
    height: props.height,
  }
  if (props.src !== '') {
    player.value = new Player(options)
    if (player.value) {
      player.value.on('play', () => {
        emits('triggerEvent', true)
      })
      player.value.on('pause', () => {
        emits('triggerEvent', false)
      })
    }
  }
}
</script>

<template>
  <div :id="props.id" class="video-js" />
</template>

<style scoped lang="scss">
</style>

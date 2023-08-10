<script setup lang="ts">
interface Props {
  identifyCode?: string
  fontSizeMin?: number
  fontSizeMax?: number
  backgroundColorMin?: number
  backgroundColorMax?: number
  colorMin?: number
  colorMax?: number
  lineColorMin?: number
  lineColorMax?: number
  dotColorMin?: number
  dotColorMax?: number
  contentWidth?: number
  contentHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  identifyCode: '1234',
  fontSizeMin: 20,
  fontSizeMax: 30,
  backgroundColorMin: 180,
  backgroundColorMax: 240,
  colorMin: 50,
  colorMax: 160,
  lineColorMin: 40,
  lineColorMax: 180,
  dotColorMin: 0,
  dotColorMax: 255,
  contentWidth: 100,
  contentHeight: 40,
})

// 生成一个随机数
function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

// 生成一个随机的颜色
function randomColor(min: number, max: number) {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return `rgb(${r},${g},${b})`
}

// 绘制干扰线
function drawLine(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = randomColor(props.lineColorMin, props.lineColorMax)
    ctx.beginPath()
    ctx.moveTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight))
    ctx.lineTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight))
    ctx.stroke()
  }
}

function drawText(ctx: CanvasRenderingContext2D, txt: string, i: number) {
  ctx.fillStyle = randomColor(props.colorMin, props.colorMax)
  ctx.font = `${randomNum(props.fontSizeMin, props.fontSizeMax)}px Simhei`
  const x = (i + 1) * (props.contentWidth / (props.identifyCode.length + 1))
  const y = randomNum(props.fontSizeMax, props.contentHeight - 5)
  const deg = randomNum(-45, 45)
  // 修改坐标原点和旋转角度
  ctx.translate(x, y)
  ctx.rotate((deg * Math.PI) / 180)
  ctx.fillText(txt, 0, 0)
  // 恢复坐标原点和旋转角度
  ctx.rotate((-deg * Math.PI) / 180)
  ctx.translate(-x, -y)
}

function drawDot(ctx: CanvasRenderingContext2D) {
  // 绘制干扰点
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = randomColor(0, 255)
    ctx.beginPath()
    ctx.arc(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight), 1, 0, 2 * Math.PI)
    ctx.fill()
  }
}

function drawPic() {
  const canvas = document.getElementById('s-canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.textBaseline = 'bottom'
  // 绘制背景
  ctx.fillStyle = randomColor(props.backgroundColorMin, props.backgroundColorMax)
  ctx.fillRect(0, 0, props.contentWidth, props.contentHeight)
  // 绘制文字
  for (let i = 0; i < props.identifyCode.length; i++) {
    drawText(ctx, props.identifyCode[i], i)
  }
  drawLine(ctx)
  drawDot(ctx)
}

watch(() => props.identifyCode, () => {
  drawPic()
})

onMounted(() => {
  drawPic()
})
</script>

<template>
  <div class="s-canvas cursor-pointer">
    <canvas id="s-canvas" :width="props.contentWidth" :height="props.contentHeight" />
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { HomeIcon, QrcodeIcon } from 'tdesign-icons-vue-next'
import type { TdStickyItemProps } from 'tdesign-vue-next'
import { getAssetsImg } from '@/utils'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

interface contextItem {
  e: MouseEvent
  item: TdStickyItemProps
}
const router = useRouter()
function handleClick(context: contextItem) {
  const {
    item: {
      label,
    },
  } = context
  if (label === '返回首页') {
    router.push('/')
  }
  if (label && label.includes('主题')) {
    handleToggleTheme(context.e)
  }
}
function handleToggleTheme(event: MouseEvent) {
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  let isDark: boolean
  const documentStartViewTransition = document.startViewTransition
  const { colorScheme } = appStore
  const storeSetTheme = () => {
    if (colorScheme === 'dark') {
      appStore.setColorScheme('light')
      document.documentElement.removeAttribute('theme-mode')
    }
    else {
      appStore.setColorScheme('dark')
      document.documentElement.setAttribute('theme-mode', 'dark')
    }
  }
  if (documentStartViewTransition) {
    const transition = document.startViewTransition(() => {
      const root = document.documentElement
      isDark = root.classList.contains('dark')
      root.classList.remove(isDark ? 'dark' : 'light')
      root.classList.add(isDark ? 'light' : 'dark')
    })
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
      storeSetTheme()
    })
  }
  else {
    storeSetTheme()
  }
}
</script>

<template>
  <t-space>
    <t-sticky-tool
      :offset="[-60, 130]"
      :width="70"
      class="!z-[999]"
      @click="handleClick"
    >
      <t-sticky-item label="返回首页" class="!z-50">
        <template #icon>
          <HomeIcon />
        </template>
      </t-sticky-item>
      <t-sticky-item
        label="微信扫码"
        class="!z-50"
        :popup-props="{ overlayInnerStyle: { padding: '4px', height: '128px' } }"
      >
        <template #icon>
          <QrcodeIcon />
        </template>
        <template #popup>
          <img :src="getAssetsImg ('footer-code.png')" alt="" class="w-30 h-33">
        </template>
      </t-sticky-item>
      <t-sticky-item
        :label="appStore.colorScheme === 'dark' ? '明亮主题' : '暗黑主题'"
        class="!z-50"
      >
        <template #icon>
          <SvgIcon v-if="appStore.colorScheme === 'dark'" name="tabler:sun" type="iconify" :size="25" />
          <SvgIcon v-else name="tabler:moon" type="iconify" :size="25" />
        </template>
      </t-sticky-item>
    </t-sticky-tool>
  </t-space>
</template>

<style scoped lang="scss">

</style>

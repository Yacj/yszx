import { ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'

/**
 * @description 创建一个倒计时功能
 * @returns {object} 包含倒计时时间和开始函数的对象
 */
export function useCountDown() {
  const count = ref(0)

  // resume - 继续，pause - 暂停， isActive - 是否执行中(isActive.value)
  const { resume, pause, isActive } = useIntervalFn(
    () => {
      count.value--
      if (count.value === 0) {
        pause()
      }
    },
    1000,
    { immediate: false },
  )

  const start = (startTime = 60) => {
    if (isActive.value) { return }
    // 因为初始值已经重置,所以继续执行,可以理解为 重新开始
    count.value = startTime
    resume()
  }

  // 页面要用到的数据，都返回
  return { count, resume, pause, isActive, start }
}

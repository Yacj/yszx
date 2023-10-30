import type { Ref } from 'vue'
import { ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'

interface CountdownHook {
  count: Ref<number>
  resume: () => void
  pause: () => void
  isActive: Ref<boolean>
  start: (startTime?: number) => void
}

/**
 * @description 用于实现倒计时功能的自定义 Hook。
 * @returns {object} 包含倒计时相关函数和状态的对象。
 * @property {number} count - 当前倒计时值。
 * @property {Function} resume - 恢复倒计时。
 * @property {Function} pause - 暂停倒计时。
 * @property {boolean} isActive - 指示倒计时是否处于活动状态。
 * @property {Function} start - 使用可选的初始值启动倒计时。
 *
 * @example
 * // 使用示例：
 * const { start, count, pause, resume, isActive } = useCountDown();
 * start(60); // 使用初始值 60 秒启动倒计时。
 * pause(); // 暂停倒计时。
 * resume(); // 恢复倒计时。
 */
export function useCountDown(): CountdownHook {
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
    if (isActive.value) {
      return
    }
    // 因为初始值已经重置,所以继续执行,可以理解为 重新开始
    count.value = startTime
    resume()
  }

  // 页面要用到的数据，都返回
  return { count, resume, pause, isActive, start }
}

import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
/**
 * @description 格式化日期
 * @param date 日期
 * @param format 格式
 * @returns {string} 格式化后的日期
 */
export function formatDay(date: string | number | Date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

/**
 * 返回日期的年月日时分秒
 * @param date - 要获取的日期
 * @returns {object} 包含年月日时分秒的对象
 */
export function getDateTime(date: Dayjs): {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
} {
  return {
    year: date.year(),
    month: date.month(),
    day: date.date(),
    hour: date.hour(),
    minute: date.minute(),
    second: date.second(),
  }
}

/**
 * @description 格式化相对日期，返回“今天”、“昨天”、“前天”或者具体日期。
 * @param {string} inputDate - 输入日期字符串，格式为YYYY-MM-DD。
 * @returns {string} - 返回相对日期或者具体日期的字符串。
 * @example
 * const inputDate = '2023-10-23';
 * const result = formatRelativeDate(inputDate);
 * console.log(result); // 输出 '今天'、'昨天'、'前天' 或者日期 '2023-10-23'
 */
export function formatRelativeDate(inputDate: string): string {
  const currentDate = dayjs()
  const targetDate = dayjs(inputDate)

  if (currentDate.isSame(targetDate, 'day')) {
    return '今天'
  }
  else if (currentDate.subtract(1, 'day').isSame(targetDate, 'day')) {
    return '昨天'
  }
  else if (currentDate.subtract(2, 'day').isSame(targetDate, 'day')) {
    return '前天'
  }
  else {
    return targetDate.format('YYYY-MM-DD')
  }
}

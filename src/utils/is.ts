/**
 * @description 判断是否是数组
 * @param val - 要检查的值
 * @returns {boolean} - true/false
 * @example
 * isArray([]) // true
 */
export function isArray(val: unknown): boolean {
  return Array.isArray(val)
}
/**
 * @description 判断是否是空数组
 * @param arr - 要检查的数组
 * @return {boolean} - true/false
 * @example
 * isEmptyArray([]) // true
 */
export const isEmptyArray = <T>(arr: T[]): boolean => Array.isArray(arr) && !arr.length

/**
 * @description 判断是否是基本数据类型
 * @param {unknown} val - 要检查的值
 * @returns {boolean} -   true/false
 * @example  isBasicType(1) // true
 */
export function isBasicType(val: unknown): boolean {
  const t = Object.prototype.toString.call(val)
  return t === '[object String]'
    || t === '[object Boolean]'
    || t === '[object Number]'
    || t === '[object Null]'
    || t === '[object Undefined]'
    || t === '[object Symbol]'
}

/**
 * @description 判断是否是空对象
 * @param {object} obj - 要检查的对象
 * @return {boolean} - true/false
 * @example
 * isEmptyObject({}) // true
 */
export function isObjectEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0
}

/**
 * @description 判断是否是开发环境
 * @return {boolean} - true/false
 */
export function isDev() {
  return import.meta.env.MODE === 'development'
}

/**
 * 检查字符串是否符合 URL 格式
 * @param url 要检查的字符串
 * @returns 如果是合法的 URL 返回 true，否则返回 false
 */
export function isUrl(url: string): boolean {
  return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(url)
}

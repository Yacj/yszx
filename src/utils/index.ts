import { isUrl } from '@/utils/is'
import baseUrl from '@/utils/url'

export function setPageTitle(titleText: string | unknown) {
  window.document.title = `${titleText ? ` ${titleText} - ` : ''}${import.meta.env.VITE_APP_TITLE}`
}

/**
 * @description 获取url参数
 * @param url - url地址
 * @return {Record<string, unknown>} url参数对象
 * @example
 * getQueryObject('http://localhost:3000/?name=123') // { name: '123' }
 */
export function getQueryObject(url?: string): Record<string, unknown> {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj: Record<string, unknown> = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2): string => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
/**
 * @description 获取assets下的图片
 * @param name - 图片名称 要带后缀
 * @return {string} 图片路径
 * @example
 * getAssetsImg('logo.png') // /assets/img/logo.png
 */
export function getAssetsImg(name: string) {
  const modules: any = import.meta.glob('../assets/img/*', { eager: true })
  const path = `../assets/img/${name}`
  return modules[path]?.default
}

/**
 * @description 生成uuid
 * @return {string} uuid
 * @example
 * uuid() // 6ccd780c-baba-1026-9564-5b8c656024db
 */
export function guid(): string {
  return 'xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c): string => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * @description 返回值的类型
 * @param {unknown} o - 要检查的值
 *  @return {unknown} 返回值的类型
 *  @example
 *  const value = 1
 *  returnType(value) // number
 */
export function returnType(o: unknown): unknown {
  if (Number.isNaN(o)) {
    return 'NaN'
  }
  return Object.prototype.toString.call(o).slice(8, -1)
}

/**
 * @description 返回数组中的最后一个元素
 * @param {T[]} array - 数组
 * @returns {T} 返回数组的最后一项
 * @example
 * arrayLast([1, 2, 3]) // 3
 */
export function arrayLast<T>(array: T[]): T | undefined {
  const length = array === null ? 0 : array.length
  return length ? array[length - 1] : undefined
}

/**
 * @description 捕捉promise错误
 * @param {Promise<T>} promise - promise对象
 * @param {object} errorExt - 额外的错误信息
 * @return {Promise<[U, undefined] | [null, T]>}
 * @example
 * const [err, res] = await awaitTo(promiseFn())
 * if (err) {
 *  console.log(err)
 *  return
 *  }
 *  console.log(res)
 */
export async function awaitTo<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt)
        return [parsedError, undefined]
      }
      return [err, undefined]
    })
}

/**
 * @description 判断密码强度
 * @param password - 密码
 * @return {0 | 1 | 2} 0: 弱密码，1: 中等密码，2: 强密码
 * @example
 * evaluatePasswordStrength('123456') // 0
 */
export function evaluatePasswordStrength(password: string): 0 | 1 | 2 {
  const minLength = 8
  const minCharacterVariety = 3 // 最小字符种类，如大小写字母、数字、特殊字符

  // 判断密码长度
  if (password.length < minLength) {
    return 0 // 弱密码
  }

  // 判断字符种类
  let characterVariety = 0
  if (/[a-z]/.test(password)) {
    characterVariety++
  }
  if (/[A-Z]/.test(password)) {
    characterVariety++
  }
  if (/\d/.test(password)) {
    characterVariety++
  }
  if (/[\W_]/.test(password)) {
    characterVariety++
  }

  if (characterVariety < minCharacterVariety) {
    return 1 // 中等密码
  }

  return 2 // 强密码
}
/**
 * 将浮点数四舍五入为整数。
 * @param {number} num - 输入的浮点数。
 * @returns {number} - 返回四舍五入后的整数。
 * @example
 * roundToInteger(1.5) // 2
 */
export function roundToInteger(num: number): number {
  // 使用 Math.round 方法将浮点数四舍五入为整数
  return Math.round(num)
}

/**
 * @description 处理url图片
 * @param url - url地址
 * @return {string}
 */
export function replaceUrlImage(url: string) {
  if (isUrl(url)) {
    return url
  }
  else {
    return `${baseUrl?.file}${url}`
  }
}

export function setPageTitle(titleText: string | unknown) {
  window.document.title = `${titleText ? ` ${titleText} - ` : ''}${import.meta.env.VITE_APP_TITLE}`
}

export function getImageUrl(name: string) {
  const path = new URL('@/assets/img/', import.meta.url)
  return `${path}/${name}`
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
 * @description 将promise的错误转换为数组
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
export function awaitTo<T, U = Error>(
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

/**
 * @description file转base64
 * @param {File} file - 文件
 * @param {Function} cb - 回调函数
 * @return {void} 返回转换后的base64
 * @example
 * const file = document.getElementById('file')
 * file.addEventListener('change', function () {
 *  getFileBase64(file.files[0], function (base64) {
 *  console.log(base64)
 *  })
 */
export function getFileBase64(file: File, cb: (base64: ArrayBuffer | string) => void): void {
  if (!file) {
    throw new Error('Error! no param "file"(getFileBase64()).')
  }

  const reader = new FileReader()
  reader.onload = function (e): void {
    if (e.target) {
      const base64 = e.target.result as ArrayBuffer | string

      if (cb) {
        cb(base64)
      }
    }
    else {
      console.error('FileReader target is null.')
    }
  }
  reader.onerror = function (): void {
    console.error('Read file fail.')
  }
  reader.readAsDataURL(file)
}

/**
 * @description base64转file
 * @param {String} urlData - base64
 * @param  {String} fileName - 文件名
 * @return {File} 返回转换后的文件
 * @example
 * const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'
 * const file = base64ToFile(base64, 'test.png')
 * console.log(file)
 */
export function base64ToFile(urlData: string, fileName: string) {
  const arr: any = urlData.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bytes = window.atob(arr[1])
  let n = bytes.length
  const ia = new Uint8Array(n)
  while (n--) {
    ia[n] = bytes.charCodeAt(n)
  }
  return new File([ia], fileName, { type: mime })
}
/**
 * @description 根据url地址下载
 * @param {string} url - url地址
 * @return {boolean} true - 下载成功，false - 下载失败
 * @example fileDownload('http://xxx.png')
 */
export const fileDownload = function (url: string): boolean {
  const isChrome = navigator.userAgent.toLowerCase().includes('chrome')
  const isSafari = navigator.userAgent.toLowerCase().includes('safari')
  if (isChrome || isSafari) {
    const link = document.createElement('a')
    link.href = url
    if (link.download !== undefined) {
      link.download = url.substring(url.lastIndexOf('/') + 1, url.length)
    }
    if (document.createEvent) {
      const e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }
  }
  if (!url.includes('?')) {
    url += '?download'
  }
  window.open(url, '_self')
  return true
}

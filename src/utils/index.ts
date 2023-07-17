export function setPageTitle(titleText: string | unknown) {
  window.document.title = `${titleText ? ` ${titleText} - ` : ''}${import.meta.env.VITE_APP_TITLE}`
}

export function getImageUrl(name: string) {
  const path = new URL('@/assets/img/', import.meta.url)
  return `${path}/${name}`
}

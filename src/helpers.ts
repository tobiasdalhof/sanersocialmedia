export function getOptionsURL(): string {
  return chrome.runtime.getURL('dist/options/index.html')
}

export function waitForElement(selector: string): Promise<HTMLElement> {
  return new Promise((resolve) => {
    if (document.querySelector(selector))
      return resolve(<HTMLElement>document.querySelector(selector)!)

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(<HTMLElement>document.querySelector(selector)!)
        observer.disconnect()
      }
    })

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    })
  })
}

export function findBackgroundColor(element: HTMLElement): string {
  const transparent = 'rgba(0, 0, 0, 0)'
  const color = window.getComputedStyle(element).backgroundColor
  if (color !== transparent) return color

  let parent = element.parentElement
  while (parent) {
    const parentColor = window.getComputedStyle(parent).backgroundColor
    if (parentColor !== transparent) return parentColor
    parent = parent.parentElement
  }

  const body = document.querySelector('body')!
  const bodyBgColor = window.getComputedStyle(body).backgroundColor
  if (bodyBgColor === transparent) return 'rgba(255, 255, 255, 1)'
  return bodyBgColor
}

export function mute(parent: HTMLElement) {
  parent.querySelectorAll<HTMLVideoElement | HTMLAudioElement>('video, audio').forEach((element) => {
    element.muted = true
    element.pause()
  })
}

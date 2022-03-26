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

export function findBackgroundColor(element: HTMLElement): string | undefined {
  const transparent = 'rgba(0, 0, 0, 0)'
  const color = window.getComputedStyle(element).backgroundColor
  if (color !== transparent) return color

  let parent = element.parentElement
  while (parent) {
    const parentColor = window.getComputedStyle(parent).backgroundColor
    if (parentColor !== transparent) return parentColor
    parent = parent.parentElement
  }

  return undefined
}

export function getOptionsURL(): string {
  return chrome.runtime.getURL('dist/options/index.html')
}

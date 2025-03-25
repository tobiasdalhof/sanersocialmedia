import Color from 'color'

export function onRouteChange(handler: () => void): void {
  function getCurrentPath() {
    return window.location.pathname
  }

  let previousPath = getCurrentPath()

  // Handle popstate events (browser back/forward)
  function handlePopState() {
    const currentPath = getCurrentPath()
    if (currentPath !== previousPath) {
      handler()
      previousPath = currentPath
    }
  }

  // Polling function to detect changes not caught by popstate
  function pollForChanges() {
    const currentPath = getCurrentPath()
    if (currentPath !== previousPath) {
      handler()
      previousPath = currentPath
    }
  }

  // Start listeners
  window.addEventListener('popstate', handlePopState)
  window.setInterval(pollForChanges, 100)
}

export function waitForElement(
  selector: string,
  options: {
    timeoutMs?: number
  } = {},
): Promise<HTMLElement | null> {
  const { timeoutMs = 1000 } = options

  return new Promise((resolve) => {
    let timeoutId: number

    // Check if the element already exists
    const element = document.querySelector(selector)
    if (element) {
      return resolve(element as HTMLElement)
    }

    const observer = new MutationObserver((mutations, obs) => {
      const element = document.querySelector(selector)
      if (element) {
        clearTimeout(timeoutId)
        obs.disconnect()
        resolve(element as HTMLElement)
      }
    })

    // Start observing the DOM
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
    })

    // Add timeout to resolve with null if the element isn't found
    timeoutId = window.setTimeout(() => {
      observer.disconnect()
      resolve(null)
    }, timeoutMs)
  })
}

export function hasDarkBackground(element: HTMLElement): boolean {
  try {
    const color = findBackgroundColor(element)
    const colorObj = Color(color)
    return colorObj.isDark()
  }
  catch {
    return false
  }
}

function findBackgroundColor(element: HTMLElement): string {
  const transparent = 'rgba(0, 0, 0, 0)'
  const color = window.getComputedStyle(element).backgroundColor
  if (color !== transparent)
    return color

  let parent = element.parentElement
  while (parent) {
    const parentColor = window.getComputedStyle(parent).backgroundColor
    if (parentColor !== transparent)
      return parentColor
    parent = parent.parentElement
  }

  const body = document.querySelector('body')!
  const bodyBgColor = window.getComputedStyle(body).backgroundColor
  if (bodyBgColor === transparent)
    return 'rgba(255, 255, 255, 1)'
  return bodyBgColor
}

export function mute(parent: HTMLElement) {
  parent.querySelectorAll<HTMLVideoElement | HTMLAudioElement>('video, audio').forEach((element) => {
    element.muted = true
    element.pause()
  })
}

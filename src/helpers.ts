export function waitForElement(selector: string, timeoutMs = 5000): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(selector))
      return resolve(<HTMLElement>document.querySelector(selector)!)

    const timeout = setTimeout(() => {
      reject(new Error('timeout'))
    }, timeoutMs)

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        clearTimeout(timeout)
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

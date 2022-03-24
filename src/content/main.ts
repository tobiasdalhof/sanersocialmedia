function waitForElement(selector: string): Promise<HTMLElement> {
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

function init() {
  waitForElement('#primary').then((element) => {
    console.log('found element', element)
    element.style.setProperty('display', 'none', 'important')

    const container = document.createElement('div')
    container.style.textAlign = 'center'
    container.style.paddingTop = '50px'

    const waldtal = document.createElement('img')
    waldtal.src = 'https://i.imgur.com/9So9LZ1.png'
    waldtal.width = 500

    const text = document.createElement('div')
    text.innerText = 'DIESE EMPFEHLUNGEN WURDEN GEBLOCKT VON: JEROME NEES!!!! PECH GEHABT SCHLAMPE XD'
    text.style.fontSize = '30px'
    text.style.fontWeight = 'bold'
    text.style.color = '#ff00d4'
    text.style.paddingTop = '50px'

    container.append(waldtal, text)
    element.after(container)
  })
}

init()
window.addEventListener('popstate', init)

// console.log('test', document.body)
// window.addEventListener('load', () => {
//   console.log('test', document.body)
//   waitForElement('ytd-browse').then((element) => {
//     element.style.setProperty('display', 'none', 'important')
//     console.log('found element', element)
//   })
// })

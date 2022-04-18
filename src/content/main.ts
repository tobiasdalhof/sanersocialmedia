import '../style/quote.scss'
import { SiteService } from '../services/SiteService'
import * as sites from '../sites'
import type { Store } from '../types'

let waitInit = false
async function init(url: URL) {
  if (waitInit)
    return
  waitInit = true
  const site = new SiteService().getSiteByUrl(Object.values(sites), url)
  if (!site)
    return

  const store = await chrome.storage.sync.get() as Store
  if (!store.userConfig)
    return

  site.runSiteActions(url, store.userConfig)
  waitInit = false
}

let currentUrl = new URL(window.location.href)
init(currentUrl)
setInterval(() => init(currentUrl), 1000)

const observer = new MutationObserver(() => {
  if (window.location.href !== currentUrl.href) {
    currentUrl = new URL(window.location.href)
    init(currentUrl)
  }
})
observer.observe(document, { subtree: true, childList: true })

chrome.storage.onChanged.addListener(async() => {
  init(currentUrl)
})

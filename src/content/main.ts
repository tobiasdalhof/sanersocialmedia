import '../style.scss'
import { SiteService } from '../services/SiteService'
import * as sites from '../sites'
import type { Store } from '../types'

async function init(url: URL) {
  const site = new SiteService().getSiteByUrl(Object.values(sites), url)
  if (!site) return

  const store = await chrome.storage.sync.get() as Store
  if (!store.userConfig) return

  site.runSiteActions(url, store.userConfig)
}

let currentUrl = new URL(window.location.href)
init(currentUrl)

const observer = new MutationObserver(() => {
  if (window.location.href !== currentUrl.href) {
    currentUrl = new URL(window.location.href)
    init(currentUrl)
  }
})
observer.observe(document, { subtree: true, childList: true })

chrome.storage.onChanged.addListener(async () => {
  const site = new SiteService().getSiteByUrl(Object.values(sites), currentUrl)
  if (!site) return
  site.removeInjectedElements()
  init(currentUrl)
})

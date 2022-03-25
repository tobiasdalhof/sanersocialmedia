import { SiteService } from '../services/SiteService'
import * as sites from '../sites'
import type { Store } from '../types'

const siteService = new SiteService()

async function init(url: URL) {
  const store: Store = await chrome.storage.sync.get() as Store

  const site = siteService.findSiteByURL(Object.values(sites), url)
  if (!site) return

  const actions = Object.values(site.actions)
  actions.forEach((action) => {
    if (siteService.checkAction(action, url, store.userSettings))
      siteService.manipulateDOM(action)
  })
}

let url = new URL(window.location.href)
init(url)

// detect url path changes for single page applications
setInterval(() => {
  const newURL = new URL(window.location.href)
  if (url.pathname !== newURL.pathname) {
    url = newURL
    init(newURL)
  }
}, 1000)

chrome.storage.onChanged.addListener(async () => {
  const site = siteService.findSiteByURL(Object.values(sites), url)
  if (!site) return

  const store: Store = await chrome.storage.sync.get() as Store

  const actions = Object.values(site.actions)
  actions.forEach((action) => {
    if (!siteService.checkAction(action, url, store.userSettings))
      siteService.revertManipulateDOM(action)
  })

  init(url)
})

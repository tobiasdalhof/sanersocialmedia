import type { Store } from '~/types'
import { getSiteByUrl } from '~/site'
import * as sites from '~/sites'
import { onRouteChange } from '~/utils'
import './styles.css'

let waitInit = false
async function init(url: URL) {
  if (waitInit) {
    return
  }

  waitInit = true
  const site = getSiteByUrl(Object.values(sites), url)
  if (!site) {
    return
  }

  const store = await chrome.storage.sync.get() as Store
  if (!store.userConfig) {
    return
  }

  await site.runSiteActions(url, store.userConfig)
  waitInit = false
}

init(new URL(window.location.href))
setInterval(() => init(new URL(window.location.href)), 1000)
onRouteChange(() => init(new URL(window.location.href)))
chrome.storage.onChanged.addListener(() => init(new URL(window.location.href)))

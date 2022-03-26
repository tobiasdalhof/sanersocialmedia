import { waitForElement } from '../helpers'
import type { Site, SiteAction, UserSettings } from '../types'
import { QuoteService } from './QuoteService'

export class SiteService {
  findSiteByURL(sites: Site[], url: URL) {
    return sites.find(site => this.isValidHost(site, url))
  }

  isValidHost(site: Site, url: URL): boolean {
    return site.validHosts.includes(url.host)
  }

  checkAction(action: SiteAction, url: URL, userSettings?: UserSettings): boolean {
    if (!userSettings) return false
    const enabled = userSettings[action.userSettingsKey] === true
    return enabled && action.validURL(url)
  }

  async manipulateDOM(action: SiteAction) {
    const quoteService = new QuoteService()
    const manipulations = action.manipulations.map((manipulation) => {
      return waitForElement(manipulation.selector).then((element) => {
        manipulation.update({ element, quoteService })
      })
    })
    await Promise.all(manipulations)
  }

  revertManipulateDOM(action: SiteAction) {
    const quoteService = new QuoteService()
    action.manipulations.forEach((manipulation) => {
      const element = <HTMLElement>document.querySelector(manipulation.selector)
      if (element) manipulation.revertUpdate({ element, quoteService })
    })
  }
}

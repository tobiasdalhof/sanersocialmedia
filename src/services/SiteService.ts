import { waitForElement } from '../helpers'
import type { Site, SiteAction, UserSettings } from '../types'

// interface SiteServiceParameters {
//   site: Site
//   url: URL
//   userSettings?: UserSettings
// }

// export class SiteService {
//   private site: Site
//   private url: URL
//   private userSettings?: UserSettings

//   constructor(parameters: SiteServiceParameters) {
//     this.site = parameters.site
//     this.url = parameters.url
//     this.userSettings = parameters.userSettings
//   }

//   isValidHost(): boolean {
//     return this.site.validHosts.includes(this.url.host)
//   }

//   isValidPath(action: SiteAction): boolean {
//     return action.validPaths.includes(this.url.pathname)
//   }

//   isEnabled(action: SiteAction): boolean {
//     if (!this.userSettings) return false
//     return this.userSettings[action.userSettingsKey] === true
//   }

//   async manipulate(action: SiteAction) {
//     const manipulations = action.manipulations.map((manipulation) => {
//       return waitForElement(manipulation.selector).then(manipulation.update)
//     })
//     await Promise.all(manipulations)
//     // inject quotes
//   }
// }

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
    const validPath = action.validPaths.includes(url.pathname)
    return enabled && validPath
  }

  async manipulateDOM(action: SiteAction) {
    const manipulations = action.manipulations.map((manipulation) => {
      return waitForElement(manipulation.selector).then(manipulation.update)
    })
    await Promise.all(manipulations)
    // inject quotes
  }

  revertManipulateDOM(action: SiteAction) {
    action.manipulations.forEach((manipulation) => {
      const element = <HTMLElement>document.querySelector(manipulation.selector)
      if (element) manipulation.revert(element)
    })
  }
}

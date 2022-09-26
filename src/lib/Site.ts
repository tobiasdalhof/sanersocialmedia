import type { UserConfig } from '../types'
import type SiteAction from './SiteAction'

interface SiteParams {
  name: string
  logoSvg: string
  validateUrl(url: URL): boolean
  siteActions: SiteAction[]
}

export default class Site {
  public params: SiteParams

  constructor(params: SiteParams) {
    this.params = params
  }

  isValidUrl(url: URL): boolean {
    return this.params.validateUrl(url)
  }

  runSiteActions(url: URL, userConfig: UserConfig) {
    for (const siteAction of this.params.siteActions) {
      siteAction.setUserConfig(userConfig)
      if (!siteAction.canRun(url)) {
        siteAction.removeInjectedElements()
        continue
      }

      siteAction.injectCss()
      siteAction.manipulateDom()
    }
  }
}

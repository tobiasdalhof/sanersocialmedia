import type { UserConfig } from '../types'
import type SiteAction from './SiteAction'

interface SiteParams {
  name: string
  logoSvg: string
  validateUrl(url: URL): boolean
  siteActions: SiteAction[]
  afterRunSiteActions?(params: CustomizeBehaviourParams): void
}

interface CustomizeBehaviourParams {
  site: Site
  userConfig: UserConfig
  url: URL
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
      if (!siteAction.canRun(url, userConfig)) continue
      siteAction.injectCss()
      siteAction.manipulateDom()
    }
  }

  removeInjectedElements() {
    this.params.siteActions.forEach(siteAction => siteAction.removeInjectedElements())
  }
}

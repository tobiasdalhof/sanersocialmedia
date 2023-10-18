import { paramCase } from 'change-case'
import type { UserConfig, UserConfigKey } from './types'
import { hasDarkBackground } from './utils'
import WidgetService, { WidgetDataAttribute } from './services/WidgetService'

interface SiteParams {
  name: string
  logoSvg: string
  validateUrl(url: URL): boolean
  siteActions: SiteAction[]
}

export class Site {
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

interface SiteActionParams {
  name: string
  validateUrl(url: URL): boolean
  requiredUserConfigKey: UserConfigKey
  injectCss: string
  manipulateDom(params: { siteAction: SiteAction }): void
}

export class SiteAction {
  public params: SiteActionParams
  private id: string
  private readonly idDataAttribute = 'data-site-action-id'
  private userConfig?: UserConfig

  constructor(params: SiteActionParams) {
    this.params = params
    this.id = paramCase(params.name)
  }

  setUserConfig(userConfig?: UserConfig) {
    this.userConfig = userConfig
  }

  canRun(url: URL): boolean {
    if (!this.userConfig)
      return false

    if (!this.userConfig[this.params.requiredUserConfigKey])
      return false

    return this.params.validateUrl(url)
  }

  injectCss(): HTMLStyleElement {
    const foundStyle = <HTMLStyleElement>document.querySelector(`style[${this.idDataAttribute}=${this.id}]`)
    if (foundStyle)
      return foundStyle

    const style = document.createElement('style')
    style.appendChild(document.createTextNode(this.params.injectCss))
    style.setAttribute(this.idDataAttribute, this.id)
    document.querySelector('head')!.appendChild(style)

    return style
  }

  manipulateDom() {
    return this.params.manipulateDom({ siteAction: this })
  }

  removeInjectedElements() {
    const elements = document.querySelectorAll(`[${this.idDataAttribute}="${this.id}"]`)
    elements.forEach(element => element.remove())
  }

  findWidget(parent: HTMLElement): HTMLElement | null {
    if (parent.parentElement) {
      return parent.parentElement
        .querySelector(`[${this.idDataAttribute}=${this.id}][${WidgetDataAttribute.Container}]`)
    }

    return null
  }

  hideOptionsLink(): boolean {
    return this.userConfig ? this.userConfig.HideOptionsLink === true : false
  }

  createWidget(parent: HTMLElement): HTMLElement | undefined {
    const foundWidget = this.findWidget(parent)
    if (foundWidget) {
      if (this.hideOptionsLink())
        foundWidget.setAttribute(WidgetDataAttribute.HideOptionsLink, '')
      else
        foundWidget.removeAttribute(WidgetDataAttribute.HideOptionsLink)

      // widget already exists
      return undefined
    }

    const isDark = hasDarkBackground(parent)
    const widget = new WidgetService().createWidget({ isDark })
    widget.setAttribute(this.idDataAttribute, this.id)
    if (this.hideOptionsLink())
      widget.setAttribute(WidgetDataAttribute.HideOptionsLink, '')

    return widget
  }
}

export function getSiteByUrl(sites: Site[], url: URL) {
  return sites.find(site => site.isValidUrl(url))
}

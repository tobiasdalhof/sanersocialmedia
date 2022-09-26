import { paramCase } from 'change-case'
import Color from 'color'
import { findBackgroundColor } from '../helpers'
import WidgetService, { QuoteWidgetDataAttribute } from '../services/WidgetService'
import type { UserConfig, UserConfigKey } from '../types'

interface SiteActionParams {
  name: string
  validateUrl(url: URL): boolean
  requiredUserConfigKey: UserConfigKey
  injectCss: string
  manipulateDom(params: ManipulateDomParams): void
}

interface ManipulateDomParams {
  siteAction: SiteAction
}

export default class SiteAction {
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

  findQuoteWidget(parent: HTMLElement): HTMLElement | null {
    if (parent.parentElement) {
      return parent.parentElement
        .querySelector(`[${this.idDataAttribute}=${this.id}][${QuoteWidgetDataAttribute.Container}]`)
    }

    return null
  }

  createQuoteWidget(parent: HTMLElement): HTMLElement | undefined {
    const hideOptionsLink = this.userConfig ? this.userConfig.HideQuoteWidgetOptionsLink === true : false

    const widget = this.findQuoteWidget(parent)
    if (widget) {
      if (hideOptionsLink)
        widget.setAttribute(QuoteWidgetDataAttribute.HideOptionsLink, '')
      else
        widget.removeAttribute(QuoteWidgetDataAttribute.HideOptionsLink)

      return undefined
    }

    try {
      const bgColor = new Color(findBackgroundColor(parent))
      const isDark = bgColor.isDark()
      const widget = new WidgetService().createQuoteWidget({ isDark })
      widget.setAttribute(this.idDataAttribute, this.id)
      if (hideOptionsLink)
        widget.setAttribute(QuoteWidgetDataAttribute.Container, '')

      return widget
    }
    catch {
      return undefined
    }
  }
}

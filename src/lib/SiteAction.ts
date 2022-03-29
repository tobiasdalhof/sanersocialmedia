import { paramCase } from 'change-case'
import Color from 'color'
import { findBackgroundColor } from '../helpers'
import ElementService, { QuoteElementDataAttribute } from '../services/ElementService'
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

  constructor(params: SiteActionParams) {
    this.params = params
    this.id = paramCase(params.name)
  }

  canRun(url: URL, userConfig: UserConfig): boolean {
    if (!userConfig[this.params.requiredUserConfigKey]) return false
    return this.params.validateUrl(url)
  }

  injectCss(): HTMLStyleElement {
    const foundStyle = <HTMLStyleElement>document.querySelector(`style[${this.idDataAttribute}=${this.id}]`)
    if (foundStyle) return foundStyle

    const style = new ElementService().createStyleElement(this.params.injectCss)
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

  quoteElementExists(parent: HTMLElement): boolean {
    return !!<HTMLElement>parent.parentElement?.querySelector(`[${this.idDataAttribute}=${this.id}][${QuoteElementDataAttribute.Container}]`)
  }

  createQuoteElement(parent: HTMLElement): HTMLElement | undefined {
    if (this.quoteElementExists(parent))
      return undefined

    try {
      const bgColor = new Color(findBackgroundColor(parent))
      const isDark = bgColor.isDark()
      const quote = new ElementService().createQuoteElement(isDark)
      quote.setAttribute(this.idDataAttribute, this.id)
      return quote
    }
    catch {
      return undefined
    }
  }
}

import logo from 'super-tiny-icons/images/svg/twitter.svg'
import { QuoteService } from '../services/QuoteService'
import type { Site } from '../types'
import { UserSettingsKey } from '../types'

const twitter: Site = {
  logo,
  name: 'twitter',
  validHosts: ['twitter.com', 'www.twitter.com'],
  actions: {
    hideHomePageFeed: {
      name: 'Hide feed on home page',
      validURL: (url) => {
        return ['/', '/home'].includes(url.pathname)
      },
      userSettingsKey: UserSettingsKey.TwitterHideVideoPageSidebarRelated,
      manipulations: [
        {
          selector: '[data-testid="primaryColumn"] > div:last-child > div:nth-child(4)',
          update: (element) => {
            element.style.setProperty('display', 'none', 'important')
            const quote = new QuoteService().injectRandomQuote(element)
            quote.style.padding = '40px'
          },
          revertUpdate: (element) => {
            element.style.removeProperty('display')
          },
        },
      ],
    },
    hideSidebar: {
      name: 'Hide sidebar trends and suggestions',
      validURL: () => true,
      userSettingsKey: UserSettingsKey.TwitterHideSidebar,
      manipulations: [
        {
          selector: '[data-testid="sidebarColumn"] section',
          update: (element) => {
            element.style.setProperty('display', 'none', 'important')
            const quote = new QuoteService().injectRandomQuote(element)
            quote.style.padding = '20px'
          },
          revertUpdate: (element) => {
            element.style.removeProperty('display')
          },
        },
        {
          selector: '[data-testid="sidebarColumn"] aside',
          update: (element) => {
            element.style.setProperty('display', 'none', 'important')
            const quote = new QuoteService().injectRandomQuote(element)
            quote.style.padding = '20px'
          },
          revertUpdate: (element) => {
            element.style.removeProperty('display')
          },
        },
      ],
    },
  },
}

export default twitter

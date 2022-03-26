import logo from 'super-tiny-icons/images/svg/linkedin.svg'
import type { Site } from '../types'
import { UserSettingsKey } from '../types'

const twitter: Site = {
  logo,
  name: 'LinkedIn',
  validHosts: ['linkedin.com', 'www.linkedin.com'],
  actions: {
    hideHomePageFeed: {
      name: 'Hide feed on home page',
      validURL: (url) => {
        return url.pathname.includes('feed')
      },
      userSettingsKey: UserSettingsKey.LinkedInHideHomePageFeed,
      manipulations: [
        {
          selector: 'main.scaffold-layout__main > div:last-child',
          update: ({ element, quoteService }) => {
            element.style.setProperty('display', 'none', 'important')
            const quote = quoteService.injectRandomQuote(element)
            quote.style.paddingTop = '10px'
          },
          revertUpdate: ({ element }) => {
            element.style.removeProperty('display')
          },
        },
      ],
    },
    hideTrendingNewsSidebar: {
      name: 'Hide trending news in sidebar',
      validURL: () => true,
      userSettingsKey: UserSettingsKey.LinkedInHideTrendingNewsSidebar,
      manipulations: [
        {
          selector: 'aside.scaffold-layout__aside .news-module',
          update: ({ element, quoteService }) => {
            element.style.setProperty('display', 'none', 'important')
            const quote = quoteService.injectRandomQuote(element)
            quote.style.padding = '20px'
          },
          revertUpdate: ({ element }) => {
            element.style.removeProperty('display')
          },
        },
      ],
    },
  },
}

export default twitter

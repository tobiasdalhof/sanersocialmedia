import logo from 'super-tiny-icons/images/svg/github.svg'
import type { Site } from '../types'
import { UserSettingsKey } from '../types'

const github: Site = {
  logo,
  name: 'GitHub',
  validHost: url => url.host.includes('github.com'),
  actions: {
    hideHomePageFeed: {
      name: 'Hide feed on home page',
      validURL: url => ['/'].includes(url.pathname),
      userSettingsKey: UserSettingsKey.GitHubHideHomePageFeed,
      manipulations: [
        {
          selector: '#dashboard',
          update: ({ element, quoteService }) => {
            element.style.setProperty('display', 'none', 'important')
            quoteService.injectRandomQuote(element)
          },
          revertUpdate: ({ element }) => {
            element.style.removeProperty('display')
          },
        },
        {
          selector: '[aria-label="Explore"]',
          update: ({ element }) => {
            element.style.setProperty('display', 'none', 'important')
          },
          revertUpdate: ({ element }) => {
            element.style.removeProperty('display')
          },
        },
      ],
    },
  },
}

export default github

import logo from 'super-tiny-icons/images/svg/youtube.svg'
import type { Site } from '../types'
import { UserSettingsKey } from '../types'

const youtube: Site = {
  logo,
  name: 'YouTube',
  validHost: url => url.host.includes('youtube.com'),
  actions: {
    hideHomePageFeed: {
      name: 'Hide feed on home page',
      validURL: url => ['/'].includes(url.pathname),
      userSettingsKey: UserSettingsKey.YouTubeHideHomePageFeed,
      manipulations: [
        {
          selector: 'ytd-rich-grid-renderer',
          update: ({ element, quoteService }) => {
            element.style.setProperty('display', 'none', 'important')
            const quote = quoteService.injectRandomQuote(element)
            quote.style.padding = '40px'
          },
          revertUpdate: ({ element }) => {
            element.style.removeProperty('display')
          },
        },
      ],
    },
    hideVideoPageComments: {
      name: 'Hide comments on video page',
      validURL: url => ['/watch'].includes(url.pathname),
      userSettingsKey: UserSettingsKey.YouTubeHideVideoPageComments,
      manipulations: [
        {
          selector: '#primary #comments #contents',
          update: ({ element, quoteService }) => {
            element.style.setProperty('opacity', '0', 'important')
            element.style.setProperty('height', '0px', 'important')
            element.style.setProperty('overflow', 'hidden', 'important')
            const quote = quoteService.injectRandomQuote(element)
            quote.style.paddingBottom = '40px'
          },
          revertUpdate: ({ element }) => {
            element.style.removeProperty('opacity')
            element.style.removeProperty('height')
            element.style.removeProperty('overflow')
          },
        },
      ],
    },
    hideVideoPageSidebarRelated: {
      name: 'Hide related videos in sidebar on video page',
      validURL: url => ['/watch'].includes(url.pathname),
      userSettingsKey: UserSettingsKey.YouTubeHideVideoPageSidebarRelated,
      manipulations: [
        {
          selector: '#secondary #related',
          update: ({ element, quoteService }) => {
            element.style.setProperty('display', 'none', 'important')
            quoteService.injectRandomQuote(element)
          },
          revertUpdate: ({ element }) => {
            element.style.removeProperty('display')
          },
        },
      ],
    },
  },
}

export default youtube

import logo from 'super-tiny-icons/images/svg/youtube.svg'
import type { Site } from '../types'
import { UserSettingsKey } from '../types'

const youtube: Site = {
  logo,
  name: 'YouTube',
  validHosts: ['youtube.com', 'www.youtube.com'],
  actions: {
    hideHomePageFeed: {
      name: 'Hide feed on home page',
      validPaths: ['/'],
      userSettingsKey: UserSettingsKey.YouTubeHideHomePageFeed,
      manipulations: [
        {
          selector: 'ytd-rich-grid-renderer',
          update: (element) => {
            element.style.setProperty('display', 'none', 'important')
          },
          revert: (element) => {
            element.style.removeProperty('display')
          },
        },
      ],
    },
    hideVideoPageComments: {
      name: 'Hide comments on video page',
      validPaths: ['/watch'],
      userSettingsKey: UserSettingsKey.YouTubeHideVideoPageComments,
      manipulations: [
        {
          selector: '#primary #comments #contents',
          update: (element) => {
            element.style.setProperty('opacity', '0', 'important')
            element.style.setProperty('height', '0px', 'important')
            element.style.setProperty('overflow', 'hidden', 'important')
          },
          revert: (element) => {
            element.style.removeProperty('opacity')
            element.style.removeProperty('height')
            element.style.removeProperty('overflow')
          },
        },
      ],
    },
    hideVideoPageSidebarRelated: {
      name: 'Hide related videos in sidebar on video page',
      validPaths: ['/watch'],
      userSettingsKey: UserSettingsKey.YouTubeHideVideoPageSidebarRelated,
      manipulations: [
        {
          selector: '#secondary #related',
          update: (element) => {
            element.style.setProperty('display', 'none', 'important')
          },
          revert: (element) => {
            element.style.removeProperty('display')
          },
        },
      ],
    },
  },
}

export default youtube

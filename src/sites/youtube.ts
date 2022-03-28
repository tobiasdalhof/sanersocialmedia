import logoSvg from 'super-tiny-icons/images/svg/youtube.svg'
import { waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
import { UserConfigKey } from '../types'

const youtube = new Site({
  logoSvg,
  name: 'YouTube',
  validateUrl: url => url.host.includes('youtube.com'),
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.GitHubHideHomePageFeed,
      injectCss: `
        ytd-rich-grid-renderer {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('ytd-rich-grid-renderer')
        const quote = siteAction.createQuoteElement(container)
        quote.style.padding = '40px'
        container.after(quote)
      },
    }),
    new SiteAction({
      name: 'Hide comments on video page',
      validateUrl: url => ['/watch'].includes(url.pathname),
      requiredUserConfigKey: UserConfigKey.YouTubeHideVideoPageComments,
      injectCss: `
        #primary #comments #contents {
          opacity: 0!important;
          height: 0px!important;
          overflow: hidden!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('#primary #comments #contents')
        const quote = siteAction.createQuoteElement(container)
        quote.style.paddingBottom = '40px'
        container.after(quote)
      },
    }),
    new SiteAction({
      name: 'Hide related videos in sidebar on video page',
      validateUrl: url => ['/watch'].includes(url.pathname),
      requiredUserConfigKey: UserConfigKey.YouTubeHideVideoPageSidebarRelated,
      injectCss: `
        #secondary #related {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('#secondary #related')
        const quote = siteAction.createQuoteElement(container)
        quote.style.paddingBottom = '40px'
        container.after(quote)
      },
    }),
  ],
  afterRunSiteActions: ({ site, url, userConfig }) => {
    waitForElement('#logo').then((element) => {
      element.addEventListener('click', () => {
        setTimeout(() => site.runSiteActions(url, userConfig), 2000)
      })
    })
    waitForElement('#endpoint').then((element) => {
      element.addEventListener('click', () => {
        setTimeout(() => site.runSiteActions(url, userConfig), 2000)
      })
    })
  },
})

export default youtube

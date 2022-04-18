import logoSvg from 'super-tiny-icons/images/svg/youtube.svg'
import { mute, waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
import { UserConfigKey } from '../types'

const youtube = new Site({
  logoSvg,
  name: 'YouTube',
  validateUrl: url => url.host.replace('www.', '') === 'youtube.com',
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.YouTubeHideHomeFeed,
      injectCss: `
        ytd-browse #primary {
          display: none!important;
        }
      `,
      manipulateDom: async({ siteAction }) => {
        const container = await waitForElement('ytd-browse #primary')
        mute(container)
        const quote = siteAction.createQuoteElement(container)
        if (!quote)
          return
        quote.style.padding = '40px'
        container.after(quote)
      },
    }),
    new SiteAction({
      name: 'Hide related videos in sidebar on video page',
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.YouTubeHideVideoSidebarRelated,
      injectCss: `
        #secondary #related {
          display: none!important;
        }
      `,
      manipulateDom: async({ siteAction }) => {
        const container = await waitForElement('#secondary #related')
        const quote = siteAction.createQuoteElement(container)
        if (!quote)
          return
        quote.style.paddingBottom = '40px'
        container.after(quote)
      },
    }),
    new SiteAction({
      name: 'Hide comments on video page',
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.YouTubeHideVideoComments,
      injectCss: `
        #comments #contents {
          opacity: 0!important;
          height: 0px!important;
          overflow: hidden!important;
        }
      `,
      manipulateDom: async({ siteAction }) => {
        const container = await waitForElement('#comments #contents')
        const quote = siteAction.createQuoteElement(container)
        if (!quote)
          return
        quote.style.paddingBottom = '40px'
        container.after(quote)
      },
    }),
  ],
})

export default youtube

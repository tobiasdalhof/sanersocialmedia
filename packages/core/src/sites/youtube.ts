import logoSvg from 'super-tiny-icons/images/svg/youtube.svg'
import { mute, waitForElement } from '../utils'
import { Site, SiteAction } from '../site'
import { UserConfigKey } from '../types'

const youtube = new Site({
  logoSvg,
  name: 'YouTube',
  validateUrl: url => url.host.replace('www.', '') === 'youtube.com',
  siteActions: [
    new SiteAction({
      name: chrome.i18n.getMessage('blockHomeFeed'),
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.YouTubeHomeFeed,
      injectCss: `
        ytd-browse #primary {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('ytd-browse #primary')
        mute(container)
        const quote = siteAction.createQuoteWidget(container)
        if (!quote)
          return
        quote.style.padding = '40px'
        container.after(quote)
      },
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockSidebarVideoSuggestions'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.YouTubeVideoSidebarSuggestions,
      injectCss: `
        #secondary #related {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('#secondary #related')
        const quote = siteAction.createQuoteWidget(container)
        if (!quote)
          return
        quote.style.paddingBottom = '40px'
        container.after(quote)
      },
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockVideoComments'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.YouTubeVideoComments,
      injectCss: `
        #comments #contents {
          opacity: 0!important;
          height: 0px!important;
          overflow: hidden!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('#comments #contents')
        const quote = siteAction.createQuoteWidget(container)
        if (!quote)
          return
        quote.style.paddingBottom = '40px'
        container.after(quote)
      },
    }),
  ],
})

export default youtube

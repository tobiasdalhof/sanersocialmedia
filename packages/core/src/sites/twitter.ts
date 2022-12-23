import logoSvg from 'super-tiny-icons/images/svg/twitter.svg'
import { mute, waitForElement } from '../utils'
import { Site, SiteAction } from '../site'
import { UserConfigKey } from '../types'

const twitter = new Site({
  logoSvg,
  name: 'Twitter',
  validateUrl: url => url.host.replace('www.', '') === 'twitter.com',
  siteActions: [
    new SiteAction({
      name: chrome.i18n.getMessage('blockHomeFeed'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.TwitterHomeFeed,
      injectCss: `
        [data-testid="primaryColumn"] > div:last-child > div:nth-child(5) {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-testid="primaryColumn"] > div:last-child > div:nth-child(5)')
        mute(container)
        const quote = siteAction.createQuoteWidget(container)
        if (!quote)
          return
        quote.style.padding = '40px'
        container.after(quote)
      },
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockSidebarTrends'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.TwitterSidebarTrends,
      injectCss: `
        [data-testid="sidebarColumn"] section {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-testid="sidebarColumn"] section')
        const quote = siteAction.createQuoteWidget(container)
        if (!quote)
          return
        quote.style.padding = '20px'
        container.after(quote)
      },
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockSidebarFollowSuggestions'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.TwitterSidebarFollowSuggestions,
      injectCss: `
        [data-testid="sidebarColumn"] aside {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-testid="sidebarColumn"] aside')
        const quote = siteAction.createQuoteWidget(container)
        if (!quote)
          return
        quote.style.padding = '20px'
        container.after(quote)
      },
    }),
  ],
})

export default twitter

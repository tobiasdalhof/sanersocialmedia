import logoSvg from 'super-tiny-icons/images/svg/twitter.svg'
import { mute, waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
import { UserConfigKey } from '../types'

const twitter = new Site({
  logoSvg,
  name: 'Twitter',
  validateUrl: url => url.host.replace('www.', '') === 'twitter.com',
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: url => ['/', '/home'].includes(url.pathname),
      requiredUserConfigKey: UserConfigKey.TwitterHideHomeFeed,
      injectCss: `
        [data-testid="primaryColumn"] > div:last-child > div:nth-child(4) {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-testid="primaryColumn"] > div:last-child > div:nth-child(4)')
        mute(container)
        const quote = siteAction.createQuoteElement(container)
        if (!quote) return
        quote.style.padding = '40px'
        container.after(quote)
      },
    }),
    new SiteAction({
      name: 'Hide trends in sidebar',
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.TwitterHideSidebarTrends,
      injectCss: `
        [data-testid="sidebarColumn"] section {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-testid="sidebarColumn"] section')
        const quote = siteAction.createQuoteElement(container)
        if (!quote) return
        quote.style.padding = '20px'
        container.after(quote)
      },
    }),
    new SiteAction({
      name: 'Hide follow suggestions in sidebar',
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.TwitterHideSidebarFollowSuggestions,
      injectCss: `
        [data-testid="sidebarColumn"] aside {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-testid="sidebarColumn"] aside')
        const quote = siteAction.createQuoteElement(container)
        if (!quote) return
        quote.style.padding = '20px'
        container.after(quote)
      },
    }),
  ],
})

export default twitter

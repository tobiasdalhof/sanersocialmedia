import logoSvg from 'super-tiny-icons/images/svg/twitter.svg'
import { waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
import { UserConfigKey } from '../types'

const twitter = new Site({
  logoSvg,
  name: 'Twitter',
  validateUrl: url => url.host.includes('twitter.com'),
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
        const quote = siteAction.createQuoteElement(container)
        quote.style.padding = '40px'
        container.after(quote)
      },
    }),
    new SiteAction({
      name: 'Hide sidebar trends and suggestions',
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.TwitterHideSidebar,
      injectCss: `
        [data-testid="sidebarColumn"] section,
        [data-testid="sidebarColumn"] aside {
          display: none!important;
        }
      `,
      manipulateDom: ({ siteAction }) => {
        waitForElement('[data-testid="sidebarColumn"] section').then((element) => {
          const quote = siteAction.createQuoteElement(element)
          quote.style.padding = '20px'
          element.after(quote)
        })
        waitForElement('[data-testid="sidebarColumn"] aside').then((element) => {
          const quote = siteAction.createQuoteElement(element)
          quote.style.padding = '20px'
          element.after(quote)
        })
      },
    }),
  ],
})

export default twitter

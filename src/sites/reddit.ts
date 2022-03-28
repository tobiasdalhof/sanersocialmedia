import logoSvg from 'super-tiny-icons/images/svg/reddit.svg'
import { waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
import { UserConfigKey } from '../types'

const reddit = new Site({
  logoSvg,
  name: 'Reddit',
  validateUrl: url => url.host.includes('reddit.com'),
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.RedditHideHomePageFeed,
      injectCss: `
        .scrollerItem,
        .ListingLayout-outerContainer div div div div:nth-of-type(2) {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('.ListingLayout-outerContainer div div div div:nth-of-type(2)')
        setTimeout(() => {
          const quote = siteAction.createQuoteElement(container)
          if (!quote) return
          container.after(quote)
        }, 1000)
      },
    }),
  ],
})

export default reddit

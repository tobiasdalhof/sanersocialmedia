import logoSvg from 'super-tiny-icons/images/svg/tiktok.svg'
import { waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
import { UserConfigKey } from '../types'

const tiktok = new Site({
  logoSvg,
  name: 'TikTok',
  validateUrl: url => url.host.includes('tiktok.com'),
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.TikTokHideHomePageFeed,
      injectCss: `
        [data-e2e="recommend-list-item-container"] {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-e2e="recommend-list-item-container"]')
        setTimeout(() => {
          const quote = siteAction.createQuoteElement(container)
          if (!quote) return
          container.before(quote)
        }, 1000)
      },
    }),
  ],
})

export default tiktok

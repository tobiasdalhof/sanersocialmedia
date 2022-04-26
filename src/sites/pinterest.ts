import logoSvg from 'super-tiny-icons/images/svg/pinterest.svg'
import { mute, waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
import { UserConfigKey } from '../types'

const pinterest = new Site({
  logoSvg,
  name: 'Pinterest',
  validateUrl: url => url.host.replace('www.', '').includes('pinterest.'),
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.PinterestHideHomeFeed,
      injectCss: `
        [data-test-id="homefeed-feed"] {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-test-id="homefeed-feed"]')
        mute(container)
        setTimeout(() => {
          const quote = siteAction.createQuoteElement(container)
          if (!quote)
            return
          quote.style.padding = '24px'
          container.after(quote)
        }, 1000)
      },
    }),
    new SiteAction({
      name: 'Hide related pins',
      validateUrl: url => url.pathname.includes('/pin/'),
      requiredUserConfigKey: UserConfigKey.PinterestHideRelatedPins,
      injectCss: `
        [data-test-id="relatedPins"] {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-test-id="relatedPins"]')
        mute(container)
        setTimeout(() => {
          const quote = siteAction.createQuoteElement(container)
          if (!quote)
            return
          quote.style.padding = '24px'
          container.after(quote)
        }, 1000)
      },
    }),
  ],
})

export default pinterest

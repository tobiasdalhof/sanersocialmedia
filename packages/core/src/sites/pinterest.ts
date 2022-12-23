import logoSvg from 'super-tiny-icons/images/svg/pinterest.svg'
import { mute, waitForElement } from '../utils'
import { Site, SiteAction } from '../site'
import { UserConfigKey } from '../types'

const pinterest = new Site({
  logoSvg,
  name: 'Pinterest',
  validateUrl: url => url.host.replace('www.', '').includes('pinterest.'),
  siteActions: [
    new SiteAction({
      name: chrome.i18n.getMessage('blockHomeFeed'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.PinterestHomeFeed,
      injectCss: `
        [data-test-id="homefeed-feed"] {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-test-id="homefeed-feed"]')
        mute(container)
        setTimeout(() => {
          const quote = siteAction.createQuoteWidget(container)
          if (!quote)
            return
          quote.style.padding = '24px'
          container.after(quote)
        }, 1000)
      },
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockRelatedPins'),
      validateUrl: url => url.pathname.includes('/pin/'),
      requiredUserConfigKey: UserConfigKey.PinterestRelatedPins,
      injectCss: `
        [data-test-id="relatedPins"] {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-test-id="relatedPins"]')
        mute(container)
        setTimeout(() => {
          const quote = siteAction.createQuoteWidget(container)
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

import logoSvg from 'super-tiny-icons/images/svg/tiktok.svg'
import { mute, waitForElement } from '../utils'
import { Site, SiteAction } from '../site'
import { UserConfigKey } from '../types'

const tiktok = new Site({
  logoSvg,
  name: 'TikTok',
  validateUrl: url => url.host.replace('www.', '') === 'tiktok.com',
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.TikTokHideHomeFeed,
      injectCss: `
        [data-e2e="recommend-list-item-container"] {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-e2e="recommend-list-item-container"]')
        mute(container)
        setTimeout(() => {
          const quote = siteAction.createQuoteWidget(container)
          if (!quote)
            return
          container.before(quote)
        }, 1000)
      },
    }),
  ],
})

export default tiktok

import logoSvg from 'super-tiny-icons/images/svg/tiktok.svg'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'
import { mute, waitForElement } from '~/utils'

const tiktok = new Site({
  logoSvg,
  name: 'TikTok',
  validateUrl: url => url.host.replace('www.', '') === 'tiktok.com',
  siteActions: [
    new SiteAction({
      name: chrome.i18n.getMessage('blockHomeFeed'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.TikTokHomeFeed,
      injectCss: `
        [data-e2e="recommend-list-item-container"] {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-e2e="recommend-list-item-container"]')
        mute(container)
        setTimeout(() => {
          const widget = siteAction.createWidget(container)
          if (!widget)
            return
          container.before(widget)
        }, 1000)
      },
    }),
  ],
})

export default tiktok

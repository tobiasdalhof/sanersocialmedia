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

      manipulateDom: ({ siteAction }) => waitForElement('[data-e2e="recommend-list-item-container"]').then((container) => {
        if (!container) {
          return
        }
        mute(container)
        const widget = siteAction.createWidget(container)
        if (widget) {
          widget.style.padding = '40px'
          container.before(widget)
        }
      }),
    }),
  ],
})

export default tiktok

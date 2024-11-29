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

    new SiteAction({
      name: chrome.i18n.getMessage('blockVideoComments'),
      validateUrl: url => url.pathname.includes('/video/'),
      requiredUserConfigKey: UserConfigKey.TikTokVideoComments,
      injectCss: `
        .css-1ngaos4-DivCommentMain,
        .css-13wx63w-DivCommentObjectWrapper {
          display: none!important;
        }
      `,
      manipulateDom: ({ siteAction }) => Promise.any([
        waitForElement('.css-1ngaos4-DivCommentMain'),
        waitForElement('.css-7whb78-DivCommentListContainer'),
      ]).then((container) => {
        if (!container) {
          return
        }

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        widget.style.paddingTop = '20px'
        container.before(widget)
      }),
    }),
  ],
})

export default tiktok

import logoSvg from 'super-tiny-icons/images/svg/pinterest.svg'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'
import { mute, waitForElement } from '~/utils'

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
      manipulateDom: ({ siteAction }) => waitForElement('[data-test-id="homefeed-feed"]').then((container) => {
        if (!container) {
          return
        }
        mute(container)

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        widget.style.padding = '24px'
        container.after(widget)
      }),
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
      manipulateDom: ({ siteAction }) => waitForElement('[data-test-id="relatedPins"]').then((container) => {
        if (!container) {
          return
        }
        mute(container)

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        widget.style.padding = '24px'
        container.after(widget)
      }),
    }),
  ],
})

export default pinterest

import logoSvg from 'super-tiny-icons/images/svg/facebook.svg'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'
import { mute, waitForElement } from '~/utils'

const selectors = 'div[role="feed"], #ssrb_feed_start + div, .x1hc1fzr.x1unhpq9.x6o7n8i'

const facebook = new Site({
  logoSvg,
  name: 'Facebook',
  validateUrl: url => url.host.replace('www.', '') === 'facebook.com',
  siteActions: [
    new SiteAction({
      name: chrome.i18n.getMessage('blockHomeFeed'),
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.FacebookHomeFeed,
      injectCss: `
        ${selectors} {
          display: none!important;
        }
      `,
      manipulateDom: ({ siteAction }) => waitForElement(selectors).then((container) => {
        if (!container) {
          return
        }
        mute(container)

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        container.after(widget)
      }),
    }),
  ],
})

export default facebook

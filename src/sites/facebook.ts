import logoSvg from 'super-tiny-icons/images/svg/facebook.svg'
import { mute, waitForElement } from '~/utils'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'

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
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement(selectors)
        mute(container)
        setTimeout(() => {
          const widget = siteAction.createWidget(container)
          if (!widget)
            return
          container.after(widget)
        }, 1000)
      },
    }),
  ],
})

export default facebook

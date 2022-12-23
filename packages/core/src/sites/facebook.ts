import logoSvg from 'super-tiny-icons/images/svg/facebook.svg'
import { mute, waitForElement } from '../utils'
import { Site, SiteAction } from '../site'
import { UserConfigKey } from '../types'

const facebook = new Site({
  logoSvg,
  name: 'Facebook',
  validateUrl: url => url.host.replace('www.', '') === 'facebook.com',
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.FacebookHideHomeFeed,
      injectCss: `
        #ssrb_feed_start + div {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('#ssrb_feed_start + div')
        mute(container)
        setTimeout(() => {
          const quote = siteAction.createQuoteWidget(container)
          if (!quote)
            return
          container.after(quote)
        }, 1000)
      },
    }),
  ],
})

export default facebook

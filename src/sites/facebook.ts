import logoSvg from 'super-tiny-icons/images/svg/facebook.svg'
import { mute, waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
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
        div[role="feed"] {
          display: none!important;
        }
      `,
      manipulateDom: async({ siteAction }) => {
        const container = await waitForElement('div[role="feed"]')
        mute(container)
        setTimeout(() => {
          const quote = siteAction.createQuoteElement(container)
          if (!quote)
            return
          container.before(quote)
        }, 1000)
      },
    }),
  ],
})

export default facebook

import logoSvg from 'super-tiny-icons/images/svg/twitch.svg'
import { mute, waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
import { UserConfigKey } from '../types'

const twitch = new Site({
  logoSvg,
  name: 'Twitch',
  validateUrl: url => url.host.replace('www.', '') === 'twitch.tv',
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.TwitchHideHomeFeed,
      injectCss: `
        .root-scrollable {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('.root-scrollable')
        mute(container)
        setTimeout(() => {
          const quote = siteAction.createQuoteElement(container)
          if (!quote) return
          quote.style.padding = '30px'
          container.before(quote)
        }, 1000)
      },
    }),
  ],
})

export default twitch

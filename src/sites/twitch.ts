import logoSvg from 'super-tiny-icons/images/svg/twitch.svg'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'
import { mute, waitForElement } from '~/utils'

const twitch = new Site({
  logoSvg,
  name: 'Twitch',
  validateUrl: url => url.host.replace('www.', '') === 'twitch.tv',
  siteActions: [
    new SiteAction({
      name: chrome.i18n.getMessage('blockHomeFeed'),
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.TwitchHomeFeed,
      injectCss: `
        .root-scrollable {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('.root-scrollable')
        mute(container)
        setTimeout(() => {
          const widget = siteAction.createWidget(container)
          if (!widget)
            return
          widget.style.padding = '30px'
          container.before(widget)
        }, 1000)
      },
    }),
  ],
})

export default twitch

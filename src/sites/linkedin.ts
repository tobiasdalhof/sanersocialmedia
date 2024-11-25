import logoSvg from 'super-tiny-icons/images/svg/linkedin.svg'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'
import { mute, waitForElement } from '~/utils'

const linkedin = new Site({
  logoSvg,
  name: 'LinkedIn',
  validateUrl: url => url.host.replace('www.', '') === 'linkedin.com',
  siteActions: [
    new SiteAction({
      name: chrome.i18n.getMessage('blockHomeFeed'),
      validateUrl: url => ['/', '/feed', '/feed/'].includes(url.pathname),
      requiredUserConfigKey: UserConfigKey.LinkedInHomeFeed,
      injectCss: `
        .scaffold-finite-scroll,
        .feed-sort-toggle-dsa__wrapper {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('.scaffold-finite-scroll')
        mute(container)
        const widget = siteAction.createWidget(container)
        if (!widget)
          return
        widget.style.paddingTop = '10px'
        container.before(widget)
      },
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockSidebarFeed'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.LinkedInSidebarFeed,
      injectCss: `
        .scaffold-layout__aside .feed-follows-module {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('.scaffold-layout__aside .feed-follows-module')
        const widget = siteAction.createWidget(container)
        if (!widget)
          return
        widget.style.padding = '20px'
        container.after(widget)
      },
    }),
  ],
})

export default linkedin

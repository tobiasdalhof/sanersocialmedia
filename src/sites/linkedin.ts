import logoSvg from 'super-tiny-icons/images/svg/linkedin.svg'
import { mute, waitForElement } from '~/utils'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'

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
        main.scaffold-layout__main > div:last-child {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('main.scaffold-layout__main > div:last-child')
        mute(container)
        const widget = siteAction.createWidget(container)
        if (!widget)
          return
        widget.style.paddingTop = '10px'
        container.before(widget)
      },
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockSidebarTrends'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.LinkedInSidebarTrends,
      injectCss: `
        aside.scaffold-layout__aside .news-module {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('aside.scaffold-layout__aside .news-module')
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

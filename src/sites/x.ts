import logoSvg from 'super-tiny-icons/images/svg/x.svg'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'
import { mute, waitForElement } from '~/utils'

const x = new Site({
  logoSvg,
  name: 'X',
  validateUrl: url => url.host.replace('www.', '') === 'x.com',
  siteActions: [
    new SiteAction({
      name: chrome.i18n.getMessage('blockHomeFeed'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.XHomeFeed,
      injectCss: `
        [data-testid="primaryColumn"] > div:last-child > div:nth-child(5) {
          width: 0px!important;
          height: 0px!important;
          overflow: hidden!important;
        }
      `,
      manipulateDom: ({ siteAction }) => waitForElement('[data-testid="primaryColumn"] > div:last-child > div:nth-child(5)').then((container) => {
        if (!container) {
          return
        }
        mute(container)

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        widget.style.padding = '40px'
        container.after(widget)
      }),
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockSidebarTrends'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.XSidebarTrends,
      injectCss: `
        [data-testid="sidebarColumn"] section {
          display: none!important;
        }
      `,
      manipulateDom: ({ siteAction }) => waitForElement('[data-testid="sidebarColumn"] section').then((container) => {
        if (!container) {
          return
        }

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        widget.style.padding = '20px'
        container.after(widget)
      }),
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockSidebarFollowSuggestions'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.XSidebarFollowSuggestions,
      injectCss: `
        [data-testid="sidebarColumn"] aside {
          display: none!important;
        }
      `,
      manipulateDom: ({ siteAction }) => waitForElement('[data-testid="sidebarColumn"] aside').then((container) => {
        if (!container) {
          return
        }

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        widget.style.padding = '20px'
        container.after(widget)
      }),
    }),
  ],
})

export default x

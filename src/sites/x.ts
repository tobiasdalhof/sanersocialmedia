import logoSvg from 'super-tiny-icons/images/svg/x.svg'
import { mute, waitForElement } from '~/utils'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'

const x = new Site({
  logoSvg,
  name: 'X',
  validateUrl: (url) => {
    const host = url.host.replace('www.', '')
    return ['twitter.com', 'x.com'].includes(host)
  },
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
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-testid="primaryColumn"] > div:last-child > div:nth-child(5)')
        mute(container)
        const widget = siteAction.createWidget(container)
        if (!widget)
          return
        widget.style.padding = '40px'
        container.after(widget)
      },
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
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-testid="sidebarColumn"] section')
        const widget = siteAction.createWidget(container)
        if (!widget)
          return
        widget.style.padding = '20px'
        container.after(widget)
      },
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
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('[data-testid="sidebarColumn"] aside')
        const widget = siteAction.createWidget(container)
        if (!widget)
          return
        widget.style.padding = '20px'
        container.after(widget)
      },
    }),
  ],
})

export default x

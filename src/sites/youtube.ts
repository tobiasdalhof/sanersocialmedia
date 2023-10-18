import logoSvg from 'super-tiny-icons/images/svg/youtube.svg'
import { UserConfigKey } from '~/types'
import { mute, waitForElement } from '~/utils'
import { Site, SiteAction } from '~/site'

const youtube = new Site({
  logoSvg,
  name: 'YouTube',
  validateUrl: url => url.host.replace('www.', '') === 'youtube.com',
  siteActions: [
    new SiteAction({
      name: chrome.i18n.getMessage('blockHomeFeed'),
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.YouTubeHomeFeed,
      injectCss: `
        ytd-browse #primary {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('ytd-browse #primary')
        mute(container)
        const widget = siteAction.createWidget(container)
        if (!widget)
          return
        widget.style.padding = '40px'
        container.after(widget)
      },
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockSidebarVideoSuggestions'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.YouTubeVideoSidebarSuggestions,
      injectCss: `
        #secondary #related {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('#secondary #related')
        const widget = siteAction.createWidget(container)
        if (!widget)
          return
        widget.style.paddingBottom = '40px'
        container.after(widget)
      },
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockVideoComments'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.YouTubeVideoComments,
      injectCss: `
        #comments #contents {
          opacity: 0!important;
          height: 0px!important;
          overflow: hidden!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('#comments #contents')
        const widget = siteAction.createWidget(container)
        if (!widget)
          return
        widget.style.paddingBottom = '40px'
        container.after(widget)
      },
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockShorts'),
      validateUrl: url => url.pathname.includes('/shorts/'),
      requiredUserConfigKey: UserConfigKey.YouTubeShorts,
      injectCss: `
        ytd-shorts {
          opacity: 0!important;
          height: 0px!important;
          overflow: hidden!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('ytd-shorts')
        mute(container)
        const widget = siteAction.createWidget(container)
        if (!widget)
          return
        widget.style.padding = '40px'
        widget.style.width = '100%'
        container.after(widget)
      },
    }),
  ],
})

export default youtube

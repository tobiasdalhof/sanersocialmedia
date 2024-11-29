import logoSvg from 'super-tiny-icons/images/svg/youtube.svg'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'
import { mute, waitForElement } from '~/utils'

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
      manipulateDom: ({ siteAction }) => waitForElement('ytd-browse #primary').then((container) => {
        if (!container) {
          return container
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
      name: chrome.i18n.getMessage('blockSidebarVideoSuggestions'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.YouTubeVideoSidebarSuggestions,
      injectCss: `
        #secondary #related {
          display: none!important;
        }
      `,
      manipulateDom: ({ siteAction }) => waitForElement('#secondary #related').then((container) => {
        if (!container) {
          return
        }

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        widget.style.paddingBottom = '40px'
        container.after(widget)
      }),
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockCommentsOnWatch'),
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.YouTubeVideoComments,
      injectCss: `
        #comments #contents {
          opacity: 0!important;
          height: 0px!important;
          overflow: hidden!important;
        }
      `,
      manipulateDom: ({ siteAction }) => waitForElement('#comments #contents').then((container) => {
        if (!container) {
          return
        }

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        widget.style.paddingBottom = '40px'
        container.after(widget)
      }),
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
      manipulateDom: ({ siteAction }) => waitForElement('ytd-shorts').then((container) => {
        if (!container) {
          return
        }
        mute(container)

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        widget.style.padding = '40px'
        widget.style.width = '100%'
        container.after(widget)
      }),
    }),
  ],
})

export default youtube

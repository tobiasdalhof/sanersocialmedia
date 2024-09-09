import logoSvg from 'super-tiny-icons/images/svg/youtube.svg'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'
import { mute, waitForElement } from '~/utils'

const youtubeMobile = new Site({
  logoSvg,
  name: 'YouTube Mobile',
  validateUrl: url => url.host === 'm.youtube.com',
  siteActions: [
    new SiteAction({
      name: chrome.i18n.getMessage('blockHomeFeed'),
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.YouTubeMobileHomeFeed,
      injectCss: `
        .page-container {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('.page-container')
        mute(container)
        const widget = siteAction.createWidget(container)
        if (!widget)
          return
        widget.style.padding = '20px'
        container.after(widget)
      },
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockVideoSuggestions'),
      validateUrl: url => url.href.includes('/watch?v='),
      requiredUserConfigKey: UserConfigKey.YouTubeMobileVideoSuggestions,
      injectCss: `
        .related-items-container {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('.related-items-container')
        const widget = siteAction.createWidget(container)
        if (!widget)
          return
        widget.style.padding = '20px'
        container.after(widget)
      },
    }),
    new SiteAction({
      name: chrome.i18n.getMessage('blockShorts'),
      validateUrl: url => url.pathname.includes('/shorts/'),
      requiredUserConfigKey: UserConfigKey.YouTubeMobileShorts,
      injectCss: `
        shorts-video {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('shorts-video')
        mute(container)
        const widget = siteAction.createWidget(container)
        if (!widget)
          return
        widget.style.padding = '80px 20px'
        container.after(widget)
      },
    }),
  ],
})

export default youtubeMobile

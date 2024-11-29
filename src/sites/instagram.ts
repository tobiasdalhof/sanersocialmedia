import logoSvg from 'super-tiny-icons/images/svg/instagram.svg'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'
import { mute, waitForElement } from '~/utils'

const instagram = new Site({
  logoSvg,
  name: 'Instagram',
  validateUrl: url => url.host.replace('www.', '') === 'instagram.com',
  siteActions: [
    new SiteAction({
      name: chrome.i18n.getMessage('blockHomeFeed'),
      validateUrl: url => ['/'].includes(url.pathname),
      requiredUserConfigKey: UserConfigKey.InstagramHomeFeed,
      injectCss: `
        main[role=main] > :not([data-sanersocialmedia-widget]) {
          display: none!important;
        }
      `,
      manipulateDom: ({ siteAction }) => waitForElement('main[role=main]').then((container) => {
        if (!container) {
          return
        }
        mute(container)

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        widget.style.padding = '25px 50px'
        container.appendChild(widget)
      }),
    }),
    new SiteAction({
      name: 'Block /explore feed',
      validateUrl: url => ['/explore', '/explore/'].includes(url.pathname),
      requiredUserConfigKey: UserConfigKey.InstagramExplore,
      injectCss: `
        main[role=main] > :not([data-sanersocialmedia-widget]) {
          display: none!important;
        }
      `,
      manipulateDom: ({ siteAction }) => waitForElement('main[role=main]').then((container) => {
        if (!container) {
          return
        }
        mute(container)

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        widget.style.padding = '25px 50px'
        container.appendChild(widget)
      }),
    }),
    new SiteAction({
      name: 'Block /reels feed',
      validateUrl: url => url.pathname.includes('/reels'),
      requiredUserConfigKey: UserConfigKey.InstagramReels,
      injectCss: `
        main[role=main] > :not([data-sanersocialmedia-widget]) {
          display: none!important;
        }
      `,
      manipulateDom: ({ siteAction }) => waitForElement('main[role=main]').then((container) => {
        if (!container) {
          return
        }
        mute(container)

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        widget.style.padding = '25px 50px'
        container.appendChild(widget)
      }),
    }),
  ],
})

export default instagram

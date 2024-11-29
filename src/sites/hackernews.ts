import logoSvg from 'super-tiny-icons/images/svg/hackernews.svg'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'
import { waitForElement } from '~/utils'

const hackernews = new Site({
  logoSvg,
  name: 'Hacker News',
  validateUrl: url => url.host === 'news.ycombinator.com',
  siteActions: [
    new SiteAction({
      name: chrome.i18n.getMessage('blockHomeFeed'),
      validateUrl: url => ['/', '/news'].includes(url.pathname),
      requiredUserConfigKey: UserConfigKey.HackerNewsHomeFeed,
      injectCss: `
        #hnmain > tbody > tr:nth-child(3) > td > table {
          display: none!important;
        }
      `,
      manipulateDom: ({ siteAction }) => waitForElement('#hnmain > tbody > tr:nth-child(3) > td').then((container) => {
        if (!container) {
          return
        }

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        widget.style.padding = '25px'
        container.appendChild(widget)
      }),
    }),
    new SiteAction({
      name: 'Block /newest feed',
      validateUrl: url => url.pathname === '/newest',
      requiredUserConfigKey: UserConfigKey.HackerNewsNewestFeed,
      injectCss: `
        #hnmain > tbody > tr:nth-child(3) > td > :not([data-sanersocialmedia-widget]) {
          display: none!important;
        }
      `,
      manipulateDom: ({ siteAction }) => waitForElement('#hnmain > tbody > tr:nth-child(3) > td').then((container) => {
        if (!container) {
          return
        }

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        widget.style.padding = '25px'
        container.appendChild(widget)
      }),
    }),
    new SiteAction({
      name: 'Block /front feed',
      validateUrl: url => url.pathname === '/front',
      requiredUserConfigKey: UserConfigKey.HackerNewsFrontFeed,
      injectCss: `
        #hnmain > tbody > tr:nth-child(3) > td > :not([data-sanersocialmedia-widget]) {
          display: none!important;
        }
      `,
      manipulateDom: ({ siteAction }) => waitForElement('#hnmain > tbody > tr:nth-child(3) > td').then((container) => {
        if (!container) {
          return
        }

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }
        widget.style.padding = '25px'
        container.appendChild(widget)
      }),
    }),
  ],
})

export default hackernews

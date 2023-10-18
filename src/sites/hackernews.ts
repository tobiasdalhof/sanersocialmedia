import logoSvg from 'super-tiny-icons/images/svg/hackernews.svg'
import { QuoteWidgetDataAttribute } from '~/services/WidgetService'
import { UserConfigKey } from '~/types'
import { waitForElement } from '~/utils'
import { Site, SiteAction } from '~/site'

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
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('#hnmain > tbody > tr:nth-child(3) > td')
        const quote = siteAction.createQuoteWidget(container)
        if (!quote)
          return
        quote.style.padding = '25px'
        container.appendChild(quote)
      },
    }),
    new SiteAction({
      name: 'Block /newest feed',
      validateUrl: url => url.pathname === '/newest',
      requiredUserConfigKey: UserConfigKey.HackerNewsNewestFeed,
      injectCss: `
        #hnmain > tbody > tr:nth-child(3) > td > :not([${QuoteWidgetDataAttribute.Container}]) {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('#hnmain > tbody > tr:nth-child(3) > td')
        const quote = siteAction.createQuoteWidget(container)
        if (!quote)
          return
        quote.style.padding = '25px'
        container.appendChild(quote)
      },
    }),
    new SiteAction({
      name: 'Block /front feed',
      validateUrl: url => url.pathname === '/front',
      requiredUserConfigKey: UserConfigKey.HackerNewsFrontFeed,
      injectCss: `
        #hnmain > tbody > tr:nth-child(3) > td > :not([${QuoteWidgetDataAttribute.Container}]) {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('#hnmain > tbody > tr:nth-child(3) > td')
        const quote = siteAction.createQuoteWidget(container)
        if (!quote)
          return
        quote.style.padding = '25px'
        container.appendChild(quote)
      },
    }),
  ],
})

export default hackernews

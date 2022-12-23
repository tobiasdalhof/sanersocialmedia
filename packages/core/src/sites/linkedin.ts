import logoSvg from 'super-tiny-icons/images/svg/linkedin.svg'
import { mute, waitForElement } from '../utils'
import { Site, SiteAction } from '../site'
import { UserConfigKey } from '../types'

const linkedin = new Site({
  logoSvg,
  name: 'LinkedIn',
  validateUrl: url => url.host.replace('www.', '') === 'linkedin.com',
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: url => ['/', '/feed', '/feed/'].includes(url.pathname),
      requiredUserConfigKey: UserConfigKey.LinkedInHideHomeFeed,
      injectCss: `
        main.scaffold-layout__main > div:last-child {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('main.scaffold-layout__main > div:last-child')
        mute(container)
        const quote = siteAction.createQuoteWidget(container)
        if (!quote)
          return
        quote.style.paddingTop = '10px'
        container.before(quote)
      },
    }),
    new SiteAction({
      name: 'Hide trending news in sidebar',
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.LinkedInHideSidebarTrendingNews,
      injectCss: `
        aside.scaffold-layout__aside .news-module {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('aside.scaffold-layout__aside .news-module')
        const quote = siteAction.createQuoteWidget(container)
        if (!quote)
          return
        quote.style.padding = '20px'
        container.after(quote)
      },
    }),
  ],
})

export default linkedin

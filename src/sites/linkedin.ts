import logoSvg from 'super-tiny-icons/images/svg/linkedin.svg'
import { waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
import { UserConfigKey } from '../types'

const linkedin = new Site({
  logoSvg,
  name: 'LinkedIn',
  validateUrl: url => url.host.includes('linkedin.com'),
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: url => url.pathname.includes('feed'),
      requiredUserConfigKey: UserConfigKey.LinkedInHideHomePageFeed,
      injectCss: `
        main.scaffold-layout__main > div:last-child {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('main.scaffold-layout__main > div:last-child')
        const quote = siteAction.createQuoteElement(container)
        quote.style.paddingTop = '10px'
        container.before(quote)
      },
    }),
    new SiteAction({
      name: 'Hide trending news in sidebar',
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.LinkedInHideTrendingNewsSidebar,
      injectCss: `
        aside.scaffold-layout__aside .news-module {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('aside.scaffold-layout__aside .news-module')
        const quote = siteAction.createQuoteElement(container)
        quote.style.padding = '20px'
        container.before(quote)
      },
    }),
  ],
})

export default linkedin

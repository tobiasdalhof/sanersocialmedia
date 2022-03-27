import logoSvg from 'super-tiny-icons/images/svg/github.svg'
import { waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
import { UserConfigKey } from '../types'

const github = new Site({
  logoSvg,
  name: 'GitHub',
  validateUrl: url => url.host.includes('github.com'),
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.GitHubHideHomePageFeed,
      injectCss: `
        #dashboard, [aria-label="Explore"] {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('#dashboard')
        const quote = siteAction.createQuoteElement(container)
        container.after(quote)
      },
    }),
  ],
})

export default github

import logoSvg from 'super-tiny-icons/images/svg/github.svg'
import { waitForElement } from '../utils'
import { Site, SiteAction } from '../site'
import { UserConfigKey } from '../types'

const github = new Site({
  logoSvg,
  name: 'GitHub',
  validateUrl: url => url.host.replace('www.', '') === 'github.com',
  siteActions: [
    new SiteAction({
      name: chrome.i18n.getMessage('blockHomeFeed'),
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.GitHubHomeFeed,
      injectCss: `
        #dashboard, [aria-label="Explore"] {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('#dashboard')
        const quote = siteAction.createQuoteWidget(container)
        if (!quote)
          return
        container.after(quote)
      },
    }),
  ],
})

export default github

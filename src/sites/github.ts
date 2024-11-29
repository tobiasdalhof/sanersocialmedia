import logoSvg from 'super-tiny-icons/images/svg/github.svg'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'
import { waitForElement } from '~/utils'

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
      manipulateDom: ({ siteAction }) => waitForElement('#dashboard').then((container) => {
        if (!container) {
          return
        }

        const widget = siteAction.createWidget(container)
        if (!widget) {
          return
        }

        container.after(widget)
      }),
    }),
  ],
})

export default github

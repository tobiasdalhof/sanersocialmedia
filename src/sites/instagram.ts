import logoSvg from 'super-tiny-icons/images/svg/instagram.svg'
import { waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
import { UserConfigKey } from '../types'

const instagram = new Site({
  logoSvg,
  name: 'Instagram',
  validateUrl: url => url.host.includes('instagram.com'),
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.InstagramHideHomePageFeed,
      injectCss: `
        main > section > :not([data-chrome-extension-quote-container])  {
          display: none!important;
        }
      `,
      manipulateDom: ({ siteAction }) => {
        setTimeout(async () => {
          const container = await waitForElement('main > section')
          const quote = siteAction.createQuoteElement(container)
          if (!quote) return
          container.appendChild(quote)
        }, 1000)
      },
    }),
  ],
})

export default instagram

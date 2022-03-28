import logoSvg from 'super-tiny-icons/images/svg/instagram.svg'
import { mute, waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
import { QuoteElementDataAttribute } from '../services/ElementService'
import { UserConfigKey } from '../types'

const instagram = new Site({
  logoSvg,
  name: 'Instagram',
  validateUrl: url => url.host.replace('www.', '') === 'instagram.com',
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.InstagramHideHomeFeed,
      injectCss: `
        main > section > :not([${QuoteElementDataAttribute.Container}]) {
          display: none!important;
        }
      `,
      manipulateDom: ({ siteAction }) => {
        setTimeout(async () => {
          const container = await waitForElement('main > section')
          const quote = siteAction.createQuoteElement(container)
          if (!quote) return
          container.appendChild(quote)
          mute(container)
        }, 1000)
      },
    }),
  ],
})

export default instagram

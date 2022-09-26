import logoSvg from 'super-tiny-icons/images/svg/instagram.svg'
import { mute, waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
import { QuoteWidgetDataAttribute } from '../services/WidgetService'
import { UserConfigKey } from '../types'

const instagram = new Site({
  logoSvg,
  name: 'Instagram',
  validateUrl: url => url.host.replace('www.', '') === 'instagram.com',
  siteActions: [
    new SiteAction({
      name: 'Hide feed on home page',
      validateUrl: () => true,
      requiredUserConfigKey: UserConfigKey.InstagramHideHomeFeed,
      injectCss: `
        main > div > section > :not([${QuoteWidgetDataAttribute.Container}]) {
          display: none!important;
        }
      `,
      manipulateDom: async ({ siteAction }) => {
        const container = await waitForElement('main > div > section')
        mute(container)
        setTimeout(() => {
          const quote = siteAction.createQuoteWidget(container)
          if (!quote)
            return
          quote.style.paddingTop = '25px'
          container.appendChild(quote)
        }, 1000)
      },
    }),
  ],
})

export default instagram

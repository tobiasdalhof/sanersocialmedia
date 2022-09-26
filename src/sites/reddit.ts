import logoSvg from 'super-tiny-icons/images/svg/reddit.svg'
import { mute, waitForElement } from '../helpers'
import Site from '../lib/Site'
import SiteAction from '../lib/SiteAction'
import { UserConfigKey } from '../types'

interface CreateHideRedditFeedActionParams {
  name: string
  validateUrl: (url: URL) => boolean
  requiredUserConfigKey: UserConfigKey
}

function createHideRedditFeedAction(params: CreateHideRedditFeedActionParams): SiteAction {
  return new SiteAction({
    name: params.name,
    validateUrl: params.validateUrl,
    requiredUserConfigKey: params.requiredUserConfigKey,
    injectCss: `
      .scrollerItem,
      .FohHGMokxXLkon1aacMoi {
        opacity: 0!important;
        pointer-events: none!important;
        width: 0px!important;
        height: 0px!important;
      }
    `,
    manipulateDom: async ({ siteAction }) => {
      const container = await waitForElement('.scrollerItem')
      mute(container)
      setTimeout(() => {
        const quote = siteAction.createQuoteWidget(container)
        if (!quote)
          return
        container.before(quote)
      }, 1000)
    },
  })
}

const reddit = new Site({
  logoSvg,
  name: 'Reddit',
  validateUrl: url => url.host.replace('www.', '') === 'reddit.com',
  siteActions: [
    createHideRedditFeedAction({
      name: 'Hide feed on home page',
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.RedditHideHomeFeed,
    }),
    createHideRedditFeedAction({
      name: 'Hide feed on all subreddits',
      validateUrl: url => url.pathname.includes('/r/'),
      requiredUserConfigKey: UserConfigKey.RedditHideSubredditsFeed,
    }),
  ],
})

export default reddit

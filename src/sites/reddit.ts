import logoSvg from 'super-tiny-icons/images/svg/reddit.svg'
import { mute, waitForElement } from '~/utils'
import { Site, SiteAction } from '~/site'
import { UserConfigKey } from '~/types'

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
        const widget = siteAction.createWidget(container)
        if (!widget)
          return
        container.before(widget)
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
      name: chrome.i18n.getMessage('blockHomeFeed'),
      validateUrl: url => url.pathname === '/',
      requiredUserConfigKey: UserConfigKey.RedditHomeFeed,
    }),
    createHideRedditFeedAction({
      name: chrome.i18n.getMessage('blockSubredditFeeds'),
      validateUrl: url => url.pathname.includes('/r/'),
      requiredUserConfigKey: UserConfigKey.RedditSubFeed,
    }),
  ],
})

export default reddit

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
      #main-content > :not([data-sanersocialmedia-widget]) {
        display: none!important;
      }
    `,
    manipulateDom: async ({ siteAction }) => {
      const container = await waitForElement('#main-content')
      mute(container)
      const widget = siteAction.createWidget(container)
      if (widget) {
        widget.style.paddingTop = '25px'
        container.appendChild(widget)
      }
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
      validateUrl: url => url.pathname.includes('/r/') && !url.pathname.includes('/comments/'),
      requiredUserConfigKey: UserConfigKey.RedditSubFeed,
    }),
  ],
})

export default reddit

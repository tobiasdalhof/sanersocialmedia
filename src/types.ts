export interface Store {
  userSettings?: UserSettings
}

export interface Site {
  name: string
  logo: string
  actions: SiteAction[]
}

export interface SiteAction {
  name: string
}

export interface UserSettings {
  youtubeHomePageHideFeed?: boolean
  youtubeVideoPageHideSidebar?: boolean
  youtubeVideoPageHideComments?: boolean
  instagramHomePageHideFeed?: boolean
  instagramPostHideComments?: boolean
  twitterHomePageHideFeed?: boolean
  twitterSidebarHideTrends?: boolean
  redditHomePageHideFeed?: boolean
  tiktokHomePageHideFeed?: boolean
  twitchHomePageHideFeed?: boolean
  facebookHomePageHideFeed?: boolean
  linkedinHomePageHideFeed?: boolean
  pinterestHomePageHideFeed?: boolean
  githubHomePageHideFeed?: boolean
}

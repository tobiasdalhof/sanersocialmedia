export interface Store {
  userConfig?: UserConfig
}

export enum UserConfigKey {
  YouTubeHideHomePageFeed = 'YouTubeHideHomePageFeed',
  YouTubeHideVideoPageComments = 'YouTubeHideVideoPageComments',
  YouTubeHideVideoPageSidebarRelated = 'YouTubeHideVideoPageSidebarRelated',
  TwitterHideHomeFeed = 'TwitterHideHomeFeed',
  TwitterHideSidebar = 'TwitterHideSidebar',
  LinkedInHideHomePageFeed = 'LinkedInHideHomePageFeed',
  LinkedInHideTrendingNewsSidebar = 'LinkedInHideTrendingNewsSidebar',
  GitHubHideHomePageFeed = 'GitHubHideHomePageFeed',
  RedditHideHomePageFeed = 'RedditHideHomePageFeed',
  TikTokHideHomePageFeed = 'TikTokHideHomePageFeed',
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
}

export type UserConfig = PartialRecord<UserConfigKey, boolean>

export interface Quote {
  author: string
  text: string
}

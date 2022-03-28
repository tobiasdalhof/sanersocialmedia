export interface Store {
  userConfig?: UserConfig
}

export enum UserConfigKey {
  YouTubeHideHomeFeed = 'YouTubeHideHomeFeed',
  YouTubeHideVideoSidebarRelated = 'YouTubeHideVideoSidebarRelated',
  YouTubeHideVideoComments = 'YouTubeHideVideoComments',
  TwitterHideHomeFeed = 'TwitterHideHomeFeed',
  TwitterHideSidebarTrends = 'TwitterHideSidebarTrends',
  TwitterHideSidebarFollowSuggestions = 'TwitterHideSidebarFollowSuggestions',
  InstagramHideHomeFeed = 'InstagramHideHomeFeed',
  FacebookHideHomeFeed = 'FacebookHideHomeFeed',
  TikTokHideHomeFeed = 'TikTokHideHomeFeed',
  LinkedInHideHomeFeed = 'LinkedInHideHomeFeed',
  LinkedInHideSidebarTrendingNews = 'LinkedInHideSidebarTrendingNews',
  RedditHideHomeFeed = 'RedditHideHomeFeed',
  GitHubHideHomeFeed = 'GitHubHideHomeFeed',
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
}

export type UserConfig = PartialRecord<UserConfigKey, boolean>

export interface Quote {
  author: string
  text: string
}

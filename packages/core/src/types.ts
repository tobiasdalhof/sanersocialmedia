export interface Store {
  userConfig?: UserConfig
}

export enum UserConfigKey {
  YouTubeHomeFeed = 'YouTubeHomeFeed',
  YouTubeVideoSidebarSuggestions = 'YouTubeVideoSidebarSuggestions',
  YouTubeVideoComments = 'YouTubeVideoComments',
  YouTubeShorts = 'YouTubeShorts',
  TwitterHomeFeed = 'TwitterHomeFeed',
  TwitterSidebarTrends = 'TwitterSidebarTrends',
  TwitterSidebarFollowSuggestions = 'TwitterSidebarFollowSuggestions',
  InstagramHomeFeed = 'InstagramHomeFeed',
  InstagramExplore = 'InstagramExplore',
  InstagramReels = 'InstagramReels',
  FacebookHomeFeed = 'FacebookHomeFeed',
  TikTokHomeFeed = 'TikTokHomeFeed',
  PinterestHomeFeed = 'PinterestHomeFeed',
  PinterestRelatedPins = 'PinterestRelatedPins',
  LinkedInHomeFeed = 'LinkedInHomeFeed',
  LinkedInSidebarTrends = 'LinkedInSidebarTrends',
  TwitchHomeFeed = 'TwitchHomeFeed',
  RedditHomeFeed = 'RedditHomeFeed',
  RedditSubFeed = 'RedditSubFeed',
  GitHubHomeFeed = 'GitHubHomeFeed',
  HideOptionsLink = 'HideOptionsLink',
  HackerNewsHomeFeed = 'HackerNewsHomeFeed',
  HackerNewsNewestFeed = 'HackerNewsNewestFeed',
  HackerNewsFrontFeed = 'HackerNewsFrontFeed',
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
}

export type UserConfig = PartialRecord<UserConfigKey, boolean>

export interface Quote {
  author: string
  text: string
}

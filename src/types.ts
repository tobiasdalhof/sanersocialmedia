export interface Store {
  userConfig?: UserConfig
}

export enum UserConfigKey {
  YouTubeHomeFeed = 'YouTubeHomeFeed',
  YouTubeVideoSidebarSuggestions = 'YouTubeVideoSidebarSuggestions',
  YouTubeVideoComments = 'YouTubeVideoComments',
  YouTubeShorts = 'YouTubeShorts',
  YouTubeSubscriptionsFeed = 'YouTubeSubscriptionsFeed',
  YouTubeMobileHomeFeed = 'YouTubeMobileHomeFeed',
  YouTubeMobileVideoSuggestions = 'YouTubeMobileVideoSuggestions',
  YouTubeMobileShorts = 'YouTubeMobileShorts',
  YouTubeMobileSubscriptionsFeed = 'YouTubeMobileSubscriptionsFeed',
  XHomeFeed = 'XHomeFeed',
  XSidebarTrends = 'XSidebarTrends',
  XSidebarFollowSuggestions = 'XSidebarFollowSuggestions',
  InstagramHomeFeed = 'InstagramHomeFeed',
  InstagramExplore = 'InstagramExplore',
  InstagramReels = 'InstagramReels',
  FacebookHomeFeed = 'FacebookHomeFeed',
  TikTokHomeFeed = 'TikTokHomeFeed',
  TikTokVideoComments = 'TikTokVideoComments',
  PinterestHomeFeed = 'PinterestHomeFeed',
  PinterestRelatedPins = 'PinterestRelatedPins',
  LinkedInHomeFeed = 'LinkedInHomeFeed',
  LinkedInSidebarFeed = 'LinkedInSidebarFeed',
  TwitchHomeFeed = 'TwitchHomeFeed',
  RedditHomeFeed = 'RedditHomeFeed',
  RedditSubFeed = 'RedditSubFeed',
  GitHubHomeFeed = 'GitHubHomeFeed',
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

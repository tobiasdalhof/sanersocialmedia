export type CooldownMode = 'fixed' | 'percentage' | 'hybrid'

export interface Store {
  userConfig: UserConfig
  snoozeMinutes: number
  snoozedUntilTimestamp: number
  cooldownUntilTimestamp: number
  lastSnoozeDurationMs: number
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
  CooldownEnabled = 'CooldownEnabled',
  CooldownMinutes = 'CooldownMinutes',
  CooldownMode = 'CooldownMode',
  CooldownPercentage = 'CooldownPercentage',
  OverrideEnabled = 'OverrideEnabled',
  OverridePhrase = 'OverridePhrase',
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
}

export type UserConfig = PartialRecord<UserConfigKey, boolean | number | CooldownMode | string>

export interface Quote {
  author: string
  text: string
}

export interface CooldownConfig {
  enabled: boolean
  mode: CooldownMode
  minutes: number
  percentage: number
}

export interface OverrideConfig {
  enabled: boolean
  phrase: string
}

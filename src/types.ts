import type { QuoteService } from './services/QuoteService'

export interface Store {
  userSettings?: UserSettings
}

export interface Site {
  name: string
  logo: string
  validHost(url: URL): boolean
  actions: Record<string, SiteAction>
}

export interface SiteAction {
  name: string
  validURL(url: URL): boolean
  userSettingsKey: UserSettingsKey
  manipulations: SiteActionManipulation[]
}

interface SiteActionManipulationUpdateParams {
  element: HTMLElement
  quoteService: QuoteService
}

interface SiteActionManipulation {
  selector: string
  update(params: SiteActionManipulationUpdateParams): void
  revertUpdate(params: SiteActionManipulationUpdateParams): void
}

export enum UserSettingsKey {
  YouTubeHideHomePageFeed = 'YouTubeHideHomePageFeed',
  YouTubeHideVideoPageComments = 'YouTubeHideVideoPageComments',
  YouTubeHideVideoPageSidebarRelated = 'YouTubeHideVideoPageSidebarRelated',
  TwitterHideVideoPageSidebarRelated = 'TwitterHideVideoPageSidebarRelated',
  TwitterHideSidebar = 'TwitterHideSidebar',
  LinkedInHideHomePageFeed = 'LinkedInHideHomePageFeed',
  LinkedInHideTrendingNewsSidebar = 'LinkedInHideTrendingNewsSidebar',
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
}

export type UserSettings = PartialRecord<UserSettingsKey, boolean>

export interface Quote {
  author: string
  text: string
}

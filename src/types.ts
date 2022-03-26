export interface Store {
  userSettings?: UserSettings
}

export interface Site {
  name: string
  logo: string
  validHosts: string[]
  actions: Record<string, SiteAction>
}

export interface SiteAction {
  name: string
  validURL(url: URL): boolean
  userSettingsKey: UserSettingsKey
  manipulations: SiteActionManipulation[]
}

interface SiteActionManipulation {
  selector: string
  update(element: HTMLElement): void
  revertUpdate(element: HTMLElement): void
}

export enum UserSettingsKey {
  YouTubeHideHomePageFeed = 'YouTubeHideHomePageFeed',
  YouTubeHideVideoPageComments = 'YouTubeHideVideoPageComments',
  YouTubeHideVideoPageSidebarRelated = 'YouTubeHideVideoPageSidebarRelated',
  TwitterHideVideoPageSidebarRelated = 'TwitterHideVideoPageSidebarRelated',
  TwitterHideSidebar = 'TwitterHideSidebar',
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
}

export type UserSettings = PartialRecord<UserSettingsKey, boolean>

export interface Quote {
  author: string
  text: string
}

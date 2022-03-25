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
  validPaths: string[]
  userSettingsKey: UserSettingsKey
  manipulations: SiteActionManipulation[]
}

interface SiteActionManipulation {
  selector: string
  update(element: HTMLElement): void
  revert(element: HTMLElement): void
}

export enum UserSettingsKey {
  YouTubeHideHomePageFeed = 'YouTubeHideHomePageFeed',
  YouTubeHideVideoPageComments = 'YouTubeHideVideoPageComments',
  YouTubeHideVideoPageSidebarRelated = 'YouTubeHideVideoPageSidebarRelated',
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
}

export type UserSettings = PartialRecord<UserSettingsKey, boolean>

import { UserConfigKey } from './types'
import type { CooldownConfig, Store, UserConfig, CooldownMode, OverrideConfig } from './types'

const defaultCooldownEnabled = false
const defaultCooldownMinutes = 1
const defaultCooldownPercentage = 10
const defaultCooldownMode: CooldownMode = 'fixed'
const defaultOverrideEnabled = true
const defaultOverridePhrase = "SaNeR SoCiaL mEDiA"

export function openOptionsPage() {
  return chrome.runtime.openOptionsPage()
}

export async function getStore() {
  const defaults: Partial<Store> = {
    userConfig: {
      CooldownEnabled: defaultCooldownEnabled,
      CooldownMinutes: defaultCooldownMinutes,
      CooldownMode: defaultCooldownMode,
      CooldownPercentage: defaultCooldownPercentage,
      OverrideEnabled: defaultOverrideEnabled,
      OverridePhrase: defaultOverridePhrase,
    },
    snoozeMinutes: 5,
    snoozedUntilTimestamp: 0,
    cooldownUntilTimestamp: 0,
    lastSnoozeDurationMs: 0,
  }
  
  return await chrome.storage.sync.get(defaults) as Store
}

export async function setUserConfig(userConfig: UserConfig) {
  const store = await getStore()
  await chrome.storage.sync.set(<Store>{
    ...store,
    userConfig,
  })
}

export async function toggleUserConfigKey(key: UserConfigKey) {
  const store = await getStore()
  let value: boolean
  if (!store.userConfig)
    value = true
  else if (store.userConfig[key] === undefined)
    value = true
  else value = !store.userConfig[key]

  const userConfig: UserConfig = { ...store.userConfig, [key]: value }
    await setUserConfig(userConfig)
}

export async function getSnoozeMinutes() {
  const result = await chrome.storage.sync.get(['snoozeMinutes'])
  return (result.snoozeMinutes as number) ?? 5
}

export function setSnoozeMinutes(minutes: number) {
  return chrome.storage.sync.set({ snoozeMinutes: minutes })
}

export async function getSnoozedUntilTimestamp() {
  const result = await chrome.storage.sync.get(['snoozedUntilTimestamp'])
  return (result.snoozedUntilTimestamp as number) ?? 0
}

export function setSnoozedUntilTimestamp(timestamp: number) {
  return chrome.storage.sync.set({ snoozedUntilTimestamp: timestamp })
}

export async function checkSnoozed() {
  const until = await getSnoozedUntilTimestamp()
  const now = Date.now()
  return until > now
}

export async function getCooldownConfig() {
  const store = await getStore()

  const enabled = store.userConfig["CooldownEnabled"] === true
  const mode = store.userConfig["CooldownMode"] as CooldownMode
  const minutes = store.userConfig["CooldownMinutes"] as number
  const percentage = store.userConfig["CooldownPercentage"] as number

  return {
    enabled,
    mode: mode,
    minutes: minutes,
    percentage: percentage,
  }
}

export async function getCooldownUntilTimestamp() {
  const store = await getStore()
  return store.cooldownUntilTimestamp
}

export function setCooldownUntilTimestamp(timestamp: number) {
  return chrome.storage.sync.set({ cooldownUntilTimestamp: timestamp })
}

export async function checkCooldownActive() {
  const until = await getCooldownUntilTimestamp()
  return until > Date.now()
}

export async function getOverrideConfig() {
  const store = await getStore()
  const enabled =  store.userConfig["OverrideEnabled"] === true
  let phrase = ( store.userConfig["OverridePhrase"] as string)?.trim()
  if (phrase === '') {
    phrase = defaultOverridePhrase
  }
  return { enabled, phrase }
}

export async function getLastSnoozeDurationMs() {
  const store = await getStore()
  return store.lastSnoozeDurationMs
}

export function setLastSnoozeDurationMs(durationMs: number) {
  return chrome.storage.sync.set({ lastSnoozeDurationMs: durationMs })
}

import type { Store, UserConfig, UserConfigKey } from './types'

export function openOptionsPage() {
  return chrome.runtime.openOptionsPage()
}

export async function getStore() {
  return await chrome.storage.sync.get() as Store
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
  if (!store.userConfig) {
    value = true
  }
  else if (store.userConfig[key] === undefined) {
    value = true
  }
  else {
    value = !store.userConfig[key]
  }
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

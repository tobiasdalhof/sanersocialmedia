import type { Store, UserSettingsKey } from './types'

export async function getStore() {
  return await chrome.storage.sync.get() as Store
}

export async function toggleUserSettings(key: UserSettingsKey) {
  const store = await getStore()
  let value: boolean
  if (!store.userSettings) value = true
  else if (store.userSettings[key] === undefined) value = true
  else value = !store.userSettings[key]

  await chrome.storage.sync.set(<Store>{
    ...store,
    userSettings: {
      ...store.userSettings,
      [key]: value,
    },
  })
}

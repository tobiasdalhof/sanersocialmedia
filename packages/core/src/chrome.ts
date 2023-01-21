import type { Store, UserConfig, UserConfigKey } from './types'

export function getOptionsURL(): string {
  return chrome.runtime.getURL('options/index.html')
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
  if (!store.userConfig)
    value = true
  else if (store.userConfig[key] === undefined)
    value = true
  else value = !store.userConfig[key]

  const userConfig: UserConfig = { ...store.userConfig, [key]: value }
  await setUserConfig(userConfig)
}

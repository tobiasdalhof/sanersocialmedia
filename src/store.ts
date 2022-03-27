import type { Store, UserConfigKey } from './types'

export async function getStore() {
  return await chrome.storage.sync.get() as Store
}

export async function toggleUserConfig(key: UserConfigKey) {
  const store = await getStore()
  let value: boolean
  if (!store.userConfig) value = true
  else if (store.userConfig[key] === undefined) value = true
  else value = !store.userConfig[key]

  await chrome.storage.sync.set(<Store>{
    ...store,
    userConfig: {
      ...store.userConfig,
      [key]: value,
    },
  })
}

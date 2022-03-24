import type { Options, Store } from './types'

export async function getStore() {
  const store = await chrome.storage.sync.get() as Store
  if (!store.defaultOptions) {
    await chrome.storage.sync.set(<Store>{
      ...store,
      defaultOptions: createDefaultOptions(),
    })
    getStore()
  }
  return store
}

function createDefaultOptions(): Options {
  return {
    sites: {
      youtube: {
        enabled: true,
      },
    },
  }
}

import { getSnoozedUntilTimestamp, openOptionsPage, setSnoozedUntilTimestamp } from '~/chrome'

chrome.runtime.onInstalled.addListener((details) => {
  const installed = details.reason === chrome.runtime.OnInstalledReason.INSTALL
  if (installed)
    openOptionsPage()
})

let snoozeInterval: NodeJS.Timeout

async function snoozeTick(until: number) {
  const now = Date.now()
  const diff = until - now

  if (diff <= 0) {
    clearInterval(snoozeInterval)
    await chrome.action.setBadgeText({ text: '' })
    await setSnoozedUntilTimestamp(0)
    return
  }

  const seconds = Math.floor(diff / 1000)

  await chrome.action.setBadgeBackgroundColor({ color: '#666666' })
  await chrome.action.setBadgeTextColor({ color: '#EEEEEE' })

  const minutes = Math.floor(seconds / 60)
  await chrome.action.setBadgeText({ text: minutes.toString() })
}

async function setupSnooze() {
  clearInterval(snoozeInterval)
  const until = await getSnoozedUntilTimestamp()
  await snoozeTick(until)
  snoozeInterval = setInterval(() => snoozeTick(until), 1000)
}

chrome.runtime.onInstalled.addListener(() => setupSnooze())
chrome.runtime.onStartup.addListener(() => setupSnooze())
chrome.storage.onChanged.addListener(() => setupSnooze())

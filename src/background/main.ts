import { checkSnoozed, getSnoozedUntilTimestamp, openOptionsPage, setSnoozedUntilTimestamp } from '~/chrome'

chrome.runtime.onInstalled.addListener((details) => {
  const installed = details.reason === chrome.runtime.OnInstalledReason.INSTALL
  if (installed)
    openOptionsPage()
})

let snoozeInterval: NodeJS.Timeout

async function snoozeTick() {
  const now = Date.now()
  const until = await getSnoozedUntilTimestamp()
  const diff = until - now

  if (diff <= 0) {
    await setSnoozedUntilTimestamp(0)
    return
  }

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  await chrome.action.setBadgeText({ text: minutes.toString() })
  await chrome.action.setBadgeBackgroundColor({ color: '#666666' })
  await chrome.action.setBadgeTextColor({ color: '#EEEEEE' })
}

async function setupSnooze() {
  clearInterval(snoozeInterval)
  const snoozed = await checkSnoozed()
  if (!snoozed) {
    await chrome.action.setBadgeText({ text: '' })
    return
  }

  await snoozeTick()
  snoozeInterval = setInterval(() => snoozeTick(), 1000)
}

chrome.runtime.onInstalled.addListener(() => setupSnooze())
chrome.runtime.onStartup.addListener(() => setupSnooze())
chrome.storage.onChanged.addListener(() => setupSnooze())

import {
  checkSnoozed,
  getSnoozedUntilTimestamp,
  openOptionsPage,
  setSnoozedUntilTimestamp,
  getCooldownConfig,
  setCooldownUntilTimestamp,
  getCooldownUntilTimestamp,
  checkCooldownActive,
  getLastSnoozeDurationMs,
  setLastSnoozeDurationMs,
} from '~/chrome'

chrome.runtime.onInstalled.addListener((details) => {
  const installed = details.reason === chrome.runtime.OnInstalledReason.INSTALL
  if (installed)
    openOptionsPage()
  
  setupSnooze()
  setupCooldown()
})

let snoozeInterval: NodeJS.Timeout
let cooldownInterval: NodeJS.Timeout

async function snoozeTick() {
  const now = Date.now()
  const until = await getSnoozedUntilTimestamp()
  const diff = until - now

  if (diff <= 0) {
    clearInterval(snoozeInterval)

    const cooldownConfig = await getCooldownConfig()
    let cooldownDurationMs = 0
    let calculatedFixedMs = 0
    let calculatedPercentageMs = 0

    if (cooldownConfig.enabled) {
      const lastSnoozeMs = await getLastSnoozeDurationMs()

      if (lastSnoozeMs > 0 && cooldownConfig.mode !== 'fixed')
        calculatedPercentageMs = lastSnoozeMs * (cooldownConfig.percentage / 100)

      if (cooldownConfig.mode !== 'percentage')
        calculatedFixedMs = cooldownConfig.minutes * 60 * 1000

      if (cooldownConfig.mode === 'fixed')
        cooldownDurationMs = calculatedFixedMs
      
      else if (lastSnoozeMs > 0 && cooldownConfig.mode === 'percentage')
        cooldownDurationMs = calculatedPercentageMs
      
      else if (cooldownConfig.mode === 'hybrid') 
        cooldownDurationMs = Math.max(calculatedFixedMs, calculatedPercentageMs)

      if (lastSnoozeMs > 0 && cooldownConfig.mode !== 'fixed')
        await setLastSnoozeDurationMs(0)
    }

    if (cooldownDurationMs > 0) {
      const cooldownEndTime = Date.now() + cooldownDurationMs
      await setCooldownUntilTimestamp(cooldownEndTime)
    } else {
      await setCooldownUntilTimestamp(0)
      await chrome.action.setBadgeText({ text: '' })
    }

    await setSnoozedUntilTimestamp(0)
    return
  }

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  await chrome.action.setBadgeText({ text: minutes.toString() })
  await chrome.action.setBadgeBackgroundColor({ color: '#0d6efd' })
  await chrome.action.setBadgeTextColor({ color: '#FFFFFF' })
}

async function setupSnooze() {
  clearInterval(snoozeInterval)
  const snoozed = await checkSnoozed()
  const isCooldownActive = await checkCooldownActive()
  if (!snoozed) {
    if (!isCooldownActive) 
      await chrome.action.setBadgeText({ text: '' })
    return
  }

  await snoozeTick()
  snoozeInterval = setInterval(() => snoozeTick(), 1000)
}


async function cooldownTick() {
  const now = Date.now()
  const until = await getCooldownUntilTimestamp()
  const diff = until - now

  if (diff <= 0) {
    clearInterval(cooldownInterval)
    await setCooldownUntilTimestamp(0)
    return
  }

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  await chrome.action.setBadgeText({ text: minutes.toString() })
  await chrome.action.setBadgeBackgroundColor({ color: '#fd7e14' })
  await chrome.action.setBadgeTextColor({ color: '#FFFFFF' })

}

async function setupCooldown() {
  clearInterval(cooldownInterval)
  const snoozed = await checkSnoozed()
  const isCooldownActive = await checkCooldownActive()
  
  if (!isCooldownActive) {
    if (!snoozed) {
      await chrome.action.setBadgeText({ text: '' })
    }
    return
  }

  await cooldownTick()
  cooldownInterval = setInterval(cooldownTick, 1000)
}

chrome.runtime.onStartup.addListener(() => {
  setLastSnoozeDurationMs(0).then(() => {
    setupCooldown()
    setupSnooze()
  })
})

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') {
    const snoozeChanged = !!changes.snoozedUntilTimestamp
    const cooldownChanged = !!changes.cooldownUntilTimestamp || !!changes.userConfig

    if (cooldownChanged) {
      setupCooldown()
    }
    if (snoozeChanged) {
      setupSnooze()
    }
  }
})

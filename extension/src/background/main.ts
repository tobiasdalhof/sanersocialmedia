chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL)
    chrome.runtime.openOptionsPage()
})

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage()
})

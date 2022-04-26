chrome.runtime.onInstalled.addListener((details) => {
  if (!details.previousVersion)
    chrome.runtime.openOptionsPage()
})

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage()
})

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage()
})

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage()
})

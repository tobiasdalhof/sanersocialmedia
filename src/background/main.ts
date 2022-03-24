chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: chrome.runtime.getURL('dist/options/index.html'),
    active: true,
  })
})

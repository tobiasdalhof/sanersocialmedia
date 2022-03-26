import { getOptionsURL } from '../helpers'

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: getOptionsURL(),
    active: true,
  })
})

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: getOptionsURL(),
    active: true,
  })
})

import { getOptionsURL } from '../helpers'

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: getOptionsURL(),
    active: true,
  })
})

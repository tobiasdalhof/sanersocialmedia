export function getOptionsURL(): string {
  return chrome.runtime.getURL('dist/options/index.html')
}

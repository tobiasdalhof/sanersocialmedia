import type { Site } from '../site'

export default class SiteService {
  getSiteByUrl(sites: Site[], url: URL) {
    return sites.find(site => site.isValidUrl(url))
  }
}

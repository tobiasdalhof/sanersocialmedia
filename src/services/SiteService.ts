import type Site from '../lib/Site'

export class SiteService {
  getSiteByUrl(sites: Site[], url: URL) {
    return sites.find(site => site.isValidUrl(url))
  }
}

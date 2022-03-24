import githubSvg from 'super-tiny-icons/images/svg/github.svg'
import youtubeSvg from 'super-tiny-icons/images/svg/youtube.svg'
import twitterSvg from 'super-tiny-icons/images/svg/twitter.svg'
import linkedinSvg from 'super-tiny-icons/images/svg/linkedin.svg'
import pinterestSvg from 'super-tiny-icons/images/svg/pinterest.svg'
import tiktokSvg from 'super-tiny-icons/images/svg/tiktok.svg'
import instagramSvg from 'super-tiny-icons/images/svg/instagram.svg'
import twitchSvg from 'super-tiny-icons/images/svg/twitch.svg'
import redditSvg from 'super-tiny-icons/images/svg/reddit.svg'
import facebookSvg from 'super-tiny-icons/images/svg/facebook.svg'
import type { Site } from './types'

export const youtube: Site = {
  name: 'YouTube',
  logo: youtubeSvg,
  actions: [
    { name: 'Hide feed on home page' },
    { name: 'Hide sidebar on video page' },
    { name: 'Hide comments on video page' },
  ],
}

export const instagram: Site = {
  name: 'Instagram',
  logo: instagramSvg,
  actions: [
    { name: 'Hide feed on home page' },
    { name: 'Hide post comments' },
  ],
}

export const twitter: Site = {
  name: 'Twitter',
  logo: twitterSvg,
  actions: [
    { name: 'Hide feed on home page' },
    { name: 'Hide trends in sidebar' },
  ],
}

export const reddit: Site = {
  name: 'Reddit',
  logo: redditSvg,
  actions: [
    { name: 'Hide feed on home page' },
  ],
}

export const tiktok: Site = {
  name: 'TikTok',
  logo: tiktokSvg,
  actions: [
    { name: 'Hide feed on home page' },
  ],
}

export const twitch: Site = {
  name: 'Twitch',
  logo: twitchSvg,
  actions: [
    { name: 'Hide feed on home page' },
  ],
}

export const facebook: Site = {
  name: 'Facebook',
  logo: facebookSvg,
  actions: [
    { name: 'Hide feed on home page' },
  ],
}

export const linkedin: Site = {
  name: 'LinkedIn',
  logo: linkedinSvg,
  actions: [
    { name: 'Hide feed on home page' },
  ],
}

export const pinterest: Site = {
  name: 'Pinterest',
  logo: pinterestSvg,
  actions: [
    { name: 'Hide feed on home page' },
  ],
}

export const github: Site = {
  name: 'GitHub',
  logo: githubSvg,
  actions: [
    { name: 'Hide feed on home page' },
  ],
}

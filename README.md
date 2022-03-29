# Saner Social Media

Chrome extension for replacing addictive and annoying social media site features with inspirational quotes.

YouTube home example:

![YouTube Home](./screenshots/youtube-home.png)

Extension options:

![Options](./screenshots/options.png)

## Supported sites & features

- YouTube
  - Hide feed on home page
  - Hide related videos in sidebar on video page
  - Hide comments on video page
- Twitter
  - Hide feed on home page
  - Hide trends in sidebar
  - Hide follow suggestions in sidebar
- Instagram
  - Hide feed on home page
- Facebook
  - Hide feed on home page
- TikTok
  - Hide feed on home page
- LinkedIn
  - Hide feed on home page
  - Hide trending news in sidebar
- Twitch
  - Hide feed on home page
- Reddit
  - Hide feed on home page
- GitHub
  - Hide feed on home page
- 1600+ inspirational quotes
- Support for dark mode and light mode of all sites

## Installation

**Option 1** – Install it from the Chrome Web Store (COMING SOON!)

**Option 2** – Install from source:

- Clone this repo
- Install dependencies with `pnpm install`
- Build project with `pnpm build`
- Open `chrome://extensions/` in Chrome
  - Enable `Developer mode`
  - Click `Load unpacked` and select the `extension` directory

## Development

- Clone this repo
- Install dependencies with `pnpm install`
- Start dev watchers with `pnpm dev`
- Open `chrome://extensions/` in Chrome
  - Enable `Developer mode`
  - Click `Load unpacked` and select the `extension` directory

Note: HMR for the options page is [not possible yet](https://github.com/antfu/vitesse-webext/issues/59#issuecomment-1011008367). 

## Acknowledgements

Special thanks goes to [@jordwest](https://github.com/jordwest) for creating [News Feed Eradicator](https://github.com/jordwest/news-feed-eradicator) which obviosly was a big inspiration for me. I created this extension to add support for more social media sites.

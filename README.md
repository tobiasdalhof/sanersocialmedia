[![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/stars/opnoobcmpioggidgaejfkbopdphbfkkk?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk)
[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/opnoobcmpioggidgaejfkbopdphbfkkk?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk)

# Saner Social Media

Chrome extension for replacing addictive and annoying features of various social media sites with inspirational quotes.

- [Saner Social Media](#saner-social-media)
  - [Features](#features)
  - [Installation](#installation)
  - [Development](#development)
  - [Support this project](#support-this-project)
  - [Acknowledgements](#acknowledgements)

![YouTube Home](./screenshots/youtube-home.png)
![Twitter Home](./screenshots/twitter-home.png)
![Options](./screenshots/options.png)

## Features

- Support for YouTube
  - Hide feed on home page
  - Hide related videos in sidebar on video page
  - Hide comments on video page
- Support for Twitter
  - Hide feed on home page
  - Hide trends in sidebar
  - Hide follow suggestions in sidebar
- Support for Instagram
  - Hide feed on home page
- Support for Facebook
  - Hide feed on home page
- Support for TikTok
  - Hide feed on home page
- Support for LinkedIn
  - Hide feed on home page
  - Hide trending news in sidebar
- Support for Twitch
  - Hide feed on home page
- Support for Reddit
  - Hide feed on home page
- Support for GitHub
  - Hide feed on home page
- 1600+ inspirational quotes

## Installation

**Option 1** – Install from [Chrome Web Store](https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk)

**Option 2** – Install from GitHub release:

- Navigate to [releases](https://github.com/tobidalhof/sanersocialmedia/releases)
- Download `extension.zip` of your preferred release
- Unzip `extension.zip`
- Open `chrome://extensions/` in Chrome
  - Enable `Developer mode`
  - Click `Load unpacked` and select the unzipped `extension` directory

## Development

- Clone this repo
- Install dependencies with `pnpm install`
- Start dev watchers with `pnpm dev`
- Open `chrome://extensions/` in Chrome
  - Enable `Developer mode`
  - Click `Load unpacked` and select the `extension` directory

Note: HMR for the options page is [not possible yet](https://github.com/antfu/vitesse-webext/issues/59#issuecomment-1011008367). 

## Support this project

Please consider to support this free and open source project.

- Tell your friends
- Visit the [Chrome Web Store](https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk) and write a review
- Report bugs on GitHub

## Acknowledgements

Special thanks goes to [@jordwest](https://github.com/jordwest) for creating [News Feed Eradicator](https://github.com/jordwest/news-feed-eradicator) which obviously was a big inspiration for me. I created this extension to add support for more social media sites.

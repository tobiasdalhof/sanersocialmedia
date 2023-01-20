<p>
  <a href="https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk"><img src="https://img.shields.io/chrome-web-store/v/opnoobcmpioggidgaejfkbopdphbfkkk?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Chrome Web Store"></a>
  <a href="https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk"><img src="https://img.shields.io/chrome-web-store/rating/opnoobcmpioggidgaejfkbopdphbfkkk?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Chrome Web Store Rating"></a>
  <a href="https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk"><img src="https://img.shields.io/chrome-web-store/users/opnoobcmpioggidgaejfkbopdphbfkkk?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Chrome Web Store Users"></a>
</p>

# Saner Social Media

Block social media distractions and replace them with uplifting quotes to improve your mental well-being.

![Twitter Home](./.github/twitter-home.png)

## Supported sites and feature highlights

- YouTube
- Twitter
- Instagram
- Facebook
- TikTok
- Pinterest
- LinkedIn
- Twitch
- Reddit
- GitHub
- 1600+ inspirational quotes
- Works with dark and light themes

## Installation

**Option 1** – Install from [Chrome Web Store](https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk)

**Option 2** – Install from GitHub release:

- Navigate to [releases](https://github.com/tobiasdalhof/sanersocialmedia/releases)
- Download `extension.zip` of your preferred release
- Open `chrome://extensions/` in Chrome and drag the downloaded `extension.zip` into the page

## Development

- Clone this repo
- Install dependencies with `pnpm i -r`
- `cd` into `extension` directory with `cd extension`
- Start dev watchers with `pnpm dev`
- Open `chrome://extensions/` in Chrome
  - Enable `Developer mode`
  - Click `Load unpacked` and select the `extension/dev` directory

Note: HMR for the options page is [not possible yet](https://github.com/antfu/vitesse-webext/issues/59#issuecomment-1011008367). 

## Acknowledgements

Special thanks goes to [@jordwest](https://github.com/jordwest) for creating [News Feed Eradicator](https://github.com/jordwest/news-feed-eradicator) which obviously was a big inspiration for me. I created this extension to add support for more social media sites.

Inspirational quotes provided by [dwyl/quotes](https://github.com/dwyl/quotes/blob/main/quotes.json).

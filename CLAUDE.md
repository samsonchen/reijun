# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website clone of 睿均工程 (Rui Jun Engineering), a high-pressure water jet drain cleaning service company based in Kaohsiung, Taiwan. The site is hosted on GitHub Pages with custom domain `24684019.com.tw`.

## Structure

### HTML Pages
- `index.html` - Homepage with banner carousel and featured projects
- `Profile.html` - About page (關於睿均)
- `Service.html` - Services page (服務項目)
- `Category-{1-8}.html` - Experience/projects by category (相關經歷)
  - Category-1: 相關經歷 (main)
  - Category-2: 工業區
  - Category-3: 商業大樓
  - Category-4: 餐廳
  - Category-5: 一般住宅大樓
  - Category-7: 一般透天
  - Category-8: 政府機關
- `news.html` - News page (最新消息)
- `movie.html` - Videos page (影片專區)
- `contact.html` - Contact page with phone/email info (聯絡我們)
- `product-*.html` - Individual project detail pages (N001-N008, 20230129)

### Assets
- `assets/` - CSS, JS, and fonts (Bootstrap, Font Awesome, custom styles)
- `ec99/` - Additional CSS and JS (jQuery, shopping tab styles)
- `images/` - All images including banners, product photos, and icons
- `js/` - Additional JavaScript files
- `ShareFile/` - Validation scripts
- `rwd1350/store/f1/` - Favicon

### Configuration
- `CNAME` - Custom domain configuration for `24684019.com.tw`

## Notes

- This is a static site converted from ASP. Dynamic features (contact form, shopping cart) have been removed or hidden.
- All image and asset paths have been converted to relative local paths.
- The inquiry cart (詢價車) elements are hidden via CSS.
- The browse mode selector (瀏覽方式) is hidden as the alternate view pages don't exist.

## Deployment

The site is deployed on GitHub Pages:
- Repository: `samsonchen/reijun`
- Custom domain: `24684019.com.tw`
- Branch: `main`

## Reference

The original content was hosted in HiWinner, DNS A Rec IP: 210.71.232.149

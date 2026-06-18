# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static Jekyll site for Meta Yoga (metayoga.com) — a hot/warm yoga studio. Deployed via GitHub Pages (the `url` in `_config.yml` is the production domain).

## Commands

```bash
bundle install              # install Jekyll + plugins
bundle exec jekyll serve    # local dev server at http://127.0.0.1:4000 with live rebuild
bundle exec jekyll build    # build into _site/
```

There are no tests, linters, or JS build step — CSS/JS under `css/` and `js/` are vendored libraries (Bootstrap, jQuery, AOS, Owl Carousel, Magnific Popup, etc.) plus a hand-edited `js/main.js`. SCSS sources live in `scss/` but the served stylesheet is `css/style.css`; if you edit SCSS, regenerate `css/style.css` manually (no Jekyll Sass pipeline is wired up here).

## Architecture

- Each top-level `*.html` is a standalone Jekyll page with front matter (`layout: default`, `title`, `canonical_url`, optional `sitemap.priority`). New pages should follow that same front-matter pattern so they get the shared chrome and SEO tags.
- `_layouts/default.html` is the only layout and just stitches together the includes:
  1. `_includes/header.html` — `<head>`, jekyll-seo-tag, asset links
  2. `_includes/navigation.html` — top nav (update here when adding/removing pages)
  3. page `{{ content }}`
  4. `_includes/footer.html` — footer + script tags
- `_includes/schema.html` is JSON-LD structured data, included only by `index.html`.
- Plugins (declared in `_config.yml` and `Gemfile`): `jekyll-seo-tag` (consumes the `title`/`canonical_url` front matter) and `jekyll-last-modified-at`.
- `sitemap.xml` and `robots.txt` are checked-in static files — when adding a page, add it to `sitemap.xml` manually.
- Gallery images are split into `gallery/` (full-size) and `gallery-thumbs/` (thumbnails); keep both in sync when adding photos.

## Content conventions

Pricing, schedule, and instructor copy (e.g. `rates.html`, `schedule.html`, `dana.html`, `travis.html`) change frequently — recent commits are almost entirely copy tweaks. When editing these, leave the surrounding Bootstrap markup alone and only touch the text/numbers.

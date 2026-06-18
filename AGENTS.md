# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static Jekyll site for Meta Yoga (metayoga.com) — a hot/warm yoga studio in Ocean City, MD. Deployed via GitHub Pages from `main` (the `url` in `_config.yml` is the production domain).

## Commands

```bash
bundle install              # install Jekyll + plugins
bundle exec jekyll serve    # local dev server at http://127.0.0.1:4000
bundle exec jekyll build    # build into _site/
```

No tests, no linter, no JS/CSS build step. `css/style.css` is the theme bundle (hand-edited / shipped as-is) — there is no SCSS pipeline anymore.

## Architecture

- One top-level `*.html` per page (index, story, classes, events, schedule, rates, faq, contact, dana, travis, infrared). Each has front matter:
  ```yaml
  ---
  layout: default
  title: ...
  description: ...        # used by jekyll-seo-tag for <meta description> + OG
  canonical_url: 'https://metayoga.com/<slug>'
  ---
  ```
- `_layouts/default.html` is the only layout. It composes:
  1. `_includes/header.html` — `<head>`, jekyll-seo-tag, asset links
  2. `_includes/navigation.html` — top nav, **data-driven** from `_data/nav.yml`; the active link gets `aria-current="page"` automatically
  3. page `{{ content }}`
  4. `_includes/schema.html` — schema.org JSON-LD, emitted on **every** page
  5. `_includes/footer.html` — footer markup + global script tags
- Shared content includes you should reuse instead of repeating markup:
  - `_includes/page-heading.html` — the standard "kicker + h2" block. Use `{% include page-heading.html kicker="Foo" title="Foo Bar" %}` (optional `col=7` to narrow it).
  - `_includes/gallery-grid.html` — 4-up gallery section, driven by a list of basenames in `_data/galleries.yml` (e.g. `images=site.data.galleries.studio`).
  - `_includes/rate-card.html` — single pricing card, takes one item from `_data/rates.yml`.
- Plugins (declared in `_config.yml` + `Gemfile`):
  - `jekyll-seo-tag` — consumes `title` / `description` / `canonical_url` front matter
  - `jekyll-last-modified-at`
- `sitemap.xml` is a hand-rolled template that auto-iterates `site.pages` — **you don't need to edit it when adding a page**.

## Data files (`_data/`)

Most "content" lives here, not in HTML. Edit the data file, not the markup.

- `_data/nav.yml` — top-nav items (`title`, `url`, `match`). Add an entry here when you add a new page.
- `_data/rates.yml` — ordered list of pricing groups → cards. Each card has `title`, `price`, `excerpt`, `tagline`, and a `cta` that drives the Buy button (`healcode_pricing` + `service_id`, `healcode_contract` + `contract_id`, or `studio_only` for the in-studio-only placeholder).
- `_data/galleries.yml` — per-page mini-gallery image lists (`studio`, `dana`). Each list is basenames under `images/`.

## Asset loading rules

- `_includes/header.html` links only the stylesheets that are actually used; do not add unused vendor CSS.
- `_includes/footer.html` loads the global JS bundle. Two conditional loads:
  - `js/jquery.animateNumber.min.js` — only on `/rates.html`.
  - Google Maps API + `js/google-map.js` — only on `/contact.html`.
- The Healcode CDN script must stay global (the nav login widget uses it on every page).
- Plugin scripts that aren't loaded should not be referenced by `js/main.js` — when removing a vendor lib, also strip its init call there.

## Home-page gallery

`index.html` renders **every** `*.jpg` under `gallery/` into a single `<div class="row" id="home-gallery">` (with thumbnails resolved from `gallery-thumbs/` by suffixing `t.jpg`). On page load, a Fisher–Yates block near the top of `js/main.js` reorders those children in-place, so each visitor sees a different order. Drop new images into `gallery/` + a matching `*t.jpg` thumb into `gallery-thumbs/` — Jekyll picks them up automatically; no shuffle commit needed.

## Content conventions

- Pricing, schedule, and instructor copy are the things that actually change. Pricing → `_data/rates.yml`. Schedule and class lists are Healcode widgets (no edits needed in this repo when they change). Instructor copy → `dana.html` / `travis.html`.
- When you have to touch HTML, leave the surrounding Bootstrap grid alone and only edit the text/numbers/links.
- Form fields on `contact.html` use visually-hidden `<label class="sr-only" for=...>` — keep that pattern for accessibility when adding fields.

## Accessibility & SEO checklist when adding pages or images

- Front matter has `description:` (jekyll-seo-tag turns it into `<meta description>` + Open Graph).
- Every `<img>` has `alt`, plus `loading="lazy"` if it's below the fold.
- New pages get added to `_data/nav.yml`. The active-state highlight and `aria-current` come for free.

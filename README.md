# metayoga.com

Source for **[metayoga.com](https://metayoga.com)** — the website for Meta Yoga, a Hot and Warm Yoga studio in Ocean City, Maryland.

Static [Jekyll](https://jekyllrb.com/) site, deployed via GitHub Pages.

## Local development

Requires Ruby + Bundler.

```bash
bundle install
bundle exec jekyll serve
```

Then open http://127.0.0.1:4000. Jekyll watches the tree and rebuilds on save.

To produce a one-off build into `_site/`:

```bash
bundle exec jekyll build
```

## Project layout

```
.
├── *.html              # One Jekyll page per top-level file (index, classes,
│                       #   rates, schedule, story, dana, travis, faq, etc.)
├── _config.yml         # Jekyll config and plugin list
├── _data/              # Content lifted out of HTML for easy editing:
│   ├── nav.yml         #   site navigation
│   ├── rates.yml       #   pricing cards
│   └── galleries.yml   #   per-page mini-galleries
├── _includes/          # Shared chunks pulled into pages by the layout
│   ├── header.html
│   ├── navigation.html
│   ├── footer.html
│   ├── schema.html         # schema.org JSON-LD
│   ├── page-heading.html   # standard kicker + h2 block
│   ├── gallery-grid.html   # 4-up gallery section
│   └── rate-card.html      # individual pricing card
├── _layouts/
│   └── default.html    # The only layout — composes the includes above
├── css/                # Vendor and theme stylesheets
├── js/                 # Vendor scripts plus main.js
├── images/             # Logos, portraits, page imagery
├── gallery/            # Full-size home-page gallery photos
├── gallery-thumbs/     # Matching thumbnails for the home-page gallery
├── fonts/              # Icon-font assets (icomoon, ionicons, open-iconic)
├── sitemap.xml         # Hand-rolled sitemap (auto-includes every page)
└── robots.txt
```

## Editing content

Most updates are content tweaks, not code:

- **Class schedule, ratings, login** — handled by external Healcode widgets embedded on `classes.html`, `events.html`, `rates.html`, `schedule.html`, and the nav login link. Nothing to change in this repo when the schedule moves around.
- **Pricing** — edit `_data/rates.yml`. The cards on `rates.html` are generated from this file.
- **Navigation links / order** — edit `_data/nav.yml`. The active page is highlighted automatically.
- **Mini-galleries on Classes / Events / Dana** — edit `_data/galleries.yml`. Each list points at images in `images/`.
- **Home-page gallery** — drop a JPEG into `gallery/` plus a thumbnail with the same basename and `t.jpg` suffix into `gallery-thumbs/`. The home page picks them up automatically and randomizes the order in the browser on every page load.
- **Page copy** — edit the relevant `*.html`. Each page has YAML front matter with `title`, `description`, and `canonical_url`; `description` feeds the `<meta name="description">` and Open Graph tags via `jekyll-seo-tag`.
- **Instructor bios** — `dana.html` and `travis.html`.

## Adding a new page

1. Create `mypage.html` at the repo root with front matter:

   ```yaml
   ---
   layout: default
   title: My Page
   description: One sentence shown in search results and link previews.
   canonical_url: 'https://metayoga.com/mypage'
   ---
   ```

2. Add an entry to `_data/nav.yml` so it appears in the menu.

`sitemap.xml` picks up new pages automatically.

## Plugins

- [`jekyll-seo-tag`](https://github.com/jekyll/jekyll-seo-tag) — renders `<title>`, meta description, canonical URL, and Open Graph / Twitter Card tags from page front matter.
- [`jekyll-last-modified-at`](https://github.com/gjtorikian/jekyll-last-modified-at) — exposes the last-modified date of each page.

## Deployment

The `main` branch is published by GitHub Pages.

## License

The site theme was adapted from a third-party HTML template; see `LICENSE`. Site content (copy, photographs, logos) © Meta Yoga.

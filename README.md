# Bibek Shrestha Real Estate Website

A Hostinger-ready static website that keeps Bibek's personal branding around Keller Williams tools.

## Included pages

- `/` — Personal homepage
- `/search-homes/`
- `/home-value/`
- `/mortgage-calculator/`
- `/book-consultation/`
- `/school-search/`
- `/reviews/`
- `/blog/`

## Contact and brokerage details

Open:

`assets/js/config.js`

The phone, email, California DRE number, and Keller Williams market center are configured in this file.

## 2. Confirm every KW URL

All Keller Williams links are stored in:

`assets/js/config.js`

The supplied paths use common KW page slugs. Confirm them inside Bibek's actual KW website/dashboard before launch.

## 3. Replace temporary images

The mock uses remote Unsplash images in `assets/css/styles.css`. For production:

1. Add approved photos under `assets/images/`
2. Replace the remote `url(...)` entries in the CSS
3. Use Bibek's own professional headshot and properly licensed property photos

## 4. Run locally

Because browsers restrict some iframe behavior when opening HTML directly from a filesystem, use a local server:

```bash
python3 -m http.server 8000
```

Then open:

`http://localhost:8000`

## 5. Publish with Hostinger

1. Push the site files to the `main` branch of `bibekhomes-website`.
2. In Hostinger Git deployment, use the repository URL ending in `.git`.
3. Set the branch to `main` and leave the directory blank.
4. Deploy the latest commit into `public_html`.

## Important iframe limitation

KW controls whether `bibek.kw.com` may be embedded in an iframe. If its browser security policy blocks framing, no front-end JavaScript can override that. Each page therefore includes an “Open Tool” fallback.

Do not reverse proxy, scrape, or remove required KW attribution without written approval.

## Domain

The production domain is `bibekhomes.com` and is managed through Hostinger.

## Compliance checklist

Before publishing, confirm with Bibek's broker:

- Correct brokerage name/logo requirements
- California DRE license formatting and visibility
- Equal Housing and REALTOR® trademark requirements
- Advertising disclaimers
- Privacy policy and lead-consent language

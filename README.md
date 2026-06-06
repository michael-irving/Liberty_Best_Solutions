# Liberty Best Solutions — Website

The marketing website for **Liberty Best Solutions** — helping established business
owners build a business that runs, grows, and holds its value without depending on them.

> You built it. Now let it work for you.

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `about.html` | About |
| `services.html` | Services (Liberate · Systemize · Exit-Ready) |
| `contact.html` | Contact (with discovery-call form) |

## Structure

```
.
├── index.html      # Home
├── about.html      # About
├── services.html   # Services
├── contact.html    # Contact
├── styles.css      # Shared stylesheet (design system, layout, components)
└── app.js          # Shared interactions (sticky nav, mobile menu,
                    #   scroll reveals, contact-form validation)
```

This is a **static site** — plain HTML, CSS, and vanilla JavaScript. No build step,
no dependencies, no framework. Fonts (Spectral + Hanken Grotesk) load from Google Fonts.

## Running locally

Because the pages share `styles.css` and `app.js`, open the site through a local
web server rather than double-clicking the file (some browsers restrict shared
assets on the `file://` protocol).

```bash
# From inside this folder, pick whichever you have:
python3 -m http.server 8000      # then open http://localhost:8000
# or
npx serve .
```

Or simply open `index.html` directly — it will work in most browsers.

## Deploying

Any static host works — no configuration required:

- **GitHub Pages** — push to a repo, then enable Pages on the `main` branch (root).
- **Netlify / Vercel / Cloudflare Pages** — point at the repo; no build command, publish directory `/`.

The custom domain is **www.libertybestsolutions.com**.

## Before going live — replace the placeholders

The following bracketed placeholders appear in the footer of every page and on the
Contact page. Search the project for each and drop in the real details:

- `[US business address]`
- `[US phone number]`
- `hello@libertybestsolutions.com` — confirm this is the address you want public

The contact form currently validates input and shows a success message **on the
client only** — it does not yet send anywhere. To receive submissions, wire the
`<form id="contact-form">` in `contact.html` to a form backend (e.g. Formspree,
Netlify Forms, or your own endpoint).

## Design system (quick reference)

- **Type:** Spectral (serif headlines) · Hanken Grotesk (body)
- **Color:** deep navy `#0e1f35` · warm stone `#f3efe7` · muted gold accent `#b08d4c`
- Tokens are defined as CSS custom properties at the top of `styles.css`.

---

© Liberty Best Solutions LLC. All rights reserved.

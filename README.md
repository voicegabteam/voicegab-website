# VoiceGab Website

Static marketing website for VoiceGab — the voice-first social messaging app.

## Tech Stack
- Pure HTML5 + CSS3 + Vanilla JavaScript
- Zero build tools — deploys directly to GitHub Pages
- Animated canvas hero, glassmorphism cards, scroll reveal

## Local Development
Open `index.html` directly in browser, or use a local server:
```bash
npx serve .
# or
python -m http.server 8080
```

## Deployment
Push to `main` branch. GitHub Actions automatically deploys to GitHub Pages.
Only the site files (`*.html`, `assets/`, `CNAME`, `favicon.ico`, `robots.txt`, `sitemap.xml`) are published — see `.github/workflows/deploy.yml`.
If you add a new top-level file the site needs, add it to the copy step there.

## Custom Domain Setup
1. `CNAME` is set to `voicegab.com`
2. In your DNS provider, add:
   - A records pointing to GitHub Pages IPs:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   - Optional CNAME record: `www` → `voicegabteam.github.io`
3. In GitHub repo Settings → Pages → Custom domain → enter your domain
4. Enable "Enforce HTTPS"

## Pages
- `/` — Landing page
- `/features` — Feature showcase
- `/download` — App Store + Play Store
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service
- `/cookies` — Cookie Policy
- `/support` — FAQ + Contact

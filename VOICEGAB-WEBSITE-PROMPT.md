# VoiceGab — World-Class Static Website
## Complete Claude Code Build Prompt for GitHub Pages

---

## HOW TO USE THIS FILE

Paste the entire contents of the **"CLAUDE CODE PROMPT"** section below into a Claude Code terminal session opened inside your website project folder. Claude Code will build every file from scratch.

---

## TECH STACK DECISION

| Concern | Choice | Why |
|---|---|---|
| Framework | **Pure HTML5 + CSS3 + Vanilla JS** | Zero build tools, instant GitHub Pages deploy, zero dependency rot |
| CSS | **Custom design system with CSS variables** | Full control, no Tailwind purge config, instant dark theme |
| Animations | **GSAP 3 (CDN) + Intersection Observer** | Industry-standard scroll animations, 60fps |
| Icons | **Lucide Icons (CDN SVG sprite)** | Crisp, consistent, MIT licensed |
| Fonts | **Inter + Space Grotesk (Google Fonts)** | Used by Linear, Vercel, Stripe — industry gold standard |
| Hosting | **GitHub Pages + GitHub Actions CI** | Free, fast, custom domain, auto HTTPS |
| Analytics | **Plausible snippet (optional)** | Privacy-first, GDPR compliant |

---

## PAGES TO BUILD

| File | Route | Purpose |
|---|---|---|
| `index.html` | `/` | Hero landing — converts visitors to downloads |
| `features.html` | `/features` | Deep feature showcase |
| `download.html` | `/download` | App Store + Google Play + QR code |
| `privacy.html` | `/privacy` | Privacy Policy (required for app stores) |
| `terms.html` | `/terms` | Terms of Service |
| `support.html` | `/support` | FAQ + contact form |
| `404.html` | `*` | Custom 404 page |

---

## DESIGN SYSTEM SPECIFICATION

### Color Palette
```
--color-bg-primary:     #080B14   /* Deep space black */
--color-bg-secondary:   #0D1117   /* GitHub-dark card bg */
--color-bg-card:        #111827   /* Card surfaces */
--color-bg-elevated:    #1A2035   /* Elevated elements */

--color-accent-primary: #7C3AED   /* Electric violet — brand */
--color-accent-glow:    #8B5CF6   /* Lighter violet for glow */
--color-accent-purple:  #6D28D9   /* Deep violet */
--color-accent-pink:    #EC4899   /* Hot pink — secondary CTA */
--color-accent-cyan:    #06B6D4   /* Cyan — waveform color */

--color-text-primary:   #F9FAFB   /* White-ish body text */
--color-text-secondary: #9CA3AF   /* Muted gray */
--color-text-tertiary:  #6B7280   /* Dimmed text */

--gradient-hero:  linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #06B6D4 100%)
--gradient-card:  linear-gradient(145deg, rgba(124,58,237,0.15), rgba(6,182,212,0.05))
--gradient-glow:  radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.35), transparent)
```

### Typography Scale
```
--font-display: 'Space Grotesk', sans-serif   /* Headlines */
--font-body:    'Inter', sans-serif            /* Body */

Hero H1:   clamp(48px, 7vw, 96px), weight 800, letter-spacing -0.04em
Section H2: clamp(32px, 4vw, 56px), weight 700, letter-spacing -0.03em
Card H3:   24px, weight 600
Body:      16px/1.7, weight 400
Small:     14px, weight 400
```

### Spacing & Radius
```
Section padding: 120px vertical (80px mobile)
Card padding:    32px
Border radius:   --radius-sm: 8px / --radius-md: 16px / --radius-lg: 24px / --radius-xl: 32px
```

### Visual Signature
- **Glassmorphism cards**: `background: rgba(255,255,255,0.03)` + `backdrop-filter: blur(20px)` + `border: 1px solid rgba(255,255,255,0.06)`
- **Glow effects**: `box-shadow: 0 0 60px rgba(124,58,237,0.3)` behind hero elements
- **Animated waveform**: SVG path animation in hero using CSS `@keyframes`
- **Noise texture overlay**: subtle SVG noise over hero `<canvas>` for depth
- **Gradient borders**: `border-image: linear-gradient(...)` or pseudo-element technique
- **Scroll-triggered reveals**: `opacity: 0 → 1` + `translateY(30px → 0)` via Intersection Observer

---

---

# ═══════════════════════════════════════════════
# CLAUDE CODE PROMPT — PASTE EVERYTHING BELOW
# ═══════════════════════════════════════════════

```
You are a world-class frontend engineer and UI/UX designer. Build the complete VoiceGab marketing website — a voice-first social messaging app (think WhatsApp but 100% voice messages with AI voice filters).

## PROJECT SETUP

Create this exact directory structure:

```
voicegab-website/
├── index.html
├── features.html
├── download.html
├── privacy.html
├── terms.html
├── support.html
├── 404.html
├── assets/
│   ├── css/
│   │   ├── design-system.css       ← CSS variables, resets, typography
│   │   ├── components.css          ← Navbar, buttons, cards, footer
│   │   └── animations.css          ← Keyframes, scroll reveal classes
│   ├── js/
│   │   ├── main.js                 ← Navbar scroll, mobile menu, scroll reveal
│   │   ├── waveform.js             ← Canvas animated waveform for hero
│   │   └── counter.js              ← Animated number counter on scroll
│   └── img/
│       ├── og-image.jpg            ← 1200×630 Open Graph image (generate SVG placeholder)
│       ├── app-icon.svg            ← 512×512 app icon SVG
│       └── screenshots/            ← Placeholder SVG mockups (3 screens)
├── .github/
│   └── workflows/
│       └── deploy.yml              ← GitHub Actions deploy to gh-pages branch
├── CNAME                           ← Custom domain file
└── README.md
```

---

## DESIGN SYSTEM — design-system.css

Create `assets/css/design-system.css` with:

```css
/* ═══════════════════════════════
   VOICEGAB DESIGN SYSTEM v1.0
═══════════════════════════════ */

:root {
  /* Colors */
  --bg-primary:    #080B14;
  --bg-secondary:  #0D1117;
  --bg-card:       #111827;
  --bg-elevated:   #1A2035;

  --accent:        #7C3AED;
  --accent-glow:   #8B5CF6;
  --accent-deep:   #6D28D9;
  --accent-pink:   #EC4899;
  --accent-cyan:   #06B6D4;

  --text-primary:   #F9FAFB;
  --text-secondary: #9CA3AF;
  --text-muted:     #6B7280;

  --gradient-brand: linear-gradient(135deg, #7C3AED 0%, #EC4899 60%, #06B6D4 100%);
  --gradient-card:  linear-gradient(145deg, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.04) 100%);
  --gradient-glow:  radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.3), transparent 70%);

  /* Typography */
  --font-display: 'Space Grotesk', -apple-system, sans-serif;
  --font-body:    'Inter', -apple-system, sans-serif;

  /* Spacing */
  --space-section: clamp(80px, 10vw, 120px);
  --space-card:    32px;

  /* Radius */
  --radius-sm:  8px;
  --radius-md:  16px;
  --radius-lg:  24px;
  --radius-xl:  32px;
  --radius-full: 9999px;

  /* Glass */
  --glass-bg:     rgba(255,255,255,0.03);
  --glass-border: 1px solid rgba(255,255,255,0.07);
  --glass-blur:   blur(20px);

  /* Shadows */
  --shadow-glow:   0 0 80px rgba(124,58,237,0.25);
  --shadow-card:   0 4px 32px rgba(0,0,0,0.4);
  --shadow-button: 0 4px 24px rgba(124,58,237,0.5);
}

/* ─── Reset ─── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; -webkit-font-smoothing: antialiased; }
body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  line-height: 1.7;
  overflow-x: hidden;
}
img, video, svg { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }

/* ─── Typography ─── */
.font-display { font-family: var(--font-display); }

h1, h2, h3, h4 {
  font-family: var(--font-display);
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

h1 { font-size: clamp(44px, 7vw, 88px); font-weight: 800; letter-spacing: -0.04em; }
h2 { font-size: clamp(32px, 4vw, 56px); font-weight: 700; }
h3 { font-size: clamp(20px, 2vw, 26px); font-weight: 600; }
h4 { font-size: 18px; font-weight: 600; }
p  { color: var(--text-secondary); font-size: 17px; line-height: 1.75; }

.text-gradient {
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-muted { color: var(--text-muted); font-size: 14px; }
.label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-glow);
}

/* ─── Container ─── */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 48px);
}
.container--narrow { max-width: 800px; }
.container--wide   { max-width: 1400px; }

/* ─── Sections ─── */
section { padding: var(--space-section) 0; position: relative; }

/* ─── Glass Card ─── */
.card {
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-card);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-card);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card), 0 0 40px rgba(124,58,237,0.15);
  border-color: rgba(124,58,237,0.25);
}

/* ─── Grid System ─── */
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }

@media (max-width: 1024px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
}

/* ─── Utility ─── */
.flex { display: flex; }
.flex-center { display: flex; align-items: center; justify-content: center; }
.flex-between { display: flex; align-items: center; justify-content: space-between; }
.gap-8  { gap: 8px; }
.gap-16 { gap: 16px; }
.gap-24 { gap: 24px; }
.gap-32 { gap: 32px; }
.gap-48 { gap: 48px; }
.text-center { text-align: center; }
.mt-8  { margin-top: 8px; }
.mt-16 { margin-top: 16px; }
.mt-24 { margin-top: 24px; }
.mt-32 { margin-top: 32px; }
.mt-48 { margin-top: 48px; }
.mt-64 { margin-top: 64px; }
```

---

## COMPONENTS — components.css

Create `assets/css/components.css` with these components:

### Buttons
```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  white-space: nowrap;
  text-decoration: none;
}
.btn--primary {
  background: var(--gradient-brand);
  color: #fff;
  box-shadow: var(--shadow-button);
}
.btn--primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 40px rgba(124,58,237,0.65);
}
.btn--primary:active { transform: scale(0.98); }

.btn--ghost {
  background: var(--glass-bg);
  color: var(--text-primary);
  border: var(--glass-border);
  backdrop-filter: var(--glass-blur);
}
.btn--ghost:hover {
  background: rgba(124,58,237,0.1);
  border-color: rgba(124,58,237,0.35);
  transform: translateY(-2px);
}

.btn--large { padding: 18px 40px; font-size: 17px; }
.btn--small { padding: 10px 20px; font-size: 13px; }

.btn-store {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  transition: all 0.25s ease;
  min-width: 200px;
}
.btn-store:hover {
  background: rgba(124,58,237,0.15);
  border-color: rgba(124,58,237,0.4);
  transform: translateY(-2px);
}
.btn-store__icon { width: 32px; height: 32px; flex-shrink: 0; }
.btn-store__text { display: flex; flex-direction: column; text-align: left; }
.btn-store__sub  { font-size: 10px; color: var(--text-muted); font-weight: 400; letter-spacing: 0.05em; }
.btn-store__name { font-size: 16px; font-weight: 700; }
```

### Navbar
```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 0;
  transition: all 0.35s ease;
}
.navbar.scrolled {
  padding: 12px 0;
  background: rgba(8,11,20,0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 4px 40px rgba(0,0,0,0.5);
}
.navbar__inner { display: flex; align-items: center; justify-content: space-between; }
.navbar__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.02em;
}
.navbar__logo-icon {
  width: 36px; height: 36px;
  background: var(--gradient-brand);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
}
.navbar__links {
  display: flex;
  align-items: center;
  gap: 36px;
  list-style: none;
}
.navbar__links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.2s;
}
.navbar__links a:hover { color: var(--text-primary); }
.navbar__links a.active { color: var(--accent-glow); }

.navbar__cta { display: flex; align-items: center; gap: 12px; }

/* Mobile menu */
.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 8px;
  background: none;
  border: none;
}
.navbar__hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}
.navbar__hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.navbar__hamburger.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.navbar__hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.navbar__mobile-menu {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(8,11,20,0.98);
  backdrop-filter: blur(24px);
  z-index: 999;
  padding: 100px 32px 32px;
  flex-direction: column;
  gap: 32px;
}
.navbar__mobile-menu.open { display: flex; }
.navbar__mobile-menu a {
  font-size: 28px;
  font-weight: 700;
  font-family: var(--font-display);
  color: var(--text-secondary);
  transition: color 0.2s;
}
.navbar__mobile-menu a:hover { color: var(--text-primary); }

@media (max-width: 768px) {
  .navbar__links, .navbar__cta .btn--ghost { display: none; }
  .navbar__hamburger { display: flex; }
}
```

### Hero Badge
```css
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(124,58,237,0.12);
  border: 1px solid rgba(124,58,237,0.3);
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 500;
  color: var(--accent-glow);
  margin-bottom: 24px;
}
.hero-badge__dot {
  width: 7px; height: 7px;
  background: var(--accent-glow);
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.75); }
}
```

### Feature Icon
```css
.feature-icon {
  width: 56px; height: 56px;
  border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  font-size: 26px;
  margin-bottom: 20px;
  background: var(--gradient-card);
  border: var(--glass-border);
  flex-shrink: 0;
}
.feature-icon--purple { background: rgba(124,58,237,0.15); border-color: rgba(124,58,237,0.2); }
.feature-icon--pink   { background: rgba(236,72,153,0.15); border-color: rgba(236,72,153,0.2); }
.feature-icon--cyan   { background: rgba(6,182,212,0.15);  border-color: rgba(6,182,212,0.2);  }
```

### Stats Bar
```css
.stat-card {
  text-align: center;
  padding: 32px 24px;
}
.stat-card__number {
  font-family: var(--font-display);
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  letter-spacing: -0.04em;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 8px;
}
.stat-card__label { font-size: 15px; color: var(--text-secondary); }
```

### Footer
```css
.footer {
  padding: 80px 0 40px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 64px;
}
.footer__brand p { color: var(--text-secondary); font-size: 14px; max-width: 280px; margin-top: 16px; }
.footer__col h5 {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 20px;
}
.footer__col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.footer__col a { font-size: 14px; color: var(--text-secondary); transition: color 0.2s; }
.footer__col a:hover { color: var(--text-primary); }
.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 32px;
  border-top: 1px solid rgba(255,255,255,0.05);
  flex-wrap: wrap;
  gap: 16px;
}
.footer__bottom p { font-size: 13px; color: var(--text-muted); }
.footer__social { display: flex; gap: 16px; }
.footer__social a {
  width: 36px; height: 36px;
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-secondary);
  font-size: 16px;
  transition: all 0.2s;
}
.footer__social a:hover { background: rgba(124,58,237,0.2); border-color: rgba(124,58,237,0.4); color: var(--text-primary); }

@media (max-width: 768px) {
  .footer__grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .footer__grid { grid-template-columns: 1fr; }
}
```

### Waveform decoration
```css
.waveform-bar {
  display: inline-block;
  width: 3px;
  border-radius: 2px;
  background: var(--accent-cyan);
  animation: wave-bar 1.2s ease-in-out infinite;
}
@keyframes wave-bar {
  0%, 100% { transform: scaleY(0.3); opacity: 0.4; }
  50%       { transform: scaleY(1);   opacity: 1;   }
}
.waveform-demo {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 40px;
}
/* Stagger 16 bars with individual animation-delay from 0s to 1.5s */
```

---

## ANIMATIONS — animations.css

```css
/* ─── Scroll Reveal ─── */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
}
.reveal.revealed { opacity: 1; transform: translateY(0); }
.reveal--delay-1 { transition-delay: 0.1s; }
.reveal--delay-2 { transition-delay: 0.2s; }
.reveal--delay-3 { transition-delay: 0.3s; }
.reveal--delay-4 { transition-delay: 0.4s; }
.reveal--delay-5 { transition-delay: 0.5s; }

/* ─── Float ─── */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-16px); }
}
.animate-float { animation: float 5s ease-in-out infinite; }
.animate-float-slow { animation: float 7s ease-in-out infinite; animation-delay: -2s; }

/* ─── Spin Slow ─── */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.animate-spin-slow { animation: spin-slow 20s linear infinite; }

/* ─── Gradient Shift ─── */
@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 6s ease infinite;
}

/* ─── Glow Pulse ─── */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 30px rgba(124,58,237,0.3); }
  50%       { box-shadow: 0 0 80px rgba(124,58,237,0.7); }
}
.animate-glow { animation: glow-pulse 3s ease-in-out infinite; }

/* ─── Number Ticker ─── */
.number-ticker { display: inline-block; }

/* ─── Shimmer ─── */
@keyframes shimmer {
  from { background-position: -200% center; }
  to   { background-position: 200% center; }
}
.shimmer {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
  background-size: 200%;
  animation: shimmer 2.5s infinite;
}
```

---

## INDEX.HTML — Full Implementation

Build `index.html` with ALL of the following sections in order:

### `<head>` Block
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VoiceGab — Voice-First Social Messaging</title>
  <meta name="description" content="VoiceGab is the world's first voice-first social messaging app. Send expressive voice messages with AI voice filters, end-to-end encrypted. Available on iOS and Android.">
  <meta name="keywords" content="voice messaging app, voice social, audio messaging, voice filters, encrypted messaging">
  <meta name="author" content="VoiceGab">

  <!-- Open Graph -->
  <meta property="og:title" content="VoiceGab — Voice-First Social Messaging">
  <meta property="og:description" content="Express yourself beyond text. Send encrypted voice messages with AI voice filters.">
  <meta property="og:image" content="https://yourdomain.com/assets/img/og-image.jpg">
  <meta property="og:url" content="https://yourdomain.com">
  <meta property="og:type" content="website">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="VoiceGab — Voice-First Social Messaging">
  <meta name="twitter:description" content="Express yourself beyond text. Send encrypted voice messages with AI voice filters.">
  <meta name="twitter:image" content="https://yourdomain.com/assets/img/og-image.jpg">

  <!-- Canonical -->
  <link rel="canonical" href="https://yourdomain.com">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="assets/img/app-icon.svg">
  <link rel="apple-touch-icon" href="assets/img/app-icon.svg">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="assets/css/design-system.css">
  <link rel="stylesheet" href="assets/css/components.css">
  <link rel="stylesheet" href="assets/css/animations.css">

  <!-- Theme color -->
  <meta name="theme-color" content="#080B14">

  <style>
    /* Page-specific hero styles only here */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 140px 0 80px;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--gradient-glow);
      pointer-events: none;
    }
    /* Canvas background */
    #hero-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0.35;
    }
    .hero__content {
      position: relative;
      z-index: 1;
      max-width: 720px;
    }
    .hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 40px;
      align-items: center;
    }
    .hero__scroll-hint {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: var(--text-muted);
      font-size: 12px;
      animation: float 2.5s ease-in-out infinite;
    }
    .hero__phone-mockup {
      position: absolute;
      right: -40px;
      top: 50%;
      transform: translateY(-50%);
      width: min(420px, 40vw);
      z-index: 1;
    }
    @media (max-width: 1024px) {
      .hero__phone-mockup { display: none; }
      .hero__content { max-width: 100%; text-align: center; }
      .hero__actions { justify-content: center; }
    }
  </style>
</head>
```

### SECTION 1: Navigation (same across all pages)
Build the sticky navbar with:
- Logo: purple gradient mic icon SVG + "VoiceGab" text
- Links: Features, Download, Support (with active state detection via JS)
- CTA: "Get the App" button (primary)
- Hamburger menu for mobile that opens full-screen overlay

### SECTION 2: Hero
```
Layout: Split — Left: text content, Right: floating phone mockup SVG
Background: Animated canvas with floating particles + subtle grid lines

Content:
  - Badge: "🎙️ Now Available on iOS & Android" (animated green dot)
  - H1: "Your Voice,\n<span gradient>Amplified.</span>"
  - Subheading: "The world's first voice-first social messaging app. Send expressive voice messages with AI voice filters, delivered end-to-end encrypted in milliseconds."
  - CTA row: [App Store button] [Google Play button] [Watch Demo ghost button]
  - Social proof: "★★★★★  Loved by 50,000+ voice communicators"

Phone mockup: Build an SVG phone frame (375×812 rounded rect) showing:
  - Dark UI chat screen mockup
  - Animated waveform bars at bottom (CSS animation)
  - 3 voice message bubbles with purple/gray waveform lines inside
  - "🎵 Robot Filter" badge on one bubble

Decoration:
  - Radial gradient glow behind phone (purple-pink)
  - 3 floating feature pills: "🔒 E2E Encrypted", "🎤 Voice Filters", "⚡ 16kbps Opus"
  - Subtle orbit ring around phone (animated, slow spin)
```

### SECTION 3: Social Proof / Stats Bar
Horizontal divider section with 4 animated counters:
```
[50K+]          [4.9★]          [12]              [0]
Active Users    App Store       Voice Filters     Stored Passwords
```
Use Intersection Observer to trigger count-up animation when scrolled into view.

### SECTION 4: Features — "Why Voice?"
Section label: "FEATURES"
H2: "Everything text can't say."
Subtext: "Emotion. Tone. Personality. Voice carries what text can never capture."

3-column grid of feature cards (glassmorphism). Each card has: icon, title, short description.

Cards:
1. 🎙️ **Crystal Clear Opus Audio** — "16kbps Opus codec at 16kHz. Same quality as Discord, 87% smaller files than AAC. Your voice, faithfully reproduced."
2. 🤖 **AI Voice Filters** — "Transform your voice in real-time. Robot, Echo, Chipmunk, Deep Voice and more. Every message tells its own story."
3. 🔒 **End-to-End Encrypted** — "AES-256-GCM encryption for every voice file. SQLCipher-encrypted local database. Only you and your recipient hear your messages."
4. ⚡ **Instant Delivery** — "WebSocket-powered real-time delivery. Messages arrive before you've put down your phone. No polling, no delays."
5. 📱 **Works Offline** — "Full offline support with local-first Drift SQLite database. Record and queue messages. Auto-sync when back online."
6. 🌊 **Live Waveforms** — "Animated waveform visualization for every message. See the rhythm of conversation. Scrub to any point in a voice message."
7. 🔔 **Smart Notifications** — "Firebase push notifications that respect your schedule. Tap a notification to jump directly into the conversation."
8. 🌍 **Voice Social Feed** — "Discover public voice posts from the community. Explore trending voices. Like, share, and reply with your own voice."
9. 🎨 **Custom Themes** — "Dark mode, system adaptive. Your messaging experience, your aesthetic. Biometric lock for added security."

### SECTION 5: How It Works
Section label: "HOW IT WORKS"
H2: "Three taps. One voice message."

3-step horizontal flow with connecting line:

Step 1: 🎤 Tap to Record
"Press and hold the mic button. VoiceGab captures your voice in Opus format at CD quality."

Step 2: ✨ Apply Your Filter
"Choose from 12 AI voice filters. Preview in real-time before sending. Robot? Echo? The choice is yours."

Step 3: 🔒 Send Encrypted
"Your voice file is AES-256-GCM encrypted, compressed, and delivered via WebSocket in under 200ms."

### SECTION 6: Feature Spotlight — Voice Filters
Large showcase section with:
- Left: animated phone mockup showing voice filter selection UI (SVG)
- Right: List of filters with colored icons

Filters list:
🤖 Robot — "Mechanical resonance for the future-forward."
🔊 Echo — "Adds natural reverb. Like speaking from a canyon."
🐿️ Chipmunk — "Higher pitch. Pure fun."
🔉 Deep Voice — "Bass boost. Command the room."
🎵 Chorus — "Harmonic layering. Like a choir of one."
🌊 Underwater — "Muffled, mysterious, hypnotic."

### SECTION 7: Security Section
Dark card section with:
H2: "Privacy isn't optional."

2-column layout:
Left: Text content:
"VoiceGab was built security-first. Every architectural decision prioritizes your privacy over feature velocity."

Security feature list with checkmarks:
✅ AES-256-GCM voice file encryption at rest
✅ SQLCipher encrypted local database (256K PBKDF2 iterations)
✅ Certificate-pinned HTTPS (TLS 1.3 only)
✅ HMAC-SHA256 signed API requests (anti-replay)
✅ Biometric lock with 60-second auto-lock
✅ Zero plaintext voice files ever written to disk
✅ Screenshot prevention (Android FLAG_SECURE)
✅ Jailbreak / root detection

Right: Animated security badge SVG (shield with gradient glow)

### SECTION 8: Download CTA
Full-width gradient banner section:
Background: mesh gradient (purple→pink) with overlay blur circles

H2: "Start talking.\nStop typing."
Subtext: "Free forever. No subscription. No ads. Download VoiceGab today."

[App Store Button]  [Google Play Button]
Below: QR code placeholder + "Scan to download"

App Store rating badge: "4.9 ★★★★★ · 2,100+ Ratings"

### SECTION 9: Footer
4-column footer:
Col 1: Logo + tagline + social links (Twitter/X, Instagram, TikTok, GitHub)
Col 2: Product — Features, Download, Changelog, Roadmap
Col 3: Legal — Privacy Policy, Terms of Service, Cookie Policy
Col 4: Support — Help Center, Contact, Status

Bottom bar: "© 2025 VoiceGab. All rights reserved." + language selector placeholder

---

## FEATURES.HTML

Build `features.html` as a dedicated features deep-dive:

### Hero
H1: "Every feature.\nPerfectly crafted."
Subtext: Description of product.
Badge: current version badge

### Feature Deep-Dives
For each major feature, create an alternating two-column section (image left/right alternating):
- Voice Recording section (waveform SVG on right)
- Voice Filters section (filter list UI on left)
- E2E Encryption section (security diagram on right)
- Social Feed section (feed mockup on left)
- Offline Support section (sync animation on right)
- Notifications section (notification mockup on left)

### Comparison Table
"VoiceGab vs the rest" table:

| Feature | VoiceGab | WhatsApp | Telegram |
|---|---|---|---|
| Voice-first UI | ✅ | ❌ | ❌ |
| AI Voice Filters | ✅ | ❌ | ❌ |
| Opus 16kbps | ✅ | ❌ | ✅ |
| Encrypted at Rest | ✅ | ❌ | ❌ |
| Voice Social Feed | ✅ | ❌ | ❌ |
| Offline Queue | ✅ | ✅ | ✅ |
| Open Source | Soon | ❌ | ✅ |

Style the table with glassmorphism rows, gradient header, VoiceGab column highlighted with purple glow.

### CTA Section
Same as homepage download CTA.

---

## DOWNLOAD.HTML

```
Hero: "Get VoiceGab" — Clean centered layout

Store Buttons (large, prominent):
- App Store button (black Apple icon + "Download on the App Store")
- Google Play button (Google Play icon + "Get it on Google Play")

QR Code section:
- Generate an SVG QR code placeholder (use a real QR library or placeholder)
- "Scan to download on your device"

System requirements:
iOS 14.0+ / Android 5.0+ (API 21+)

Screenshots section:
3 phone mockup screenshots in a horizontal scroll:
  1. Chat screen with voice message bubbles
  2. Voice filter selection screen
  3. Social feed screen

Version info: "Latest version: 1.0.0 · Updated [date]"
```

---

## PRIVACY.HTML

Build a full legal Privacy Policy page with:
- Standard mobile app privacy policy sections
- Glassmorphism styled content cards
- Table of contents with anchor links
- Sections: Data Collection, Data Use, Data Sharing, Data Retention, Security, Children's Privacy, Contact
- Mention: voice data never stored unencrypted, FCM token use, analytics via Firebase
- Last updated date
- Contact email: privacy@voicegab.com (placeholder)

---

## TERMS.HTML

Build Terms of Service with:
- Standard mobile app ToS sections
- Same glassmorphism styling as Privacy page
- Sections: Acceptance, License, Prohibited Use, Intellectual Property, Disclaimers, Limitation of Liability, Governing Law
- Last updated date

---

## SUPPORT.HTML

Layout:
1. Hero: "We're here to help."
2. Search bar: "Search our help center..." (static, no backend needed — just styled)
3. FAQ Accordion: 10 questions with animated open/close:
   - How do I send a voice message?
   - How do voice filters work?
   - Are my voice messages private?
   - How do I delete a message?
   - Does VoiceGab work offline?
   - How do I change my voice filter after recording?
   - What are the storage requirements?
   - How do I report a user?
   - How do I delete my account?
   - How do I contact support?
4. Contact card: Email + response time ("We respond within 24 hours")

---

## 404.HTML

Creative 404 page:
- Large "404" in gradient text
- Animated waveform (the page is "silent")
- "Oops. Dead air." headline
- Subtext: "The page you're looking for doesn't exist. But your voice does."
- [Back to Home] button

---

## JAVASCRIPT

### main.js
```javascript
// 1. Navbar scroll behavior
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// 2. Active nav link detection (current page)
const currentPath = window.location.pathname;
document.querySelectorAll('.navbar__links a').forEach(link => {
  if (link.getAttribute('href') === currentPath ||
      (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
    link.classList.add('active');
  }
});

// 3. Mobile menu toggle
const hamburger = document.querySelector('.navbar__hamburger');
const mobileMenu = document.querySelector('.navbar__mobile-menu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// 4. Scroll reveal (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 5. FAQ Accordion (for support page)
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  question?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// 6. Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});
```

### waveform.js
```javascript
// Animated canvas waveform for hero background
class WaveformCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resize();
    this.init();
    this.animate();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  init() {
    // Create 80 floating particles
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '#7C3AED' : '#06B6D4',
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw waveform lines
    const time = Date.now() / 1000;
    const lines = 3;
    const colors = ['rgba(124,58,237,0.15)', 'rgba(236,72,153,0.1)', 'rgba(6,182,212,0.12)'];

    for (let l = 0; l < lines; l++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = colors[l];
      this.ctx.lineWidth = 1.5;

      for (let x = 0; x <= this.canvas.width; x += 4) {
        const freq1 = 0.005 + l * 0.002;
        const freq2 = 0.012 + l * 0.003;
        const y = this.canvas.height / 2
          + Math.sin(x * freq1 + time * (0.8 + l * 0.3)) * (60 + l * 20)
          + Math.sin(x * freq2 + time * (1.2 + l * 0.2)) * (30 + l * 10);

        if (x === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      this.ctx.stroke();
    }

    // Draw particles
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    });

    requestAnimationFrame(() => this.animate());
  }
}

new WaveformCanvas('hero-canvas');
```

### counter.js
```javascript
// Animated number counter
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
```

---

## PHONE MOCKUP SVG

Build a reusable `assets/img/phone-mockup.svg` that is a stylized phone frame showing:
- Rounded rectangle phone body (375×812 viewBox)
- Dark screen with status bar
- 3 voice message chat bubbles (alternating left/right alignment)
  - Each bubble has a waveform bar chart inside (8 bars of varying heights)
  - Purple bubbles for sent, dark gray for received
- Bottom input bar with mic button (pulsing purple circle)
- All rendered in SVG with inline styles for dark theme

---

## APP ICON SVG

Create `assets/img/app-icon.svg`:
- 512×512 viewBox
- Rounded square background with purple→pink gradient
- White microphone icon centered (or stylized sound wave)
- Professional, App Store quality

---

## OPEN GRAPH IMAGE

Create `assets/img/og-image.svg` (1200×630):
- Dark background (#080B14)
- Large gradient VoiceGab logo/wordmark centered
- Tagline: "Voice-First Social Messaging"
- Subtle waveform decoration
- App Store and Play Store badges (small) at bottom

---

## GITHUB ACTIONS WORKFLOW

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## CNAME FILE

Create `CNAME` with a single line:
```
yourdomain.com
```
(User replaces `yourdomain.com` with their actual domain)

---

## README.md

Create `README.md`:
```markdown
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

## Custom Domain Setup
1. Update `CNAME` with your domain
2. In your DNS provider, add:
   - A records pointing to GitHub Pages IPs:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   - Or CNAME record: `www` → `yourusername.github.io`
3. In GitHub repo Settings → Pages → Custom domain → enter your domain
4. Enable "Enforce HTTPS"

## Pages
- `/` — Landing page
- `/features` — Feature showcase
- `/download` — App Store + Play Store
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service
- `/support` — FAQ + Contact
```

---

## FINAL QUALITY REQUIREMENTS

After building every file, verify ALL of the following:

1. **Zero layout breaks** — test at 320px, 768px, 1024px, 1440px widths
2. **Navbar** sticks on scroll, collapses on mobile, hamburger works
3. **Scroll reveal** — `.reveal` elements animate in on scroll
4. **Canvas waveform** — animates in hero on every page that includes `waveform.js`
5. **Number counters** — count up when stats section enters viewport
6. **FAQ accordion** — opens/closes smoothly with CSS `max-height` transition
7. **All inter-page links work** — features.html, download.html, privacy.html, terms.html, support.html, index.html
8. **Store buttons** — visible, styled correctly, link to `#` (user replaces with real URLs)
9. **Open Graph meta** — all 7 OG tags present in every page's `<head>`
10. **CNAME file** — present at root (not in subfolder)
11. **GitHub Actions workflow** — valid YAML, correct permissions
12. **All CSS** — no broken references, all three CSS files loaded in every page
13. **Fonts** — Google Fonts preconnect tags in every `<head>`
14. **No console errors** — all JS references are valid (no missing elements causing throws)
15. **404 page** — references correct paths for assets (relative paths from root)
16. **Mobile** — hero content readable without horizontal scroll at 375px
17. **Performance** — no render-blocking scripts (all `<script>` tags use `defer`)

---

## AFTER BUILDING

Tell me:
1. The complete file tree you created
2. Any placeholder values the user must replace (domain, App Store URLs, etc.)
3. The exact DNS records needed for their custom domain on GitHub Pages
```

---

## PLACEHOLDERS TO REPLACE AFTER BUILD

| Placeholder | Where | Replace With |
|---|---|---|
| `yourdomain.com` | `CNAME`, all `<link rel="canonical">`, all OG URLs | Your actual domain e.g. `voicegab.app` |
| `yourusername` | GitHub Actions, README | Your GitHub username |
| App Store URL | Download page, all store buttons | Real App Store link after submission |
| Google Play URL | Download page, all store buttons | Real Play Store link after submission |
| `privacy@voicegab.com` | Privacy policy | Your real support email |
| Analytics snippet | `index.html` bottom of body | Plausible or GA4 script (optional) |
| Screenshots | `assets/img/screenshots/` | Real app screenshots |
| OG image | `assets/img/og-image.jpg` | Rendered version of the SVG |

---



**DNS Records (add in your domain registrar):**
```
Type    Name    Value                  TTL
A       @       185.199.108.153        3600
A       @       185.199.109.153        3600
A       @       185.199.110.153        3600
A       @       185.199.111.153        3600
CNAME   www     YOURUSERNAME.github.io 3600
```

HTTPS certificate provisions automatically within 24 hours via GitHub's Let's Encrypt integration.

---

*Generated for VoiceGab — Voice-First Social Messaging App*
*Website prompt v1.0 · March 2026*

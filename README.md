# 🏠 Startpage

A clean, minimal browser startpage built with Vue 3 + Vite.  
**Everything is configured through a single `public/config.json` file — no code required.**

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173/startpage/`

---

## 🎨 Customizing (no code needed)

Edit **`public/config.json`** — the app updates automatically.

### Change your profile
```json
"profile": {
  "name": "Jane Doe",
  "handle": "@jane",
  "status": "building cool stuff",
  "avatarEmoji": "🦊",
  "avatar": "",         // ← set to a URL or path to use a real photo
  "verticalText": "CHILL",  // ← the big vertical text on the hero image
  "quote": "Ship it.",
  "quoteAuthor": "Everyone",
  "startDate": "2024-01-01",  // ← used for the day counter
  "stats": [
    { "value": "99", "label": "repos" }
  ],
  "tags": ["dev", "music"]
}
```

### Change colors
```json
"theme": {
  "bg":        "#0f0f12",   // page background
  "surface":   "#16161c",   // card background
  "surface2":  "#1e1e27",   // inner elements
  "border":    "#2a2a35",   // border color
  "text":      "#d4d4dc",   // main text
  "textMuted": "#55556a",   // secondary text
  "accent":    "#c8f060"    // ← change this for a different accent color
}
```

### Add / remove / edit links
Each section has a `label`, `color`, and array of `links`:
```json
{
  "id": "social",
  "label": "Social",
  "color": "#6ac8f7",    // ← hover color for this section's pills
  "links": [
    { "name": "GitHub", "url": "https://github.com/you", "icon": "🐙" }
  ]
}
```
Add a new section by copying a block. Remove one by deleting it.  
Use any emoji for the icon, or a Unicode symbol.

### Change search engine
```json
"search": {
  "engine": "duckduckgo"   // ← "google" | "duckduckgo" | "brave" | "bing"
}
```
You can also click the engine badge in the UI to cycle through them.

---

## 📦 Deploy to GitHub Pages

1. Push this repo to GitHub
2. In your repo → **Settings → Pages → Source**: select **GitHub Actions**
3. Edit `vite.config.js` and set `base` to your repo name:
   ```js
   base: '/your-repo-name/',
   ```
4. Push to `main` — GitHub Actions will build and deploy automatically

Your site will be live at `https://yourusername.github.io/your-repo-name/`

### Using a custom domain
Set `base: '/'` in `vite.config.js` and add your domain in GitHub Pages settings.

---

## 📁 Project Structure

```
startpage/
├── public/
│   └── config.json        ← ✏️ EDIT THIS FILE to customize everything
├── src/
│   ├── App.vue            ← root, loads config + injects CSS vars
│   ├── components/
│   │   ├── HeroPanel.vue  ← left panel (avatar, clock, quote)
│   │   ├── SearchBar.vue  ← search input
│   │   ├── LinksPanel.vue ← all link sections
│   │   └── BottomBar.vue  ← bottom status bar
│   ├── main.js
│   └── style.css
├── .github/workflows/
│   └── deploy.yml         ← auto-deploy to GitHub Pages
├── vite.config.js
└── package.json
```

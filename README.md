# Quiet Reader

A quiet, distraction-free Markdown reader — Kindle-style pages, no scrolling, no noise.

**Open:** https://dhvl1992.github.io/reader/

## Install on Android
1. Open the link above in Chrome.
2. Tap **Install app on this device** in the Library (or Chrome ⋮ → **Install app**).
3. It opens full screen and works offline.

## Use
- Tap right / swipe left → next page. Tap left / swipe right → previous page.
- Tap the middle → menu (Library, Contents, Full screen, **Aa** settings).
- Tap the faint bottom line → page / % / time left in chapter / time left in book / none.
- Keyboard: ← → Space PageUp PageDown, `+` / `-` for size, `Esc` for library.

Books and reading position are saved on the device (browser storage), not on any server.

## Update the app
1. Edit files.
2. In `sw.js`, change `VERSION` (e.g. `qr-v1` → `qr-v2`).
3. Commit and push. Phones get the new version on next open.

## Files
| File | Purpose |
|---|---|
| `index.html` | The whole app (HTML + CSS + JS) |
| `sw.js` | Offline cache |
| `manifest.webmanifest` | App name, icon, full-screen mode |
| `icons/` | App icons |
| `vendor/marked.umd.js` | Markdown parser ([marked](https://github.com/markedjs/marked), MIT — see `marked.LICENSE`) |

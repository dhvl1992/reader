// Quiet Reader — offline cache.
// To ship an update: change VERSION, commit, push. Phones pick it up on next open.
const VERSION = 'qr-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './vendor/marked.umd.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];
const FONT_CACHE = 'qr-fonts';

// 1. Install: save the app files
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)));
});

// 2. Activate: delete old versions
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== FONT_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// 3. Fetch
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts: cache forever after first download
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(FONT_CACHE).then((c) =>
        c.match(req).then((hit) => hit || fetch(req).then((res) => { c.put(req, res.clone()); return res; }))
      )
    );
    return;
  }

  // App files: cache first, fall back to network; page navigations fall back to index.html offline
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(req, { ignoreSearch: true }).then((hit) =>
        hit || fetch(req).catch(() => (req.mode === 'navigate' ? caches.match('./index.html') : undefined))
      )
    );
  }
});

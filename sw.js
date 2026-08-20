// Local Business AI Offline Service Worker
const CACHE_NAME = 'local-biz-ai-v1';
const ASSETS_TO_CACHE = ['/', '/index.html', '/src/main.jsx', '/src/index.css'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

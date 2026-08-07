const CACHE_NAME = 'kins-link-bio-v25';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './pfp.jpg',
  './followers.json',
  './kins-studio/',
  './kins-studio/index.html',
  './kins-studio/dashboard.css',
  './kins-studio/dashboard.js',
  './kins-studio/styles.css',
  './kins-studio/pfp.jpg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});

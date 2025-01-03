const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/my-pwa-app/',
  '/my-pwa-app/index.html',
  '/my-pwa-app/manifest.json',
  '/my-pwa-app/icons/icon-192x192.png',
  '/my-pwa-app/icons/icon-512x512.png'
];

// Install event: Cache app resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: Serve cached resources or fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

const CACHE_NAME = "rentbook-v3";
const ASSETS = [
  "/rentbook/", 
  "/rentbook/index.html", 
  "/rentbook/manifest.json",
  "/rentbook/icon-192.png", 
  "/rentbook/icon-512.png",
  "/rentbook/icon-maskable-192.png", 
  "/rentbook/icon-maskable-512.png",
  "/rentbook/apple-touch-icon.png", 
  "/rentbook/favicon.ico"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
      .then(cached => cached || fetch(e.request).catch(() => caches.match("/rentbook/index.html")))
  );
});

const CACHE_NAME = "ministry-sim-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./sound.js",
  "./i18n.js",
  "./content.js",
  "./engine.js",
  "./avatar.js",
  "./render.js",
  "./manifest.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

// World Cup 2026 Dashboard — Service Worker
// Strategy: cache the app shell + static assets at install time
// (cache-first for those), and use network-first for everything
// else (page navigations, data), falling back to cache or a
// dedicated offline page when the network is unavailable.
//
// HONEST LIMITATION: this dashboard's actual match data comes from
// the MockFootballDataProvider, which runs entirely in-memory in
// the browser (no real network request happens for "data" today).
// Once Step 3/4 wires up a real API provider, real fetch() calls to
// that API should be added to the NETWORK_FIRST matching logic below
// so they get a genuine offline fallback too — right now there's no
// real network call to intercept for match data specifically.

const CACHE_VERSION = "wc2026-v1";
const APP_SHELL_CACHE = `${CACHE_VERSION}-shell`;

const APP_SHELL_URLS = [
  "/",
  "/manifest.json",
  "/offline.html",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(APP_SHELL_CACHE)
      .then((cache) => cache.addAll(APP_SHELL_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("wc2026-") && key !== APP_SHELL_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests — never intercept mutations.
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Skip cross-origin requests (e.g. flagcdn.com, dicebear.com,
  // Google Fonts) — let the browser handle those natively rather
  // than risk caching third-party assets incorrectly.
  if (url.origin !== self.location.origin) return;

  // Static Next.js build assets: cache-first, since filenames are
  // content-hashed and therefore safe to cache aggressively.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const responseClone = response.clone();
          caches.open(APP_SHELL_CACHE).then((cache) => cache.put(request, responseClone));
          return response;
        });
      })
    );
    return;
  }

  // Page navigations: network-first, falling back to the cached
  // shell or a dedicated offline page if the network is down.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(APP_SHELL_CACHE).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/offline.html")))
    );
    return;
  }

  // Everything else: try network, fall back to cache.
  event.respondWith(fetch(request).catch(() => caches.match(request)));
});

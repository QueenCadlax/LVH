// Lowveld Hub PWA Service Worker
// This service worker enables offline functionality and caching for the PWA

const CACHE_NAME = 'lowveld-hub-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icon-192.svg',
  '/icon-512.svg'
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching app shell');
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {
        console.log('[SW] Some assets could not be cached');
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip API calls and external requests
  if (request.url.includes('/api/') || !request.url.includes(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        console.log('[SW] Serving from cache:', request.url);
        return response;
      }

      return fetch(request).then((response) => {
        // Don't cache non-200 responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone the response before caching
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        console.log('[SW] Serving from network:', request.url);
        return response;
      }).catch(() => {
        console.log('[SW] Network failed, no cache available:', request.url);
        // Return a fallback page if needed
        return new Response('Offline - Content not available', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      });
    })
  );
});

// Message event - handle skip waiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Skipping waiting and claiming clients');
    self.skipWaiting();
  }
});

console.log('[SW] Service worker loaded');

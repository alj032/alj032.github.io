// Increment this version number whenever you update your files
const CACHE_VERSION = 'v2';
const CACHE_NAME = `sleep-sounds-${CACHE_VERSION}`;

const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/sounds/white-noise.mp3',
    '/sounds/rain.mp3',
    '/sounds/ocean.mp3',
    '/sounds/fan.mp3',
    '/sounds/forest.mp3',
    '/sounds/stream.mp3',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Installation - caches all required files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting()) // Forces activation
    );
});

// Activation - cleans up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => {
                        // Delete old versions of our cache
                        return cacheName.startsWith('sleep-sounds-') && cacheName !== CACHE_NAME;
                    })
                    .map(cacheName => {
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => {
            // Ensures the new service worker takes control immediately
            return self.clients.claim();
        })
    );
});

// Fetching - network first, then cache
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // If we got a valid response, clone it and update the cache
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseClone);
                        });
                }
                return response;
            })
            .catch(() => {
                // If network fetch fails, try the cache
                return caches.match(event.request);
            })
    );
});
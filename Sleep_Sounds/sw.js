const CACHE_NAME = 'sleep-sounds-v1';
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

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
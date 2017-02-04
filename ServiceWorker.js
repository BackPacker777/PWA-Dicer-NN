// TODO:

'use strict';

const CACHE_NAME = 1.0;
let cacheFiles = [
     '/index.html',
     '/public/css/foundation63.min.css',
     '/public/css/override.css',
     '/public/images/10Dice.png',
     '/public/javascripts/main.js',
     '/public/favicons/favicon.ico',
     '/public/favicons/android-chrome-192x192.png'
];


self.addEventListener('install', event => {
     event.waitUntil(
          caches.open(CACHE_NAME).then((cache) => {
               return cache.addAll(cacheFiles);
          })
     );
});

self.addEventListener('activate', (event) => {
     event.waitUntil(
          caches.keys().then(cacheNames => {
               return Promise.all(
                    cacheNames.map(thisCacheName => {
                         if (thisCacheName !== CACHE_NAME) {
                              return caches.delete(CACHE_NAME);
                         }
                    })
               );
          })
     );
});

self.addEventListener('fetch', (event) => {
     event.respondWith(
          caches.match(event.request).then((res) => {
               if (res) {
                    return res;
               }
               // requestBackend(event);
               let requestClone = event.request.clone();
               fetch(requestClone).then((res) => {
                    if (!res) {
                         return res;
                    }
                    let responseClone = res.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                         cache.put(event.request, responseClone);
                         return res;
                    });
               })
          })
     );
});
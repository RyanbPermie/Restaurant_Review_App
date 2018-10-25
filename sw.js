
//Then create a cache and populate with base files
let baseCacheName = 'restaurant_review_v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(baseCacheName).then(function(cache) {
      return cache.addAll([
        '/',
		'/index.html',
        'js/main.js',
		'js/restaurant_info.js',
        'css/styles.css',
        'img/1.jpg',
		'img/2.jpg',
		'img/3.jpg',
		'img/4.jpg',
		'img/5.jpg',
		'img/6.jpg',
		'img/7.jpg',
		'img/8.jpg',
		'img/9.jpg',
		'img/10.jpg',
		'img/favicon.png'
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
          .then( (cacheNames) => {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('review-') &&
                        cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
          })
    );
});

//Check for requests that are in the cache, grab them from the network if not. https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(baseCacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
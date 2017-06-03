
const cacheName = 'googleiobolivialabv2';
const filesToCache = [
  '/',
  '/app.js',
  '/style.css',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(cacheName).then(cache => {
      return fetch(e.request).then(response => {
        // console.log(e.request.url.indexOf('localhost:3030/api'));
        // console.log(e.request.url);
        if (e.request.url.indexOf('localhost:3030/api') === -1) {
          cache.put(e.request.url, response.clone());
        }
        return response;
      })
      .catch(() => {
        return cache.match(e.request)
          .then(cacheRes => {
            if (cacheRes) return cacheRes;
            return new Response('{"offline": "true"}');
          });
      });
    })
  );
});

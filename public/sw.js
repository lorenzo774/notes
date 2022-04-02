const cacheName = `notes`;
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache
        .addAll([
          `/`,
          `/index.html`,
          `/global.css`,
          `/favicon.ico`,
          `/build/bundle.css`,
          `/build/bundle.js`,
          `/build/bundle.js.map`,
        ])
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function (event) {
  // console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches
//       .open(cacheName)
//       .then((cache) => cache.match(event.request, { ignoreSearch: true }))
//       .then((response) => {
//         return response || fetch(event.request);
//       })
//   );
// });

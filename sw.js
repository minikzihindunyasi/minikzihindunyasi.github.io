const CACHE_NAME = "minik-zihin-ultra-v1";
const CORE = ["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
const SOUNDS = ["./Barking_of_a_dog_2.ogg","./cow-moo-02.mp3","./duck-quack-02.mp3","./Meow.ogg","./rooster-crow-02.mp3"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("minik-zihin-") && k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(resp => {
    if (resp && resp.ok) { const copy = resp.clone(); caches.open(CACHE_NAME).then(c => c.put(e.request, copy)); }
    return resp;
  }).catch(() => caches.match("./index.html"))));
});
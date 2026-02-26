// Ganti angka v1 menjadi v2, v3, dst SETIAP KALI kamu melakukan perubahan besar pada tampilan web.
const CACHE_NAME = 'fary-edtech-v2'; 
const urlsToCache = [
  './',
  './index.html',
  './logo.png',
  './manifest.json'
];

// Tahap Install: Menyimpan file ke memori HP
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Memaksa service worker baru langsung aktif
});

// Tahap Activate: Menghapus memori (cache) versi lama jika ada update
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache versi lama:', cacheName);
            return caches.delete(cacheName); // Hapus ingatan lama
          }
        })
      );
    })
  );
  self.clients.claim(); // Memastikan semua tab langsung memakai versi baru
});

// Tahap Fetch: Mengambil data
self.addEventListener('fetch', event => {
  // Jangan cache API Google Script agar data pesanan & produk selalu live
  if (event.request.url.includes('script.google.com')) {
      return; 
  }

  // Strategi: Coba ambil dari internet dulu, kalau gagal baru pakai Cache HP
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

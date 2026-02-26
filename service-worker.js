const CACHE_NAME = 'fary-edtech-v1';
const urlsToCache = [
  './',
  './index.html',
  './logo.png',
  './manifest.json'
];

// Tahap Install: Menyimpan file penting ke dalam Cache HP pengguna
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache berhasil dibuka');
      return cache.addAll(urlsToCache);
    })
  );
});

// Tahap Fetch: Mengatur cara aplikasi memuat data
self.addEventListener('fetch', event => {
  // PENTING: Jangan cache request ke API Google Apps Script agar data produk & order selalu baru
  if (event.request.url.includes('script.google.com')) {
      return; 
  }

  // Untuk file HTML, CSS, dan Gambar, coba ambil dari internet dulu. 
  // Kalau internet mati, baru ambil dari Cache memori HP.
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

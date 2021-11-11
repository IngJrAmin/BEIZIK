//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_BEIZIK',
  urlsToCache = [
    './',
    'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
    'https://code.jquery.com/jquery-3.6.0.min.js',
    'https://kit.fontawesome.com/14438bc8f4.js',
    './styles.css',
    './index.js',
    './img/logo1.png',
    './img/logo2.png',
    './img/logo3.png',
    './img/shirt.png',
    './img/jogger.png',
    './img/cap.png',
    './img/snowcap.png',
    './img/logosManifest/logo1024.png',
    './img/logosManifest/logo512.png',
    './img/logosManifest/logo384.png',
    './img/logosManifest/logo256.png',
    './img/logosManifest/logo192.png',
    './img/logosManifest/logo128.png',
    './img/logosManifest/logo96.png',
    './img/logosManifest/logo64.png',
    './img/logosManifest/logo32.png',
    './img/logosManifest/favicon.png'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})
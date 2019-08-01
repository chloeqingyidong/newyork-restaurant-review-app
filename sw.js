//console.log('Service Worker: Registered');

/* creating an array of file path strings */
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

const cacheName = 'v1';

/* adding cacheFiles to cacheName obj */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(cacheFiles);
        })
    );
});

/* fetvhing */
    // to prevent the default
    // to determine if the event request url already exists within the cache
    // to receive a promise -- whether or not the cache match is successful
    // if the request exists in the cache, fetch ; if not, add it to the cache
self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(function(response){
            if(response){
                console.log('Found', event.request, 'in cache');
                return response;
            }else{
                console.log('Could not find', event.request, 'in cache, FETCHING!');
                return fetch(event.request).then(function(response){
                    caches.open('v1').then(function(cache){
                        cache.put(event.request, response);
                    })
                    return response;
                }).catch(function(error){
                    console.error(error);
                });
            }
        })
    );
});

---
layout: null
---
# Timestamp is necessary to trigger a reload of the service worker.
### Generated at: {{ site.time | date: '%F %T'}} ###
# Import the cache config
importScripts('/data/cache-config.min.js');

CACHE_VERSION = '1'
CACHE_PREFIX = 'cache-v' + CACHE_VERSION;

# Generate the cache names
CACHE_NAMES = for path, checksum of CACHE_CONFIG
    "#{CACHE_PREFIX}-#{path}-#{checksum}"

to_cache_name = (path) ->
    path = path.replace(self.registration.scope, '')
    "#{CACHE_PREFIX}-#{path}-" + CACHE_CONFIG[path]

invalidate_cache = (cache_name) ->
    unless cache_name in CACHE_NAMES
        console.log("Removing '#{cache_name}' from the cache.")
        caches.delete(cache_name)

log_error = (error) ->
    console.log("Error in service worker: #{ error }")
    throw error

# Invalidate any old caches on activation
self.addEventListener('activate', (event) ->
    console.log('Service worker activated at scope: ' + self.registration.scope)
    event.waitUntil(caches.keys().then((cache_names) ->
            Promise.all(cache_names.map(invalidate_cache))
        )
    )
)

# Test for a valid response
response_valid = (response) ->
    response.status < 400 && response.headers.has('content-type')

url_re = new RegExp('/static/|/css/|/js/|/image/')

self.addEventListener('fetch', (event) ->
    # Attempts to fetch an item from the cache. On cache misses
    # retrieve the item remotely and add to the cache.
    handle_cache_fetch = (cache) ->
        cache.match(event.request).then((response) ->
            return response if response

            fetch(event.request.clone()).then((response) ->
                cache.put(event.request, response.clone()) if response_valid(response)
                response
            )
        ).catch(log_error)

    if event.request.url.indexOf(self.registration.scope) == 0 and url_re.test(event.request.url)
        cache_name = to_cache_name(event.request.url)
        console.log('Retrieving cached item for: ' + cache_name)
        event.respondWith(caches.open(cache_name).then(handle_cache_fetch))
)
---
layout: post
title: Adding a Service Worker Cache to my site
categories: "Site Development"
tags: javascript jekyll Serviceworker
---
[Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) are a powerful new technology for intercepting network requests for web applications. A service worker runs as a script in the background within the browser.

I implemented a service worker to cache the static javascript, CSS and image files on this site. In theory, service workers can be
used to implement many powerful features including:

- Handling A/B testing by intercepting requests and directing them to either the 'A' or 'B' version.
- [Load balancing](https://serviceworke.rs/load-balancer.html).
- [Push Notifications](https://serviceworke.rs/push-get-payload.html).

## Implementing a cache service

One of the drawbacks of [GitHub pages](https://pages.github.com/) is the short cache timeout (10 mins) used on the server. This affects the site score in [PageSpeed](https://developers.google.com/speed/pagespeed/insights/).
Using the caching functionality in the [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Cache), content caching can be controlled on the client side. This also avoids having to contact the server to receive the '304 Not Modified' response for cached items.

My service worker is based on the [Google I/O Web App](https://developers.google.com/web/showcase/2015/service-workers-iowa) implementation which generates a list of MD5 hashes for each static resource and embeds this into
the service worker. Each time a file is modified, a new service worker is generated with the new MD5 hash. When the new service worker is activated, any old
cache entries with invalid MD5 hashes are deleted.

I wrote service worker in [CoffeeScript](http://coffeescript.org/), since I found it a little more readable when working with [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). I used [`importScripts`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts) to read in the list of MD5 hashes rather than embedding this directly:

```coffee
### Generated at: {{ site.time | date: '%F %T'}} ###

# Import the cache config
importScripts('/data/cache-config.min.js');
...
```

The comment with the generation timestamp is necessary since the service worker is only reloaded when the script itself changes, but not when the imported
scripts change.

Cache invalidation is handled within the 'activate' event which is generated when the service worker is registered from one of the sites pages. To allow me to invalidate the entire cache for any reason, I can change the cache version that is added to all cache keys.:

```coffee
CACHE_VERSION = '1'
CACHE_PREFIX = 'cache-v' + CACHE_VERSION;

# Generate the cache names
CACHE_NAMES = for path, checksum of CACHE_CONFIG
    "#{CACHE_PREFIX}-#{path}-#{checksum}"

invalidate_cache = (cache_name) ->
    caches.delete(cache_name) unless cache_name in CACHE_NAMES

# Invalidate any old caches on activation
self.addEventListener('activate', (event) ->
    console.log('Service worker activated at scope: ' + self.registration.scope)
    event.waitUntil(caches.keys().then((cache_names) ->
            Promise.all(cache_names.map(invalidate_cache))
        )
    )
)
...
```

Cache fetches are handled within the 'fetch' event which is fired for all requests in the site. Items are added to the cache on demand rather than pre-caching them. For any URLs not handled by the service worker, the fetch event handler returns without calling `event.respondWith`:

```coffee
# Regex to match urls that we are handling
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

    if url_re.test(event.request.url)
        cache_name = to_cache_name(event.request.url)
        event.respondWith(caches.open(cache_name).then(handle_cache_fetch))
)
```

### Generating the cache config

I created another node script to generate MD5 hashes for all JavaScript, CSS and image files in the generated site and outputs these to the cache config file:

```javascript
recursive(options['site-dir'], [includeStatic], function(err, files) {
    var cache_config = {};

    for (var file of files)
    {
        var md5 = crypto.createHash('md5');
        var file_content = fs.readFileSync(file);
        var hexdigest = md5.update(file_content).digest('hex');

        # Change file path to a relative path
        file = file.replace(new RegExp('^' + options['site-dir'] + '/?'), '');
        file = file.replace(/index\.html$/, '');
        cache_config[file] = hexdigest;
    }

    # Create the cache_config javascript
    var out = 'var CACHE_CONFIG = ';
    out += JSON.stringify(cache_config);
    out += ';';

    fs.writeFileSync(options.output, out, 'utf-8');
...
```

## Registering the worker

Service worker registration is handled with the following:

```javascript
function enableServiceWorker()
{
    if ('serviceWorker' in navigator)
    {
        var worker_url = '/cache-service.js';
        var serviceWorker;

        navigator.serviceWorker.register(worker_url).then(function (registration) {
            if (registration.installing)
            {
                serviceWorker = registration.installing;
            }
            else if (registration.waiting)
            {
                serviceWorker = registration.waiting;
            }
            else if (registration.active)
            {
                serviceWorker = registration.active;
            }

            if (serviceWorker)
            {
                console.log('Service worker at "' + worker_url + '" in state: ' + serviceWorker.state);
            }
        }).catch(function (error) { throw error; });
    }
}

```

The `enableServiceWorker` function currently has to be called manually to enable me to test this some more in the production site before
enabling this automatically. You can enable the service worker using the [button below](#enable-service-worker). This requires a current version of Firefox or Chrome, [Edge support](https://jakearchibald.github.io/isserviceworkerready/)
is currently in development.

If you enable the service worker, it is possible to see which requests are being handled in the 'network' tab of the developer tools in Chrome or Firefox.
The transferred column should report `(from ServiceWorker)` for all js, css and image files in this site.

## Closing thoughts

Service workers are a powerful tool that I would like to explore further. They do have a couple of drawbacks though. I found it rather difficult to debug the service worker. If it fails to register initially it is not always immediately obvious what the cause is.

Updating the service worker is also a little more complicated than just refreshing the page. Since a single instance of it runs in the background, all tabs with pages from the site open must be closed before a new service worker can be reloaded.

The full source can be found in the [repository for this site]({{ site.github.repository_url }}):

- [Service Worker]({{ site.github.repository_url }}/tree/master/cache-service.coffee)
- [Cache config generation script]({{ site.github.repository_url }}/tree/master/_scripts/build-cache-config)

<button onclick='enableServiceWorker()' id='enable-service-worker' style='font-size: 100%'>Enable Service Worker</button>

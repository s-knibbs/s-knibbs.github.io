'use strict';
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
        }).catch(function (error) {
            throw error;
        });
    }
}

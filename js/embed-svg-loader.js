'use strict';

/* Workaround for the X-Frame-Options
 * security measure which will otherwise block
 * externally loaded SVGs
 */
$('iframe.main-image').on("load", function () {
    this.loaded = true;
});

$(document).ready(function() {
    var iframe = $('iframe.main-image').get(0);
    if (iframe && !iframe.loaded)
    {
        $.get(iframe.src, function (data) {
            var encoded = window.btoa(data);
            iframe.src = "data:image/svg+xml;base64," + encoded;
        });
    }
});

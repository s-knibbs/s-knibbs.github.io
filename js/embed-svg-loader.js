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
            var svg = $(data);
            svg.attr({
                'width': iframe.width,
                'height': iframe.height,
            });
            svg.insertAfter($(iframe));
            $(iframe).remove();
        });
    }
});

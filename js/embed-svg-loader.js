'use strict';

/* Workaround for the X-Frame-Options
 * which will block SVGs from loading in embed/iframe/object
 * elements.
 */
$(document).ready(function() {
    var svg_placeholder = $('div.main-image');
    if (svg_placeholder)
    {
        $.get(svg_placeholder.attr('data-svg-src'), function (data) {
            var svg = $(data);
            svg.css({
                'width': svg_placeholder.attr('data-width'),
                'height': svg_placeholder.attr('data-height')
            });
            svg.insertAfter(svg_placeholder);
            svg_placeholder.remove();
        });
    }
});

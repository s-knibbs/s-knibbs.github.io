'use strict';

$(document).ready(function () {
    $(document).keypress(function (event) {
        // Ignore event if an input or textarea is active.
        var active = event.currentTarget.activeElement;
        if (!active.nodeName.match(/textarea|input/i))
        {
            if (event.key == '/')
            {
                $('input[name="query"]').focus();
                event.preventDefault();
            }
        }
    });
});

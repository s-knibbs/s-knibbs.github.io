'use strict';

// Enable editing if the '#editable' parameter is set in the url.
$(document).ready(function () {
    if (window.location.hash == '#editable')
    {
        $('.post > article, .post > header').attr('contenteditable', 'true');
    }
});

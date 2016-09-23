'use strict';

$(document).ready(function () {
    var last_mtime = null;

    // Check the last modified time and reload the page
    // if modified since.
    function checkMtime() {
        $.ajax({
            url: '/mtime.txt',
            method: 'GET'
        }).done(function (data) {
            var mtime = new Date(data.replace(/\+\d+\n?$/, '').trim());
            if (last_mtime != null && mtime > last_mtime)
            {
                window.location.reload();
            }
            else
            {
                last_mtime = mtime;
            }
        });
    }

    $('#set-auto-reload').click(function () {
        window.setInterval(checkMtime, 500);
    });

    if (window.location.hash == '#auto-reload')
    {
        window.setInterval(checkMtime, 500);
    }
});

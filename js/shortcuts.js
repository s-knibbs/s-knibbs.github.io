'use strict';

$(document).ready(function () {

    function focusSearchInput()
    {
        var $header = $('.site-header')
        $header.css({
            position: 'fixed',
            left: '0',
            right: '0',
            top: '0'
        });
        $('.page-content').css('margin-top', $header.height());
        $('input[name="query"]').focus();
    }

    function resetHeader()
    {
        $('.site-header').css('position', 'static');
        $('.page-content').css('margin-top', '0');
        $('input[name="query"]').blur();
    }

    $(document).keyup(function (event) {
        // Ignore event if an input or textarea is active.
        var active = event.currentTarget.activeElement;
        switch (event.key)
        {
            case '/':
                if (!active.nodeName.match(/textarea|input/i))
                {
                    focusSearchInput();
                    event.preventDefault();
                }
                break;
            case 'Escape':
                resetHeader();
                break;
            default:
                break;
        }
    });

    $('.page-content').click(resetHeader);
});

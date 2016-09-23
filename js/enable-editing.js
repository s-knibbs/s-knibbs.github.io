'use strict';

// Enable editing if the '#editable' parameter is set in the url.
$(document).ready(function () {
    var editable = false;
    var edit_button = $('#set-editable');

    var toggleEditing = function ()
    {
        var enable = (editable) ? 'false' : 'true'; 
        var edit_text = (editable) ? 'Editable' : 'Non-Editable';
        $('.post > article, .post > header > h1').attr('contenteditable', enable);
        edit_button.text(edit_text);
        editable ^= true;
    };

    edit_button.click(toggleEditing);
});

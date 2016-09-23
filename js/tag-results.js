'use strict';

$(document).ready(function () {
    var tag_index_loaded = false;
    var search_index_loaded = false;
    var index = null;
    var tag_index = null;
    var tagname = window.location.hash.replace('#', '').toLowerCase();

    var showTagged = function (tagname)
    {
        if (index && tag_index && tag_index[tagname])
        {
            $('#results').show();
            var doc_ids = tag_index[tagname];
            var tmpl = $('#result-template').html();
            Mustache.parse(tmpl);
            var result_list = $('#results-list');
            result_list.empty();
            $('#results-count').text(doc_ids.length);
            $('#tagname').text(tagname);

            for (var i = 0; i < doc_ids.length; i++)
            {
                var doc = index.documentStore.docs[doc_ids[i]];
                result_list.append(Mustache.render(tmpl, doc));
            }
        }
    };

    var showAllTags = function ()
    {
        var tags = Object.keys(tag_index);
        var tmpl = $('#all-tags-template').html();
        var all_tags = $('#all-tags > ul');
        Mustache.parse(tmpl);
        for (var i = 0; i < tags.length; i++)
        {
            all_tags.append(Mustache.render(tmpl, {tagname: tags[i]}));
        }
        $('#all-tags').show();
        $('.tag-link').click(function () {
            showTagged($(this).attr('href').replace('#', ''));
        });
    };

    $.getJSON('/data/tag-index.json', function (data) {
        tag_index = data;
        if (tagname) showTagged(tagname);
        showAllTags();
    });
    $.getJSON('/data/index.json', function (data) {
        index = data;
        if (tagname) showTagged(tagname);
    });
});

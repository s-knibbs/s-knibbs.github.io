'use strict';

$(document).ready(function () {
    $.getJSON('/data/index.json', function (data) {
        var index = elasticlunr.Index.load(data);
        var query = window.location.search.replace('?', '').split('=');
        if (query[0] == "query")
        {
            var query_text = decodeURIComponent(query[1].replace('+', ' '));
            var results = index.search(query_text);
            // TODO: Display resuls here.
            for (var res of results)
            {
                console.log(index.documentStore.docs[res.ref].title);
            }
        }
    });
});

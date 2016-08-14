'use strict';

$(document).ready(function () {
    $.getJSON('/data/index.json', function (data) {
        var index = elasticlunr.Index.load(data);
        var query = window.location.search.replace('?', '').split('=');
        if (query[0] == "query")
        {
            var query_text = decodeURIComponent(query[1].replace('+', ' '));
            var results = index.search(query_text);

            if (results.length > 0)
            {
                $('#results').show();
                // Prepare the result template
                var tmpl = $('#result-template').html();
                Mustache.parse(tmpl);
                var result_list = $('#results-list');

                $('#results-count').text(results.length);

                for (var i = 0; i < results.length; i++)
                {
                    var doc = index.documentStore.docs[results[i].ref];
                    result_list.append(Mustache.render(tmpl, doc));
                }
                highlightContent(window.location.href);
            }
            else
            {
                $('#no-results').show();
            }
        }
    });
});

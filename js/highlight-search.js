'use strict';

/**
 * Highlights the content in the 'article' tag based on the
 * search query in 'url'
 */
function highlightContent(url) {
    try
    {
        var terms = url.replace(/#.+$/, '').split('=')[1].split('+');
    }
    catch (err)
    {
        return;
    }

    var text_nodes = [];

    /**
     * Recursively get all of the text
     * nodes that are children of the given node.
     */
    function getTextNodes(node)
    {
        for (var i = 0; i < node.childNodes.length; i++)
        {
            var child = node.childNodes[i];
            if (child.nodeType === 3)
            {
                text_nodes.push(child);
            }
            else if (child.nodeType === 1)
            {
                getTextNodes(child);
            }
        }
    }

    getTextNodes($('article')[0]);

    var re = new RegExp(terms.join('|'), 'gi');

    for (var i = 0; i < text_nodes.length; i++)
    {
        $(text_nodes[i]).replaceWith(function () {
            return this.wholeText.replace(re, '<span class="search-highlight">$&</span>');
        });
    }
}

$(document).ready(function () {

    // Highlight matching search terms throughout the document.
    if (document.referrer.match(/search\/\?query=/) && window.location.hash == "#enable-highlight")
    {
        highlightContent(document.referrer);
    }
});

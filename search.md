---
layout: page
title: Search Results
sitemap: false
stylesheets:
  - "/css/post-list.css"
scripts:
  - "/js/elasticlunr.min.js"
  - "/js/mustache.min.js"
  - "/js/search-results.js"
---
<script id="result-template" type="x-tmpl-mustache">
{% raw %}
<li>
<h2 class="result-link"><a href="{{url}}#enable-highlight">{{title}}</a></h2>
<p>{{description}}...</p>
</li>
{% endraw %}
</script>

{% capture shortcut_message %}
<p><strong>Note:</strong> You can also use the vim search command (<code>/</code>) to perform searches.</p>
{% endcapture %}

<noscript>
  Please enable JavaScript in your browser to view search results.
</noscript>

<div id="no-results" style="display: none">
    <p>No results found.</p>
    {{ shortcut_message }}
</div>

<div id="results" style="display: none">
    <p>Found <span id="results-count"></span> result(s).</p>
    {{ shortcut_message }}
    <ul id="results-list" class="nobullets noindent">
    </ul>
</div>

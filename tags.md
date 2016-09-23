---
layout: page
title: Tags 
sitemap: false
stylesheets:
  - "/css/post-list.css"
scripts:
  - "/js/elasticlunr.min.js"
  - "/js/mustache.min.js"
  - "/js/tag-results.js"
---
<script id="result-template" type="x-tmpl-mustache">
{% raw %}
<li>
<h2 class="result-link"><a href="{{url}}#enable-highlight">{{title}}</a></h2>
<p>{{description}}...</p>
</li>
{% endraw %}
</script>

<script id="all-tags-template" type="x-tmpl-mustache">
{% raw %}
<li><span class="fa fa-tag"></span> <a class="tag-link" href="#{{tagname}}">{{tagname}}</a></li>
{% endraw %}
</script>

<noscript>
  Please enable JavaScript in your browser to view tagged articles.
</noscript>

<div id="results" style="display: none">
    <p>Found <span id="results-count"></span> posts tagged with <i id="tagname"></i>.</p>
    <ul id="results-list" class="nobullets noindent">
    </ul>
</div>

<div class="post-tags" id="all-tags" style="display: none">
    <hr style="width: 15%; margin-bottom: 10px"/>
    <p style="margin-bottom: 10px;">All tags:</p>
    <ul>
    </ul>
</div>

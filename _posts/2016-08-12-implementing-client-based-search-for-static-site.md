---
layout: post
title: "Implementing client based search for a static site"
date: 2016-08-12 11:00:00
categories: "Site Development"
tags: jekyll node.js search
---

Adding search functionality to a static site such as mine is one of the harder things to achieve. There are basically two ways to achieve this:

- Use a hosted service such as [Google Custom Search](https://cse.google.com/cse/) or [Algolia](https://www.algolia.com/).
- Implement search on the client side using JavaScript.

The hosted search solutions are paid services though, although Google Custom Search do offer free ad-supported search. For a larger blog, a search
solution such as Algolia's would probably make sense. They even provide a [Jekyll plugin](https://blog.algolia.com/instant-search-blog-documentation-jekyll-plugin/) to make this easy
to integrate. For a small blog, such as mine, this seems like overkill though.

I know that it is possible to implement a purely client based search engine. This is how the search functionality works in the [Sphinx documentation generator](http://www.sphinx-doc.org/) (not the [search engine](http://sphinxsearch.com/) of the same name). There is even [a tutorial](http://jekyll.tips/jekyll-casts/jekyll-search-using-lunr-js/) on how to implement search within Jekyll using [lunr.js](http://lunrjs.com/).

The search implementation in the tutorial works by embedding the entire site content onto the search
page and building the index each time a search is performed. Needless to say, this is quite inefficient. I wanted something a little bit more scalable for my site.

Instead, I chose to implement a build script to generate the search index each time the site is built. The script uses [elasticlunr.js](http://elasticlunr.com/) which is a fork of lunr.js with some additional features and performance enhancements. The index is built by recursively searching the generated html under `_site`:

``` javascript
    recursive(options['index-dir'], ignore, function (err, files) {

        for (var file of files)
        {
            var html = fs.readFileSync(file, 'utf-8');
            // Parse the DOM.
            var document = jsdom.jsdom(html);

            var meta_title = document.querySelector('meta[property="og:title"]');
            var article = document.querySelector('article');

            // Only select pages with a title and article section.
            if (meta_title && article)
            {
                // Use first paragraph for the description.
                var description = document.querySelector('article > p');

                var doc = {
                    title: meta_title.content,
                    body: article.textContent,
                    description: truncateWords(description.textContent, 50),
                    url: file.replace(new RegExp('^' + options['index-dir']), ''),
                    id: hashString(file)
                };
                index.addDoc(doc);
            }
        }
        ...
```

The generated index is then serialised and output to a JSON file, which will be loaded by the search results page when performing searches. To reduce the size of the index, I removed the document body in the `documentStore`, the trade-off being that only the description field can be used for the search snippet:

``` javascript
// Serialise and write the index.
var out = index.toJSON();

// Remove the body field from the documentStore to decrease the size of the index.
for (var id in out.documentStore.docs)
{
    delete out.documentStore.docs[id].body;
}

fs.writeFileSync(options.output, JSON.stringify(out), 'utf-8');
```

The script is run using [npm](https://www.npmjs.com/) with the following `package.json`:

``` json
    "devDependencies": {
        "elasticlunr": "^0.9.0",
        "recursive-readdir": ">=2.0.0",
        "command-line-args": ">=3.0.1",
        "jsdom": ">=9.4.2"
    },
    "scripts": {
        "build-index": "_scripts/build-index _site -i */404.html */search/* */sitemap/* */blog/index.html -o data/index.json"
    }
```

This configuration will ignore files that I don't want to index such as `404.html`.

Currently, the index must be rebuilt manually each time content is updated or added by running:

```
~$ npm run build-index
```
In future, I plan to automate this and add support for incremental index rebuilds by integrating this with [Jekyll's hooks](https://jekyllrb.com/docs/plugins/#hooks).

The full source is available in the [repository of this site](https://github.com/s-knibbs/s-knibbs.github.io/blob/master/_scripts/build-index).

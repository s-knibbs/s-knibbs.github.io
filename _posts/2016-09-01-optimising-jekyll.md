---
layout: post
title: Optimising Jekyll
image:
  url: /image/jekyll-logo-speed.svg
  name: High speed jekyll
  caption: Image adapted from [Jekyll branding](https://github.com/jekyll/brand#jekylls-logo).
  centered: true
---
Being a static site generator, Jekyll will give you pretty good page load performance out of the box. But that doesn't mean that it can't be optimised. When I initially tested my site with [PageSpeed Insights](https://developers.google.com/speed/pagespeed/), the mobile score was **69/100**. We can do better than that!

### Asynchronous loading

The first thing that PageSpeed tells you to fix is synchronous loading of JavaScript and CSS in "above-the-fold" content. What this means is that any scripts and stylesheets placed in the HTML `<head>` will block the page from rendering until these have loaded, even if the full HTML has already loaded.

To fix this with JavaScript is quite easy. Script tags can simply be placed at the end of the `<body>` tag. The page will then be able to render correctly before encountering these scripts.

For CSS, things are more complicated. Firstly the CSS must be partitioned into critical CSS and non-critical CSS. The critical CSS should be the minimum to render the site in a functional way, such as the styling for the overall layout and colour scheme. Other CSS, including custom fonts and syntax highlighting can be loaded later.

Currently there isn't a widely supported way to load CSS asynchronously natively. Fortunately, this can be handled in JavaScript the [loadCSS](https://github.com/filamentgroup/loadCSS#loadcss) tool. This tool also includes a polyfill for the [rel=preload](https://developers.google.com/web/updates/2016/03/link-rel-preload?hl=en) feature that will allow asynchronous loading of CSS and other resources natively in future.

### Minify Everything!

#### CSS

CSS minification can be achieved by using the built-in SASS/SCSS support in Jekyll. I added the following layout:

```css
{% raw %}---
layout: none
---
{{ content | scssify }}{% endraw %}
```

Minifying the CSS is then a case of adding the following front matter to all CSS files:

```yaml
---
layout: stylesheet
---
```

And enabling minification in the SASS processor by adding the following to `_config.yml`:

```yaml
sass:
  style: compressed
```

#### HTML

By default, liquid preserves any whitespace in template files. Any whitespace within a for-loop can generate lots of extraneous whitespace in the generated HTML. To fix this, I discovered
[an html layout called compress](http://jch.penibelst.de/) which removes whitespace and HTML comments. Because this is just a liquid template and not a Jekyll plugin, this is compatible
with Github Pages.

#### JavaScript

JavaScript minification is more complicated. I found that there isn't really a way to achieve this without using a Jekyll plugin. I decided to create my own plugin which generates the minified files in-place rather than in the `_site` directory, so that this can be used with Github Pages. The generated files are then committed and served in the production version of the site.

The following snippet uses the [Uglifier gem](https://rubygems.org/gems/uglifier) to minify all JavaScript files, unless already minified:

```ruby
    scripts.each do |script|

        # Skip already minified files
        if script.path =~ /.min.js$/
            next
        else
            dest_path = script.path.sub! ".js", ".min.js"
            script_mtime = File.mtime(script.path)

            # Only minify changed files
            unless File.exist?(dest_path) and File.mtime(dest_path) > script_mtime
                Jekyll.logger.debug "Minifying: %s" % script.path
                output = uglifier.compress(File.read(script.path))

                File.open(dest_path, 'w') do |f|
                    f.write(output)
                end
            end
        end
    end
```

I then created the following template, to be included in `default.html`:

```html
{% raw %}{% for script in include.scripts %}
  {% if site.environment == "production" %}
  <script type="text/javascript" src="{{ script | remove: '.min' | remove: '.js' | append: '.min.js' }}"></script>
  {% else %}
  <script type="text/javascript" src="{{ script }}"></script>
  {% endif %}
{% endfor %}{% endraw %}
```

This will use the minified scripts in the production site but use the originals for development.

### Results

After minification, I measured the difference in data downloaded:

| No minification | Minified size | Saving |
|------------------------------------------|
| 81 - 130 kB     | 75 - 123 kB   | 5 - 7% |

The overall saving is fairly small since this is not a particularly script heavy site and external resources like fonts and the jQuery library are not affected.

However, the score in PageSpeed is now **93/100** compared with **69/100** previously. This is important because these scores are factored into Google's search ranking algorithm since they affect the user experience.

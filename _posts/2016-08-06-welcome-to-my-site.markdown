---
layout: post
title:  "Welcome to my personal site!"
date:   2016-08-06 17:53:00
categories: "Site Development"
tags: jekyll html
---

I'd like to welcome you to my new site. I have created this site both to promote myself professionally and to share some of my experiences. The site is still somewhat a work in progress, but I will be adding more content in the following weeks and maintaining my blog.

### Building the site

The site is built using [Jekyll](https://jekyllrb.com/) which is a static site generator implemented in Ruby. I have chosen to use a static site generator rather than a content management system (CMS) such as Drupal or Wordpress to avoid some of the issues I have encountered with CMSs and to avoid the security headaches they provide.

In particular I found Drupal to be a rather bloated system with a confusing array of plugins. From a developer perspective I found it to be difficult to work with, it was not initially clear to me how the html template (*.tpl.php) files fit together. Drupal 7 does not seem to take advantage of PHP's OO support, extending it is instead a case of using specially named functions.

In contrast, I have found Jekyll to be easy to work with. It uses the [liquid templating engine](https://shopify.github.io/liquid/) created by [Shopify](https://www.shopify.co.uk/). The syntax is quite similar to the [Django templating language](https://docs.djangoproject.com/ja/1.9/ref/templates/language/), for example, the syntax supports variable filters in the same way:

```html
<span class="post-preview">{{ post.excerpt | truncate: 200 }}</span>
```

It's quite easy to customise the look of the site by defining custom variables in the YAML header (the [YAML Front Matter](https://jekyllrb.com/docs/frontmatter/) in Jekyll parlance) of each page. For example, if you want to control the order that pages are displayed in the main navigation menu, you can add a custom 'order' variable:

```yaml
---
layout: page
title: About Me
order: 1
---
```

Then, in `header.html`, sort using this variable with the following:

```html
{% raw %}
{% assign sorted_pages = site.pages | sort: "order" %}
{% for page in sorted_pages %}
    <a class="page-link" href="{{ page.url }}">{{ page.title }}</a>
{% endfor %}
{% endraw %}
```

The other big plus with Jekyll is the built in support that [GitHub Pages](https://pages.github.com/) provides. I can publish updates to the site simply by pushing changes to the master branch. The site will then be automatically built and updated by GitHub.

I'm currently in the process of implementing search functionality for the site. The search page is currently just a placeholder. This is one of the more difficult things to support with a static site generator. I will either need to use a hosted service such as [Google Custom Search](https://cse.google.com/cse/) or find some way to handle this on the client side.


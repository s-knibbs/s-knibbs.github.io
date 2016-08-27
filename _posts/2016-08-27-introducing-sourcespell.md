---
layout: post
title: Introducing SourceSpell
categories: "Site Development"
tags: python open-source pypi pygments pyenchant
---

I was looking at tools that could spell check comments and string literals in my work. However, none of the existing tools (e.g [SCSC](http://www.softario.com/scsc.html)) are particularly well supported or only support a limited range of languages. So I decided to create my own tool.

I had the idea of using the excellent [Pygments library](http://pygments.org/) for source code parsing. Pygments is one of the leading syntax highlighting libraries and supports a long and growing [list of languages](http://pygments.org/languages/).
The content in code comments, string literals, html attributes and text content is then spellchecked using the [PyEnchant library](http://pythonhosted.org/pyenchant/) which supports a number of spellchecking backends including *Hunspell* and *Aspell*.

I have released the first version to [PyPI](https://pypi.python.org/pypi/SourceSpell). My aim is to use this tool to spellcheck this site. I still have some more work to do to get this working well for my site though. The checker doesn't currently handle markdown
or html template files correctly (e.g. liquid template tags are not filtered out). I also plan to add support for a separate config file, the command arguments can get quite long currently if there are many files to exclude from checking.

In the meantime, I have been checking the content on my site by adding the `contenteditable="true` property to the `<article>` and `<header>` tags in the development version of my site. This causes the browser to spellcheck the content within these tags.

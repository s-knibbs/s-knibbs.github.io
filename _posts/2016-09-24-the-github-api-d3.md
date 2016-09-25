---
layout: post
title: Visualising GitHub repo data with d3.js
tags: d3 javascript svg octokit github
mathjax: true
---
I have been spending some time learning [d3.js](https://d3js.org) (Data-Driven Documents), a data visualisation library for javascript. I used d3 to create a [bubble chart](#languages-used) of all programming languages I have used throughout my public GitHub repositories, using data from the GitHub API.

### Backend

I added a function to my site's custom build plugin to output the language statistics to a json file. It uses [octokit](https://octokit.github.io/) to interact with GitHub and the `JEKYLL_GITHUB_TOKEN` I had previously configured for the [github-metadata](https://github.com/jekyll/github-metadata) plugin.

```ruby
    def _get_repo_languages(site)
        client = Octokit::Client.new({:auto_paginate => true, :access_token => ENV['JEKYLL_GITHUB_TOKEN']})

        language_totals = Hash.new
        client.list_repos.each do |repo|
            languages = client.languages(repo['full_name'])
            language_totals.merge!(languages.to_h) {|k, new, old| new + old}
        end

        # Write json file in the format: {"language_name": total_bytes, "C": 4567, ...}
        File.open('data/language-totals.json', 'w') do |f|
            f.write(language_totals.to_json)
        end
    end
```

This approach does of course mean that I have to manually perform a rebuild of my site locally to update the data. I also made the data update an optional part of the build process to avoid hitting the GitHub API and slowing down the build each time a rebuild is triggered.

### Frontend

I used d3's [circle packing algorithm](https://github.com/d3/d3-hierarchy#packSiblings) (`d3.packSiblings`), which packs circles based on their radii. To calculate the radii corresponding to each language I used the following formula:

$$
{% raw %}
r = \arctan((a*lang\_size / total) + min)
{% endraw %}
$$

This is to prevent individual bubbles from becoming too large or small.

The bubbles are then displayed in an SVG using the following:

```javascript
d3.json("/data/language-totals.json", function (error, data) {
    if (error) throw error;

    // Add groups for each bubble
    var nodes = svg.selectAll('.bubble')
        .data(to_circles(data))
        .enter().append('g')
        .attr('class', 'bubble')
        .attr('transform', function (d){
            return "translate(" + d.x  + "," + d.y + ")"; 
        });

    // Add the circle elements
    nodes.append("circle")
        .attr("r", function (d) { return d.r; })
        .style("fill", function (d) { return d.color })
        .style("stroke", "white")
        .style("stroke-width", 2);

    // Add the circle text
    nodes.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function (d) { return d.name + " " + d.percentage.toPrecision(3) + "%"; })
        // Hide text for small bubbles to avoid overlaps
        .classed("hide", function (d) { return (this.getBBox().width > (2.5 * d.r)); });
...
```

The full source is available in this [site's repository]({{ site.github.repository_url }}/tree/master/js/language-bubbles.js).

### Languages Used in my Public Repos {#languages-used}

[View Standalone](/static/language-bubbles.html)

<iframe src='/static/language-bubbles.html' style='width: 100%; height: 850px; overflow: hidden' scrolling='no' onload="this.contentDocument.body.scrollHeight + 'px';">
</iframe>

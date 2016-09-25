'use strict';
(function () {
    var diameter = 900;
    var svg = d3.select('#main-content').append('svg')
        .attr("width", diameter)
        .attr("viewBox", "0 0 " + diameter + " " + diameter)
        .style("max-width", "100%");

    d3.selection.prototype.moveToFront = function()
    {
        return this.each(function(){
            this.parentNode.appendChild(this);
        });
    }

    function to_circles(data)
    {
        var circles = [];
        var total = 0;
        var colors = d3.schemeCategory10.slice(0).reverse();

        for (var name in data)
        {
            total += data[name];
        }
        for (var name in data)
        {
            circles.push({
                name: name,
                r: Math.atan((3 * data[name] / total) + 0.04) * (diameter / 3),
                percentage: (100 * data[name] / total),
            });
        }
        // Add colors
        circles.sort(function (a, b) {
            return a.percentage - b.percentage;
        });
        for (var i = 0; i < circles.length; i++)
        {
            var color = colors.pop();
            colors.unshift(color);
            circles[i]['color'] = color;
        }
        d3.packSiblings(circles);

        return circles;
    }

    d3.json("/data/language-totals.json", function (error, data) {
        if (error) throw error;

        var nodes = svg.selectAll('.bubble')
            .data(to_circles(data))
            .enter().append('g')
            .attr('class', 'bubble') // TODO: Improve placement of bubbles to avoid them going off screen
            .attr('transform', function (d){
                return "translate(" + (d.x + diameter / 2) + "," + (d.y + diameter / 2.5) + ")"; 
            });

        nodes.append("circle")
            .attr("r", function (d) { return d.r; })
            .style("fill", function (d) { return d.color })
            .style("stroke", "white")
            .style("stroke-width", 2);

        nodes.append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .text(function (d) { return d.name + " " + d.percentage.toPrecision(3) + "%"; })
            // Hide text for small bubbles to avoid overlaps.
            .classed('hide', function (d) { return (this.getBBox().width > (2.5 * d.r)); });

        var mouseenter = (bowser.chrome) ? "mouseenter" : "mouseover";
        var mouseleave = (bowser.chrome) ? "mouseleave" : "mouseout";
        nodes.on(mouseenter, function () {
            var sel = d3.select(this);
            sel.moveToFront();
            var text_bbox = sel.select('text').classed('mouseover', true).node().getBBox();
            var padding = 3;
            sel.insert('rect', 'text')
                .style('fill', 'rgba(255,255,255,0.5)')
                .attr('x', text_bbox.x - padding)
                .attr('y', text_bbox.y - padding)
                .attr('width', text_bbox.width + 2 * padding)
                .attr('height', text_bbox.height + 2 * padding);
        });
        nodes.on(mouseleave, function () {
            d3.select(this).select('text').classed('mouseover', false);
            d3.select(this).select('rect').remove();
        });
    });
})();

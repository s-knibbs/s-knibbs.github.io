---
layout: post
title: Experimenting with Cellular Automata
image:
  url: /static/calife/CaLife-screen.gif
  alt: Calife screenshot
  caption: Diamoeba rule using S5678/B35678
categories: Experiments
tags: SDL Emscripten C Cellular-Automata
---
Some time ago I experimented with [cellular automata](https://en.wikipedia.org/wiki/Cellular_automaton) (CA), the most famous of which is [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). Cellular automata are a set of rules based systems for generating life-like simulations.

There are a number of applications to cellular automata, including:

* Procedural generation in games such as [cave generation](https://jeremykun.com/2012/07/29/the-cellular-automaton-method-for-cave-generation/).
* Modelling the [spread of forest fires](http://www.sciencedirect.com/science/article/pii/S0307904X06000916).
* [Random number generation](http://ieeexplore.ieee.org/document/888056/?arnumber=888056).

The Game of Life automaton can even be used to [simulate itself](https://www.youtube.com/watch?v=xP5-iIeKXE8).

I created my own app to experiment with some of the different CA rules. I created this in C with [SDL](https://www.libsdl.org/), a low level game development library.
Later, I ported this to [Emscripten](https://kripken.github.io/emscripten-site/) which has built-in support for SDL, to compile this to run in a brower. A demo of this is [available below](#demo).

The core algorithm is fairly simple. For each cell in the grid we loop over the immediate neighbourhood and count the cells alive:

```c
for (x = 0; x < width; x++)
{
    for (y = 0; y < height; y++)
    {
        int neighbours = 0;
        int idx = 0;
        uint8_t current;
        uint8_t next;
        for (xn = -1; xn <= 1; xn++)
        {
            for (yn = -1; yn <= 1; yn++)
            {
                if (xn == 0 && yn == 0) continue;
                // Neighbourhood index, wrap to the opposite side at edges.
                idx = mod((x + xn), width) + width * mod((y + yn), height);
                neighbours += in[idx];
            }
        }
...
```

Then the next state is determined by looking at the rules look-up-table. The pixel data is then written, I have added a 'dying' state for cells that have just changed from
alive to dead to customise the look:

```c
...
        current = in[idx];
        next = rules[current][neighbours];
        out[idx] = next;

        if (next)
        {
            pixels[idx] = alive;
        }
        else if (current != next)
        {
            pixels[idx] = dying;
        }
        else
        {
            // Shift out alpha bits to fade out dying cells
            pixels[idx] = ((pixels[idx] & AMASK) << 1) | (~AMASK & pixels[idx]);
        }
    }
}
```

The full source is available at [github](https://github.com/s-knibbs/CaLife).

### Demo

Use the controls on the right to changes the CA rules applied and to adjust the colours, (changing the rules currently requires a restart). You can find a list of interesting rules [here](http://www.mirekw.com/ca/rullex_life.html).

<iframe src="/static/calife/index.html" allowfullscreen="true" style="width: 100%;" onload="this.style.height = this.contentDocument.body.scrollHeight + 'px';"></iframe>

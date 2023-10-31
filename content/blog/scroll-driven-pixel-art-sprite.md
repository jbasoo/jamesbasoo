---
title: Control Pixel Art Sprites With CSS Scroll-Driven Animations
description: These fancy, new CSS scroll-driven animations are proving to be pretty darn powerful. I found Bramus' concept of using them to detect scroll direction intriguing, and after experimenting found that detecting multiple axes allows you to directionally control an image sprite!
date: 2023-10-31
tags:
    - css
    - scroll-driven animations
    - style queries
    - nojs
---
<video controls loop src="/video/pixel-art-scroll-8-dir.mp4"></video>

These fancy, new, CSS scroll-driven animations are proving to be pretty darn powerful. I found [Bramus' concept](https://www.bram.us/2023/10/23/css-scroll-detection/) of using them to detect scroll direction intriguing, and after experimenting a bit, discovered that detecting multiple axes allows you to directionally control an image sprite! Without JavaScript! This involves creating [stepped sprite animations](https://blog.logrocket.com/making-css-animations-using-a-sprite-sheet/) for each direction and running them when that direction is detected.

## The Concept

I'd recommend reading the [single axis explanation](https://www.bram.us/2023/10/23/css-scroll-detection/#the-concept) first as Bramus goes into the core concept. The multi axis is essentially the same, just duplicated for the horizontal axis which can be seen in the [Wormhole demo](https://www.bram.us/2023/10/23/css-scroll-detection/#demo-wormhole) and my [reduced experiment](https://codepen.io/jbasoo/pen/NWoNvLx). Detecting both axes just comes down to adding another animation timeline for the inline axis, and when you combine this with style queries, you get 4 way control over an image sprite.

```css
@container style(--scroll-block-direction: 1) {
  .character:before {
    animation-name: to-bottom;
  }
}

@container style(--scroll-inline-direction: 1) {
  .character:before {
    animation-name: to-right;
  }
}
```

<div class="feature-fallback sda">
    <div class="feature">
        <p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="VwgazqR" data-user="jbasoo" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/jbasoo/pen/VwgazqR">
            4 direction pixel art sprite control with CSS Scroll-Driven Animations</a> by James Basoo (<a href="https://codepen.io/jbasoo">@jbasoo</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
        </p>
    </div>

    <div class="fallback">
        <video controls loop src="/video/pixel-art-scroll-4-dir.mp4"></video>
        <p><strong>Your browser doesn't support Scroll-Driven Animations, here's a video of the demo instead.</strong> <a href="https://codepen.io/jbasoo/pen/VwgazqR">Live demo on Codepen</a></p>
    </div>
</div>

You might notice that diagonal movement is a little rough, however this is solvable. My [reduced experiment](https://codepen.io/jbasoo/pen/NWoNvLx) shows that **it's possible to infer a diagonal directions!** By combining horizontal and vertical detection in [style queries](https://developer.chrome.com/blog/style-queries/), we get 8 detectable directions!

```css
@container style(--scroll-block-direction: 1) and style(--scroll-inline-direction: 1) {
  h1:before {
    content: "↘";
  }
}
```

This then allows us to use an 8 direction character sprite to handle diagonal movement, albeit with slightly janky results.

<div class="feature-fallback sda">
    <div class="feature">
        <p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="VwgaJGz" data-user="jbasoo" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/jbasoo/pen/VwgaJGz">
            8 direction pixel art sprite control with CSS Scroll-Driven Animations</a> by James Basoo (<a href="https://codepen.io/jbasoo">@jbasoo</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
        </p>
    </div>

    <div class="fallback">
        <video controls loop src="/video/pixel-art-scroll-8-dir.mp4"></video>
        <p><strong>Your browser doesn't support Scroll-Driven Animations, here's a video of the demo instead.</strong> <a href="https://codepen.io/jbasoo/pen/VwgaJGz">Live demo on Codepen</a></p>
    </div>
</div>


## Caveats
The main caveat here is that the character doesn't remain in the direction they're pointed at. This is due to the scroll direction not persisting and returning to an idle state. I'm pretty sure I saw a demo around for triggering and persisting a state through scroll-driven animations or maybe `animation-fill-mode` might help, but it's 2AM at the time of writing so that's a job for future James.

Another caveat is that the web just wasn't meant for this. Controlling a character via scroll is pretty janky so I'm not sure it would be viable for an actual game. Still, it's a fun, zero JS experiment!

## Pondering Possibilities
The original demos utilised scroll velocity but I haven't tried that yet. The possibilities seem endless here, but I was pondering whether showing cartoony "speed lines" on fast scroll would be feasible. [Bramus sounded hopeful](https://front-end.social/@bramus/111285106651170862) so I may give that a shot at some point.

To be honest I still haven't fully grasped the original concept, I need to do more tinkering. I've only managed to detect 8 directions, but maybe one of you maths boffins can figure out more fine-grained directionality based on the velocities/directions.

<hr>

Happy coding, you got this!

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
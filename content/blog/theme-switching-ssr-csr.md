---
title: SSR + CSR Theme Switching
description: The theme switcher was one of the first things I built for my site but it had an annoying flaw.
date: 2024-08-30
tags:
    - css
    - js
    - ts
    - edge functions
    - serverless
---

I've had a theme switcher since I made my website, but all the logic was client side so there would be a brief [Flash of inAccurate coloR Theme (FART)](https://css-tricks.com/flash-of-inaccurate-color-theme-fart/) on page load. Unfortunately, with the site being hosted on Netlify, I don't have access to the usual server-side power that I'm used to from years of working with PHP.

Thankfully, Netlify has Edge Functions, which are like a sprinkle of back-end, as a treat, without having to manage a server. They're somewhat limited, but they're perfect for what I needed them for, reading a cookie and modifying HTML. Pairing Edge Functions with Javscript means both the SSR and CSR are taken care of.

## The JavaScript
Managing cookies sucks. The methods for handling `localStorage` are dead easy but I suppose that updating tehcnologies embedded in the fabric of the web since I was 3 might be a tall order. I'm using `js-cookie` to manage these more easily but apart from that, this JS has no dependencies.

I get the user's pereferred color scheme and if there's no theme cookie already set, then I map the user's preferred color to one of my themes, then set the data attribute and cookie. From there, it's just listening to the click event and updating again.

```javascript
import Cookies from '/js-cookie/js.cookie.min.mjs'

const themeSwitcher = document.querySelector('.theme-switcher');
const defaultTheme = (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'holodeck' : 'light');
const currentTheme = Cookies.get('theme');

if(!currentTheme) {
	Cookies.set('theme', defaultTheme);
	document.documentElement.dataset.theme = defaultTheme;
}
else {
	document.documentElement.dataset.theme = currentTheme;
}

if(themeSwitcher) {
	themeSwitcher.addEventListener('click', (event) => {
		if(event.target.tagName === 'BUTTON') {
			document.querySelector('html').dataset.theme = event.target.value;
			Cookies.set('theme', event.target.value);
		}
	});
}
```

## The Edge Function
I'm not a TypeScript whizz, but most of the Edge Function examples on Netlify are in TypeScript, so I just went with it.

The logic here is to get the cookie if there is one and make the same update to the HTML as the JavaScript, but before it makes it to the user, avoiding the flash. There's also some extra config and header sniffing to prevent this from running on non-HTML resources.

It was only after figuring out 90% of this that I discovered [Jason's post](https://www.learnwithjason.dev/blog/css-color-theme-switcher-no-flash/) where he outlines his approach. It's different from the way I accomplished it, but response header detection helped me safeguard against file types I may have missed. It would be nice if this could be accomplished in the config though, so the function would only run on HTML files.


```typescript
import type { Config } from "@netlify/edge-functions";
import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

export default async function handler(request: Request, context: Context) {
  const response = await context.next();
	const theme = context.cookies.get("theme");
	const type = response.headers.get('content-type') as string;

	if(!theme || !type.startsWith('text/html')) return;

  const rewriter = new HTMLRewriter().on("html", {
		element: (element) => {
			element.setAttribute('data-theme', theme);
		}
	});

  return rewriter.transform(response);
}

export const config: Config = {
  path: "/*",
  excludedPath: [
		"/*.css",
		"/*.js",
		"/*.mjs",
		"/*.svg",
		"/*.jpg",
		"/*.woff2",
		"/*.mp4"
	]
}

```
## Future James's problems
There's still a flash if the user is new and prefers a dark theme, as it default to a light theme. Eventually I might get around this by using `light-dark()` and `prefers-color-scheme` but they weren't around when I initially built the site and would require significant re-architecting.

There is also no "auto" mode, to defer to the user's preference at all times instead of remembering their previous choice.

## Bonus
This all came about when I tried adding [cross-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions#cross-document_view_transitions) and found that the flash was even more jarring than it used to be. I also removed `font-display: swap;` from my `@font-face` declarations which makes the flash of unstyled text briefly invisible instead. It feels smoother, if a touch slower.

Going further down the rabbit hole, I realised that [the font I use](https://fontsource.org/fonts/overpass) now has a variable variant, so I swapped that out to reduce requests and overall payload size.

*As a sidenote, [Fontsource](https://fontsource.org) is pretty sweet. Being able to install and update fonts as a node module is just lovely.*

---
title: How To Write CSS And Influence People
description: I design my codebase architecture to influence how my team codes; I think Tailwind does the same thing to its users.
date: 2025-03-27
tags:
  - css
  - tailwind
---

<div class="breakout guttered">
	<img src="/img/road-block-speed-bumps.jpg" alt="An amateurish illustration of a road with multiple paths. One has speed bumps, the other has a roadblock that would divert the person following the path down another road in the opposite direction." width="2634" height="1757" class="hero sketchy-border">
</div>

Coding standards are generally a good thing. They get everyone on the same page which reduces ambiguity and headaches down the line. However, despite outlining standards in internal docs and project readmes, they aren't always followed. Even enforcing them in IDEs can be hit or miss, especially if you're cobbling together disparate technologies and need to be more flexible.

## Is CSS Broken?

One of the big draws of Tailwind is that it's somewhat of an off-the-shelf design system, one that many developers are familiar with. Like it or not, thats powerful. Its opinionated coding standards help create consistent, predictable codebases, which I don't think any of us would say no to. Proponents of Tailwind often declare "[CSS is broken, Tailwind fixes it](https://thebcms.com/blog/why-tailwind-doesnt-suck)," but many of the arguments come down to 2 things, long term organisational issues, and that cascading and inheritance are hard.

### Human Problems

Organisation problems can be solved with a design system, thoughtful architecture, or at least some enforced conventions. I'm not gonna lie, that's hard. It's a human problem, and humans are messy and dysfunctional. In my experience, however, adding Tailwind to that mess makes things get worse, faster. It's giving in to the chaos. I'm still maintaining almost decade-old codebases which have passed through scores of developers, but our 2 year old Tailwind projects give me more CSS maintenance grief than any of those ever did. This is less likely to be the case in greenfield JS framework projects, where it's a blank slate and everything can be a component, but outside of those I wouldn't recommend Tailwind as a framework.

### Technology Problems

Features like cascading and inheritance are are hard for a lot of folks to master. The core concepts run counter to most other programming languages, which are imperative, not declarative. CSS is broad and far reaching, which is very powerful for creating UIs, but you might feel lost until it clicks. [@layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) and [@scope](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope) now help us to more precisely target elements without entirely throwing away the features that make CSS so powerful but we're still waiting on Firefox for @scope support. In the meantime, Chris has some good [practical examples](https://gomakethings.com/css-isnt-broken-tailwind-utility-classes-and-css-architecture/) of when you should use utility classes.

## Utility-First CSS

Our team has varying views on Tailwind, some are indifferent, some are pro, some are con. I've used it enough to know the maintenance headaches it causes, but I still see a few merits to having off-the-shelf utility classes available for **_occasional_** use. Emphasis on the **_occasional_**.  For example, they're great for simple layouts where the container has no semantic meaning and solely exists to apply a basic grid or flex layout. 10 years ago, before grid and flex were well supported, these were the kinds of utilities I'd either hand-roll myself or get from a grid system like Susy or 960.gs. Utility classes are indeed a handy tool, but only having 1 tool in your toolbox is very limiting.

CSS can do so much more than Tailwind abstracts, and only learning the abstraction means that you don't gain a good understanding of what is being abstracted. This is something I found out the hard way when I learned jQuery before learning vanilla JavaScript. jQuery provided a sensible API to aid in writing cross-browser compatible JavaScript, but that had the downside of having to learn how JavaScript actually worked once jQuery became redundant. Tailwind does have some patterns could remain useful, however, like many frameworks and libraries before it, it'll eventually be surpassed by the web platform.

## Ethical Influencing - Roadblocks VS Speed Bumps

The whole idea of influencing people "gives me the ick" (as the kids say these days). I don't like being tricked into things and being forced down a certain path is incredibly demoralising. That being said, I find informed guidance to be generally acceptable, desirable even. However, becoming informed sometimes requires you to slow down and consider the information.

I've started to view this as the difference between **roadblocks** and **speed bumps**. The former diverts you away from your destination and the latter prevents you from going too fast in potentially hazardous environments. It's an idea we can apply to our architecture when we want to encourage adherence to coding standards but still allow going off-script if it's truly necessary.

A roadblock is very frustrating. It requires you to find a different route to your destination, or prevent you from getting there at all. It may keep you out of danger though, so they certainly have their place, but when something is more of a coding style or preference I would prefer to be slowed down rather than diverted.
## Guiding My Team's Coding Standards

It was decided (not by me) that Tailwind should be available on some of our projects. While I personally find the odd utility class useful, the mere existence of such a prominent tool on a project can encourage it's over-use if the team does not have strictly enforced coding standards. As a "fast-paced agency"  that deals in a wide range of stacks, we don't exactly have the discipline to keep this kind of tech debt in check.

The approach I decided to take was to use Tailwind as a library, not a framework. Include it, but disable its [core plugins](https://v3.tailwindcss.com/docs/configuration#core-plugins). This means that while it's part of the toolkit, nothing will be output unless the developer explicitly enables the plugin(s) they require. This reduces the risk of Tailwind generating classes that may clash with the existing codebase, or being over-eager and bloating the CSS with code that won't be used. Those are the technical reasons for this decision, but I also just wanted to discourage the team from over-using Tailwind.

Let's pretend you're new to a project with this setup. You look in the root and see `tailwind.config.js`. Sweet! I know Tailwind, I'll use that everywhere. However when you try, it doesn't work. You look at the config file and see that some wally has disabled the core modules. You don't want to change it as that's a pretty drastic update, so you then ask someone else on the team why this was done and they direct you to the readme.md that you shoud've checked in the first place. It reads:

> Semantic classes are preferred, however falling back to utilities is an option. As a general rule if an element needs more than 5 utility classes then it's probably complex enough to have a descriptive, semantic class name. This also serves to self-document what the element is for other developers (probably you, 6 months later).
>
> Tailwind is available, however most core plugins are disabled to reduce unnecessary CSS and clashes with existing CSS. These can be enabled as needed in the `corePlugins` array in `tailwind.config.js`. Refer to the [Tailwind docs](https://v3.tailwindcss.com/docs/configuration#core-plugins) for core plugin info.

You've been successfully slowed down and steered towards reading the documentation and actually talking to your colleagues. This [added friction](https://indiehackers.social/@simeon/114188109517778984) made you stop, think, ask questions, and ultimately discouraged you from over-using a tool with considerable downsides. If, after all that you still deem it worth it, then there could very well be a good reason to enable a core plugin.

This did eventually led to us having a discussion and agreeing upon a handful of core plugins that we'd be likely to enable on most projects. I would've preferred to have less plugins enabled by default, but considering Tailwind doesn't (usually) output anything unless it finds a matching class in your codebase, I'd call it a step in the right direction.

## Tailwind V4 - Influencing CSS Strategy

A lot has changed with [version 4](https://tailwindcss.com/blog/tailwindcss-v4), it's finally getting some modern features like OKLCH colors, @property, cascade layers, and color-mix(). The configuration has also been moved out of JS and into the main CSS file, which has some pros and cons.

There's plenty of [thoughts](https://www.youtube.com/watch?v=q55u3_Nj3Lw) and [hot takes](https://nmn.sh/blog/2024-11-30-thoughts-on-tailwind-4?ref=dailydev) on the changes but there's 2 in particular that stuck out to me, [the removal of core plugin and safelist configurations](https://tailwindcss.com/docs/upgrade-guide#disabling-core-plugins:~:text=The%20corePlugins%2C%20safelist%2C%20and%20separator%20options%20from%20the%20JavaScript%2Dbased%20config%20are%20not%20supported%20in%20v4.0.). The [core plugin config](https://v3.tailwindcss.com/docs/configuration#core-plugins) "lets you completely disable classes that Tailwind would normally generate by default if you don’t need them for your project." [This](https://tailwindcss.com/docs/upgrade-guide#disabling-core-plugins) removal could have a number of reasons such as implementation difficulties with the new configuration method or simply low usage. However, considering other moves from the Tailwind team, I can't help but think that this could be a roadblock to divert users towards complete Tailwind reliance.

Between the marketing and the changes to the framework it's obvious that Tailwind wants to be the one and only tool in your CSS toolbox. That's fine for most users who want the entire framework, but the removal of core plugin configuration prevents you from using Tailwind as a library. You get the full-fat framework or nothing at all.

If I put on my tin foil hat I get the impression that this all or nothing approach could be part of a strategy to influence developers, not unlike I did internally, albeit more widely and forcefully. Not letting you adapt Tailwind to your project pushes you to adapt your project to Tailwind. You need to rip out your existing clashing CSS and rewrite it with utilities if you want to use Tailwind safely and without duplication.

## Libraries > Frameworks

Given this change and that I sometimes make use of the removed [safelist](https://v3.tailwindcss.com/docs/content-configuration#safelisting-classes) for CMS generated HTML, I won't be using V4. As previously stated, I've written my own utilities in the past but to be honest, Tailwind's are usually better so I'll be sticking with V3. If these features could be re-introduced then I would happily use V4 as there are clear improvements. Right now, for me, it's just not a good fit.

Therein lies the problem with frameworks. If you want to take advantage of new features, you often need to let go of old ones. That is rarely the case when you build closer to a slow-moving platform. [Your velocity can be faster](https://csswizardry.com/2025/01/build-for-the-web-build-on-the-web-build-with-the-web/#:~:text=If%20I%20was%20only%20able%20to%20give%20one%20bit%20of%20advice%20to%20any%20company%3A%20iterate%20quickly%20on%20a%20slow%2Dmoving%20platform.) because the ground isn't shifting like sand under your feet. That's why I'll continue to architect my codebases with libraries and not frameworks. I'll use design patterns that encourage building closer to the web, even if that means having a difficult, messy, human interaction from time to time.

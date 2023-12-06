---
title: Converting SVGs to a Shopify Liquid snippet
description: I can't say I'm a huge fan of this Shopify SVG icon technique but it's pretty common yet entirely manual... until now.
date: 2023-12-06
tags:
    - gist
    - shell
    - shopify
    - svg
---
{% raw %}
In today's episode of automation that I convince myself is necessary because human error always gets the better of me, here's a happy little shell script to convert a directory of SVGs into a Shopify Liquid snippet. Shopify lacks any sort of svg/icon pipeline and this snippet [technique is pretty common](https://community.shopify.com/c/shopify-design/how-to-use-svg-from-another-snippet-in-the-liquid-template/m-p/1782485/highlight/true#M476691), and I thought it could use a little automation.

```shell
echo "Converting SVGs to Shopify Liquid Snippet"

liquid=$'{% case icon %}\n';

for svg in $1/*.svg; do
    file="$(basename $svg)";
    name="${file%.*}"

    liquid+="    {% when '"${name}"' %}"$'\n'
    liquid+="    $(cat $svg)"
    liquid+=$'\n'
done

liquid+="{% endcase %}";
echo "${liquid}" > $2
```

Add the script to a `svg-to-liquid.sh` file and run `svg-to-liquid.sh iconSourcePath icons.liquid` to generate the `icons.liquid` file. Add it to your theme's snippets, then you can output the icon using `{%- render 'icons', icon: 'icon-name' -%}`

I'm no bash wizard so please go ahead and @ me on [Mastodon](https://mastodon.social/@Jbasoo) if you're nerd-sniped into cleaning it up.
{% endraw %}

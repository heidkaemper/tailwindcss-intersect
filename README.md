# Tailwind CSS Intersection Plugin

Imagine you could write an Intersection Observer like a Tailwind CSS variant:
```html
<div class="opacity-0 intersect:opacity-100 transition-opacity"></div>
```

### Demo
[Click here to see it in action](https://heidkaemper.github.io/tailwindcss-intersect/example/)
([View Source](https://github.com/heidkaemper/tailwindcss-intersect/blob/main/docs/example/index.html))

---

## Installation
This package has two parts. A Tailwind CSS plugin and a tiny JavaScript snippet.<br>
Download and install it via npm:
```sh
npm install tailwindcss-intersect
```

### Import
Import it just like Tailwind CSS in your CSS file:
```css
@import "tailwindcss";
@import "tailwindcss-intersect";
```

If you are using a JavaScript configuration file, register it there as usual:
```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    require('tailwindcss-intersect')
  ],
}
```

### Add the necessary JavaScript snippet

#### Via CDN
You can include the CDN build of this plugin as a `<script>` tag to your site:
```html
<script defer src="https://unpkg.com/tailwindcss-intersect@3.x.x/dist/observer.min.js"></script>
```

#### Via NPM
Alternatively, you can add the observer to your JavaScript bundle:
```js
import { Observer } from 'tailwindcss-intersect/observer';

Observer.start();
```
Hot Tip: When building a SPA, it may be necessary to restart the Observer on route changes. You can call `Observer.restart()` to do so.

---

## Usage
Use the `intersect:` variant in your classes like you would with every other Tailwind CSS Variant:
```html
<div class="bg-cyan-500 intersect:bg-indigo-600 transition-colors"></div>
```

## Modifiers

### intersect-once
You can use `intersect-once` if you want to trigger the event only on the first appearance of an element.
```html
<div class="intersect:animate-spin intersect-once"></div>
```

### intersect-half
Use the `intersect-half` utility to trigger the event when at least half of the element is visible. (threshold is set to 0.5)
```html
<div class="intersect:animate-spin intersect-half"></div>
```

### intersect-full
Use the `intersect-full` utility to trigger the event when when the element is fully visible. (threshold is set to 0.99)
```html
<div class="intersect:animate-spin intersect-full"></div>
```

### intersect-[…]
Need a different threshold? Pass any value between `0` and `1` as an arbitrary value.
```html
<div class="intersect:animate-spin intersect-[0.3]"></div>
```

### intersect-margin-[…]
Grow or shrink the area the element is measured against. You can pass up to four values in `px` or `%`, just like the CSS `margin` shorthand.
```html
<div class="intersect:animate-spin intersect-margin-[200px]"></div>
<div class="intersect:animate-spin intersect-margin-[0px_0px_100px_0px]"></div>
```

## Trigger on load
Elements already visible on page load do not animate, because their styles apply before the observer runs. Add `no-intersect` to force the animation anyway.
```html
<div class="opacity-0 intersect:opacity-100 transition-opacity" no-intersect></div>
```

## Custom classes
If you want to define the intersection behavior in a custom class (e.g. with the @apply directive), add a `intersect` class to your HTML element.
```html
<div class="intersect custom-class"></div>
```

---

## Upgrading from 2.x
Version 3 requires **Tailwind CSS v4**. If you are still on Tailwind CSS v3, stay on the [2.x releases](https://github.com/heidkaemper/tailwindcss-intersect/tree/2.x).

The observer moved to its own entry point. Update the import path:
```diff
- import { Observer } from 'tailwindcss-intersect';
+ import { Observer } from 'tailwindcss-intersect/observer';
```

---

<a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS-4.0+-38bdf8?style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/tailwindcss-intersect"><img src="https://img.shields.io/npm/dt/tailwindcss-intersect?style=for-the-badge"></a>

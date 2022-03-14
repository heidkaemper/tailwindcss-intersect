# Tailwind CSS Intersection Plugin

Imagine you could write an Intersection Observer like a Tailwind CSS variant:
```html
<div class="opacity-0 intersect:opacity-100 transition-opacity"></div>
```

---

## Installation
This package has two parts. A Tailwind CSS plugin and a tiny JavaScript snippet.<br>
Download and install it with NPM:
```sh
npm install -D tailwindcss-intersect
```

### Add the plugin to your tailwind.config.js file
```js
// tailwind.config.js
module.exports = {
    // ...
    plugins: [
        require('tailwindcss-intersect')
    ],
}
```

### Add the necessary JavaScript snippet to your site

#### Via CDN
You can include the CDN build of this plugin as a `<script>` tag to your site:
```html
<script defer src="https://unpkg.com/tailwindcss-intersect@1.x.x/dist/observer.min.js"></script>
```

#### Via NPM
Alternatively, you can add the plugin to your JavaScript bundle:
```js
import Observer from 'tailwindcss-intersect';

Observer.start();
```

---

## Usage
Use the `intersect:` variant in your classes like you would with every other Tailwind CSS Variant:
```html
<div class="bg-cyan-500 intersect:bg-indigo-600 transition-colors"></div>
```

### The once utility
You can use `intersect-once` if you want to trigger the event only on the first appearance of an element.
```html
<div class="intersect:animate-spin intersect-once"></div>
```

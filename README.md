# Tailwind CSS Intersection Plugin

Tailwind CSS with Intersection Observer Variants

---

## 1. Installation
Install the package with NPM
```sh
npm install -D tailwindcss-intersect
```

### 1.1 Add the plugin to your tailwind.config.js file
```js
// tailwind.config.js
module.exports = {
    // ...
    plugins: [
        require('tailwindcss-intersect')
    ],
}
```

### 1.2 Add the necessary JavaScript snippet to your site

### Via CDN
You can include the CDN build of this plugin as a `<script>` tag to your site:
```html
<script defer src="https://unpkg.com/tailwindcss-intersect/dist/observer.min.js"></script>
```

### Via NPM
You can add the plugin to your JavaScript bundle like so:
```js
import Observer from 'tailwindcss-intersect';

Observer.start();
```

---

## Usage
Use the `intersect:` variant in your classes like you would with every other Tailwind CSS Variant:
```html
<div class="opacity-0 intersect:opacity-100 transition-opacity"></div>
```

### The once utility
You can use `intersect-once` if you want to trigger the event only on the first appearance of an element.
```html
<div class="opacity-0 intersect:opacity-100 transition-opacity intersect-once"></div>
```

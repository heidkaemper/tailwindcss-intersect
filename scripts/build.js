const fs = require('fs');
const esbuild = require("esbuild");

if (! fs.existsSync('./dist')) {
    fs.mkdirSync('./dist', 0744);
}

build({
    entryPoints: ['src/observer.cdn.js'],
    outfile: 'dist/observer.min.js',
    platform: 'browser',
    define: { CDN: true },
});

build({
    entryPoints: ['src/observer.js'],
    outfile: 'dist/observer.esm.js',
    platform: 'neutral',
    mainFields: ['main', 'module'],
});

build({
    entryPoints: ['src/plugin.js'],
    outfile: 'dist/plugin.js',
    target: ['node10.4'],
    platform: 'node',
});

function build(options) {
    options.define || (options.define = {});
  
    return esbuild.build({
        ...options,
        minify: true,
        bundle: true,
    })
      .catch(() => process.exit(1));
}

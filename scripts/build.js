const fs = require('fs');
const esbuild = require("esbuild");

if (! fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
}

build({
    entryPoints: ['src/observer/cdn.js'],
    outfile: 'dist/observer.min.js',
    platform: 'browser',
    define: { CDN: 'true' },
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

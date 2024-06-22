import fs from 'fs'
import esbuild from 'esbuild'

if (! fs.existsSync('./dist')) {
    fs.mkdirSync('./dist')
}

esbuild
    .build({
        entryPoints: ['src/observer/cdn.js'],
        outfile: 'dist/observer.min.js',
        platform: 'browser',
        define: {
            CDN: 'true'
        },
        minify: true,
        bundle: true,
    })
    .catch(() => process.exit(1))

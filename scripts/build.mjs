import fs from 'fs'
import * as esbuild from 'esbuild'

if (! fs.existsSync('./dist')) {
    fs.mkdirSync('./dist')
}

await esbuild.build({
    entryPoints: ['src/observer/cdn.js'],
    outfile: 'dist/observer.min.js',
    bundle: true,
    minify: true,
    platform: 'browser',
    define: { CDN: 'true' },
})

await esbuild.build({
    entryPoints: ['src/index.js'],
    outfile: 'dist/index.esm.js',
    bundle: true,
    platform: 'neutral',
    mainFields: ['main', 'module'],
})

await esbuild.build({
    entryPoints: ['src/index.js'],
    outfile: 'dist/index.cjs.js',
    bundle: true,
    platform: 'node',
    target: ['node10.4'],
})

fs.copyFile('./src/index.d.ts', './dist/index.d.ts', error => {
    if (error) {
        console.error(error.message)
        process.exit(1)
    }
})

fs.copyFile('./src/index.css', './dist/index.css', error => {
    if (error) {
        console.error(error.message)
        process.exit(1)
    }
})

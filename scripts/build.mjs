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
    entryPoints: ['src/index.mjs'],
    outfile: 'dist/index.mjs',
    bundle: true,
    format: 'esm',
    platform: 'neutral',
    mainFields: ['main', 'module'],
})

await esbuild.build({
    entryPoints: ['src/index.mjs'],
    outfile: 'dist/index.cjs',
    bundle: true,
    format: 'cjs',
    platform: 'node',
    mainFields: ['main', 'module'],
    footer: { js: 'module.exports = module.exports.default' },
})

await esbuild.build({
    entryPoints: ['src/observer/index.js'],
    outfile: 'dist/observer.mjs',
    bundle: true,
    format: 'esm',
    platform: 'neutral',
})

await esbuild.build({
    entryPoints: ['src/observer/index.js'],
    outfile: 'dist/observer.cjs',
    bundle: true,
    format: 'cjs',
    platform: 'node',
})

for (const file of ['index.css', 'index.d.ts', 'observer.d.ts']) {
    fs.copyFile(`./src/${file}`, `./dist/${file}`, error => {
        if (error) {
            console.error(error.message)
            process.exit(1)
        }
    })
}

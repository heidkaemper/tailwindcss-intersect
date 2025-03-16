const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

async function run(file) {
    const { currentTestName } = expect.getState()

    const config = {
        content: [`./jest/${file}`],
        corePlugins: { preflight: false },
        plugins: [require('../../')],
    }

    const result = await postcss(tailwindcss(config)).process('@tailwind utilities', {
        from: `${path.resolve(__filename)}?test=${currentTestName}`,
    })

    return result.css
}

describe('legacy tailwind', () => {
    if (! fs.existsSync(`${__dirname}/node_modules`)) {
        throw new Error(`Dependencies in ${__dirname} are missing`)
    }

    it('should add variants', async () => {
        expect(await run('content/variants.html', { directive: 'plugin' })).toIncludeAll([
            '.intersect\\:opacity-50:not([no-intersect]) { opacity: 0.5 }',
            '.intersect\\:hover\\:opacity-100:hover:not([no-intersect]) { opacity: 1 }',
        ])
    })

    it('should add arbitrary values', async () => {
        expect(await run('content/arbitrary-values.html', { directive: 'plugin' })).toIncludeAll([
            '.intersect\\:left-\\[100px\\]:not([no-intersect]) { left: 100px }',
        ])
    })
})

const path = require('path')
const postcss = require('postcss')
const tailwindcss = require('@tailwindcss/postcss')

async function run(file, options = {}) {
    const { currentTestName } = expect.getState()

    const config = [
        '@import "tailwindcss" source(none);',
        options?.directive === 'plugin'
            ? '@plugin "./../";'
            : '@import "./../";',
        `@source "./${file}";`,
    ].join('\n')

    const result = await postcss(tailwindcss()).process(config, {
        from: `${path.resolve(__filename)}?test=${currentTestName}`,
    })

    return result.css
}

describe('import directive', () => {
    it('should add variants', async () => {
        expect(await run('content/variants.html', { directive: 'import' })).toIncludeAll([
            '.intersect\\:opacity-50 { &:not([no-intersect]) { opacity: 50%; } }',
            '.intersect\\:hover\\:opacity-100 { &:not([no-intersect]) { &:hover { @media (hover: hover) { opacity: 100%; } } } }',
        ])
    })

    it('should add arbitrary values', async () => {
        expect(await run('content/arbitrary-values.html', { directive: 'import' })).toIncludeAll([
            '.intersect\\:left-\\[100px\\] { &:not([no-intersect]) { left: 100px; } }',
            '.intersect\\:left-\\(--my-value\\) { &:not([no-intersect]) { left: var(--my-value); } }',
        ])
    })
})

describe('plugin directive', () => {
    it('should add variants', async () => {
        expect(await run('content/variants.html', { directive: 'plugin' })).toIncludeAll([
            '.intersect\\:opacity-50 { &:not([no-intersect]) { opacity: 50%; } }',
            '.intersect\\:hover\\:opacity-100 { &:not([no-intersect]) { &:hover { @media (hover: hover) { opacity: 100%; } } } }',
        ])
    })

    it('should add arbitrary values', async () => {
        expect(await run('content/arbitrary-values.html', { directive: 'plugin' })).toIncludeAll([
            '.intersect\\:left-\\[100px\\] { &:not([no-intersect]) { left: 100px; } }',
            '.intersect\\:left-\\(--my-value\\) { &:not([no-intersect]) { left: var(--my-value); } }',
        ])
    })
})

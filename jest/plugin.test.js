import path from 'path'
import { fileURLToPath } from 'url'
import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'

async function run(file) {
    const { currentTestName } = expect.getState()

    const config = `
        @import "tailwindcss/utilities" source(none);
        @import "./../src/";
        @source "./${file}";
    `

    const result = await postcss(tailwindcss()).process(config, {
        from: `${path.resolve(fileURLToPath(import.meta.url))}?test=${currentTestName}`,
    })

    return result.css
}

it('should add variants', async () => {
    expect(await run('content/variants.html')).toIncludeAll([
        '.intersect\\:opacity-50 { &:not([no-intersect]) { opacity: 50%; } }',
        '.intersect\\:hover\\:opacity-100 { &:not([no-intersect]) { &:hover { @media (hover: hover) { opacity: 100%; } } } }',
    ])
})

it('should add arbitrary values', async () => {
    expect(await run('content/arbitrary-values.html')).toIncludeAll([
        '.intersect\\:left-\\[100px\\] { &:not([no-intersect]) { left: 100px; } }',
        '.intersect\\:left-\\(--my-value\\) { &:not([no-intersect]) { left: var(--my-value); } }',
    ])
})

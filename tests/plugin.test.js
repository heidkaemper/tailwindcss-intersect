import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'
import { expect, test } from 'vitest'

const normalize = value => value.replace(/[\s;]/g, '')

const compile = async directive => {
    const input = [
        '@import "tailwindcss" source(none);',
        `@${directive} "tailwindcss-intersect";`,
        '@source "./content.html";',
    ].join('\n')

    const { css } = await postcss(tailwindcss()).process(input, {
        from: `${import.meta.filename}?${directive}`,
    })

    return normalize(css)
}

const expected = [
    '.intersect\\:opacity-50:not([no-intersect]) { opacity: 50%; }',
    '@media (hover: hover) { .intersect\\:hover\\:opacity-100:not([no-intersect]):hover { opacity: 100%; } }',
    '.intersect\\:left-\\[100px\\]:not([no-intersect]) { left: 100px; }',
    '.intersect\\:left-\\(--my-value\\):not([no-intersect]) { left: var(--my-value); }',
]

test.each(['import', 'plugin'])('the %s directive registers the variant', async directive => {
    const css = await compile(directive)

    for (const rule of expected) {
        expect(css).toContain(normalize(rule))
    }
})

const path = require('path')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

function run(config, plugin = tailwindcss) {
    const { currentTestName } = expect.getState()

    config = {
        plugins: [require('../src/plugin/index.cjs')],
        corePlugins: { preflight: false },
        ...config,
    }

    return postcss(plugin(config)).process('@tailwind utilities', {
        from: `${path.resolve(__filename)}?test=${currentTestName}`,
    })
}

it('should add variants', () => {
    return run({
        content: [{ raw: String.raw`<div class="intersect:opacity-50 intersect:hover:opacity-100"></div>` }],
    }).then(result => {
        expect(result.css).toMatchCss(String.raw`
            .intersect\:opacity-50:not([no-intersect]) {
                opacity: 0.5;
            }
            .intersect\:hover\:opacity-100:hover:not([no-intersect]) {
                opacity: 1;
            }
        `)
    })
})

it('should add arbitrary values', () => {
    return run({
        content: [{ raw: String.raw`<div class="intersect:left-[100px]"></div>` }],
    }).then(result => {
        expect(result.css).toMatchCss(String.raw`
            .intersect\:left-\[100px\]:not([no-intersect]) {
                left: 100px;
            }
        `)
    })
})

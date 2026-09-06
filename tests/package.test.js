import { createRequire } from 'node:module'
import { expect, test } from 'vitest'

const require = createRequire(import.meta.url)

test('the plugin is exposed to both module systems', async () => {
    const { default: esm } = await import('tailwindcss-intersect')

    expect(require('tailwindcss-intersect').handler).toBeTypeOf('function')
    expect(esm.handler).toBeTypeOf('function')
})

test('the observer is exposed to both module systems', async () => {
    const esm = await import('tailwindcss-intersect/observer')

    expect(require('tailwindcss-intersect/observer').Observer.start).toBeTypeOf('function')
    expect(esm.Observer.start).toBeTypeOf('function')
    expect(esm.default.start).toBeTypeOf('function')
})

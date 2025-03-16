import plugin from 'tailwindcss/plugin'
import Observer from './observer/index'

export default plugin(
    ({ addVariant }) => {
        addVariant('intersect', '&:not([no-intersect])')
    },
)

export { Observer }

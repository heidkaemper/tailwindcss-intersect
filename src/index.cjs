const plugin = require('tailwindcss/plugin')

module.exports = plugin(
    ({ addVariant }) => {
        addVariant('intersect', '&:not([no-intersect])')
    },
)

module.exports.Observer = require('./observer')

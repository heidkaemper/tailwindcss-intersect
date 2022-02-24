const plugin = require('tailwindcss/plugin');

module.exports = plugin(
    ({ addVariant }) => {
        addVariant('intersect', '&.is-intersecting');
    },
);

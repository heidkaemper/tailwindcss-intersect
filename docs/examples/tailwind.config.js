module.exports = {
    content: [
        './docs/examples/**/*.html',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('../../src/plugin.js')
    ],
}

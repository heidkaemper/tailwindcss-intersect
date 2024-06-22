module.exports = {
    content: [
        './docs/example/**/*.html',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('../../src/plugin/index.js')
    ],
}

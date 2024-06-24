module.exports = {
    content: [
        './docs/example/**/*.html',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('../../src/index.js')
    ],
}

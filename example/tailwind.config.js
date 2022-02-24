module.exports = {
    content: [
        './example/**/*.html',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('../src/plugin.js')
    ],
}

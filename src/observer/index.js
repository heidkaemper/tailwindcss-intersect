const Observer = {
    start() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.observe())

            return
        }

        this.observe()
    },

    restart() {
        this._observers.forEach(observer => observer.disconnect())
        this._observers = []

        this.observe()
    },

    observe() {
        const selectors = [
            '[class*=" intersect:"]',
            '[class*=":intersect:"]',
            '[class^="intersect:"]',
            '[class="intersect"]',
            '[class*=" intersect "]',
            '[class^="intersect "]',
            '[class$=" intersect"]'
        ]

        document.querySelectorAll(selectors.join(',')).forEach(element => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (! entry.isIntersecting) {
                        element.setAttribute('no-intersect', '')

                        return
                    }

                    element.removeAttribute('no-intersect')

                    element.classList.contains('intersect-once') && observer.disconnect()
                })
            }, {
                threshold: this._getThreshold(element),
                rootMargin: this._getRootMargin(element),
            })

            observer.observe(element)

            this._observers.push(observer)
        })
    },

    _getThreshold(element) {
        if (element.classList.contains('intersect-full')) {
            return 0.99
        }

        if (element.classList.contains('intersect-half')) {
            return 0.5
        }

        for (const className of element.classList) {
            const match = className.match(/^intersect-\[(\d*\.?\d+)\]$/)

            if (match) {
                return Math.min(Math.max(parseFloat(match[1]), 0), 1)
            }
        }

        return 0
    },

    _getRootMargin(element) {
        for (const className of element.classList) {
            const match = className.match(/^intersect-margin-\[(.+)\]$/)

            if (match) {
                const values = match[1].split('_')

                if (values.length <= 4 && values.every(value => /^-?\d+(px|%)$/.test(value))) {
                    return values.join(' ')
                }
            }
        }

        return '0px'
    },

    _observers: [],
}

export default Observer

export { Observer }

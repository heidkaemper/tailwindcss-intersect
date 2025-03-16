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

        return 0
    },

    _observers: [],
}

export default Observer

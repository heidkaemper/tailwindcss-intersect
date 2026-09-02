const OBSERVE_SELECTORS = [
    '[class*=" intersect:"]',
    '[class*=":intersect:"]',
    '[class^="intersect:"]',
    '[class="intersect"]',
    '[class*=" intersect "]',
    '[class^="intersect "]',
    '[class$=" intersect"]',
]

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
        const elements = document.querySelector(OBSERVE_SELECTORS.join(','))
        /**
         * @type {Map<number, Set<HTMLElement>>}
         */
        const byThreshold = new Map()

        elements.forEach((element) => {
            const threshold = this._getThreshold(element)
            if (!byThreshold.has(threshold))
                byThreshold.set(threshold, new Set())
            byThreshold.get(threshold).add(element)
        })

        byThreshold.forEach((elementSet, threshold) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const element = entry.target
                        if (!entry.isIntersecting) {
                            element.setAttribute('no-intersect', '')
                            return
                        }

                        element.removeAttribute('no-intersect')
                        if (element.classList.contains('intersect-once'))
                            observer.unobserve(element)
                    })
                },
                {
                    threshold,
                },
            )

            elementSet.forEach((element) => observer.observe(element))
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

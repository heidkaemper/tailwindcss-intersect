const Observer = {
    start() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.observe())

            return
        }

        this.observe()
    },

    restart() {
        this.observe(true)
        this.observe()
    },

    observe(unobserve = false) {
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

                    if(unobserve) {
                        observer.disconnect()
                        return
                    }

                    if (! entry.isIntersecting) {
                        element.setAttribute('no-intersect', '')

                        return
                    }

                    element.removeAttribute('no-intersect')

                    element.classList.contains('intersect-once') && observer.disconnect()
                })
            }, {
                threshold: this.getThreshold(element),
            })

            observer.observe(element)
        })
    },

    getThreshold(element) {
        if (element.classList.contains('intersect-full')) {
            return 0.99
        }

        if (element.classList.contains('intersect-half')) {
            return 0.5
        }

        return 0
    },
}

export default Observer

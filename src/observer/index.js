const NAMED_THRESHOLDS = {
  "intersect-full": 0.99,
  "intersect-half": 0.5,
};

const ARBITRARY_REGEX = /(?:^|\s)intersect-\[([\d.]+)\]/;

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

    /**
     * 
     * @param {Element} element 
     * @returns {number}
     */
    _getThreshold(element) {
        for (const className in NAMED_THRESHOLDS) {
            if (element.classList.contains(className))
                return NAMED_THRESHOLDS[className];
        }
        const match = element.className.match(ARBITRARY_REGEX);
        if (match) {
            const threshold = parseFloat(match[1]);
            if (!Number.isNaN(threshold))
                return Math.min(Math.max(0, threshold), 1);
        }
        return 0;
    },

    _observers: [],
}

export default Observer

const Observer = {
    start() {
        document.addEventListener('DOMContentLoaded', () => {
            const elements = document.querySelectorAll('[class*=" intersect:"],[class*=":intersect:"],[class^="intersect:"]');

            elements.forEach(element => {
                let observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio === 0) {
                            element.classList.remove('is-intersecting');

                            return;
                        }

                        element.classList.add('is-intersecting');

                        element.classList.contains('intersect-once') && observer.disconnect();
                    });
                });

                observer.observe(element);
            });
        });
    }
};

export default Observer;

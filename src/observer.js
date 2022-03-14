const Observer = {
    start() {
        document.addEventListener('DOMContentLoaded', () => {
            const elements = document.querySelectorAll('[class*=" intersect:"],[class*=":intersect:"],[class^="intersect:"]');

            elements.forEach(element => {
                let observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio === 0) {
                            element.setAttribute('no-intersect', '');

                            return;
                        }

                        element.removeAttribute('no-intersect');

                        element.classList.contains('intersect-once') && observer.disconnect();
                    });
                });

                observer.observe(element);
            });
        });
    }
};

export default Observer;

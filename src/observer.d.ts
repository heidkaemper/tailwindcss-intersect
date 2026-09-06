declare const Observer: {
    start(): void,
    restart(): void,
    observe(): void,
    _getThreshold(element: HTMLElement): number,
    _observers: IntersectionObserver[],
}

export default Observer
export { Observer }

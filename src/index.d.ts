declare const intersect: {
    handler: () => void,
}

declare const Observer: {
    start(): void,
    observe(): void,
    getThreshold(element: HTMLElement): number,
}

export default intersect
export { Observer }

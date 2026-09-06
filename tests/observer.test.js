// @vitest-environment happy-dom
import { beforeEach, expect, test, vi } from 'vitest'
import { Observer } from '../src/observer/index.js'

const observers = []

class IntersectionObserverStub {
    constructor(callback, options) {
        this.callback = callback
        this.options = options
        this.targets = []

        observers.push(this)
    }

    observe(element) {
        this.targets.push(element)
    }

    unobserve(element) {
        this.targets = this.targets.filter(target => target !== element)
    }

    disconnect() {
        this.targets = []
    }

    trigger(element, isIntersecting) {
        this.callback([{ target: element, isIntersecting }])
    }
}

const render = html => {
    document.body.innerHTML = html

    Observer.observe()

    return document.body.firstElementChild
}

beforeEach(() => {
    observers.length = 0
    Observer._observers = []
    globalThis.IntersectionObserver = IntersectionObserverStub
})

test('observes every element the variant can match', () => {
    render(`
        <div id="a" class="intersect:opacity-100"></div>
        <div id="b" class="mt-2 intersect:opacity-100"></div>
        <div id="c" class="md:intersect:opacity-100"></div>
        <div id="d" class="intersect"></div>
        <div id="e" class="mt-2 intersect"></div>
        <div id="f" class="intersect mt-2"></div>
        <div id="g" class="mt-2"></div>
    `)

    const observed = observers.flatMap(observer => observer.targets).map(element => element.id)

    expect(observed.sort()).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
})

test('resolves the threshold from the modifier classes', () => {
    render(`
        <div class="intersect:opacity-100"></div>
        <div class="intersect:opacity-100 intersect-half"></div>
        <div class="intersect:opacity-100 intersect-full"></div>
        <div class="intersect:opacity-100 intersect-[0.3]"></div>
        <div class="intersect:opacity-100 intersect-[.75]"></div>
        <div class="intersect:opacity-100 intersect-[5]"></div>
        <div class="intersect:opacity-100 intersect-[nope]"></div>
    `)

    expect(observers.map(observer => observer.options.threshold)).toEqual([0, 0.5, 0.99, 0.3, 0.75, 1, 0])
})

test('resolves the root margin from the modifier classes', () => {
    render(`
        <div class="intersect:opacity-100"></div>
        <div class="intersect:opacity-100 intersect-margin-[200px]"></div>
        <div class="intersect:opacity-100 intersect-margin-[10%_0px_-100px_0px]"></div>
        <div class="intersect:opacity-100 intersect-margin-[200]"></div>
        <div class="intersect:opacity-100 intersect-margin-[1px_2px_3px_4px_5px]"></div>
    `)

    expect(observers.map(observer => observer.options.rootMargin))
        .toEqual(['0px', '200px', '10% 0px -100px 0px', '0px', '0px'])
})

test('toggles the no-intersect attribute while scrolling in and out', () => {
    const element = render('<div class="intersect:opacity-100"></div>')

    observers[0].trigger(element, false)
    expect(element.hasAttribute('no-intersect')).toBe(true)

    observers[0].trigger(element, true)
    expect(element.hasAttribute('no-intersect')).toBe(false)
})

test('stops observing an intersect-once element after it appeared', () => {
    const element = render('<div class="intersect:opacity-100 intersect-once"></div>')
    const stop = vi.spyOn(observers[0], 'disconnect')

    observers[0].trigger(element, true)

    expect(stop).toHaveBeenCalled()
})

test('restart disconnects the previous observers', () => {
    render('<div class="intersect:opacity-100"></div>')
    const stop = vi.spyOn(observers[0], 'disconnect')

    Observer.restart()

    expect(stop).toHaveBeenCalled()
    expect(Observer._observers).toHaveLength(1)
})

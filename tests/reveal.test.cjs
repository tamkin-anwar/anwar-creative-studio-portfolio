const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const source = ts.transpileModule(fs.readFileSync('src/hooks/useReveal.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
function setup(reduced = false, available = true) {
  class Element {
    constructor() { this.attributes = new Map() }
    setAttribute(k,v) { this.attributes.set(k,v) }
    removeAttribute(k) { this.attributes.delete(k) }
    hasAttribute(k) { return this.attributes.has(k) }
    closest() { return this }
  }
  const targets = [new Element(), new Element()]
  let motionChange, focus, callback, cleanup
  const observed = new Set()
  const root = { hasAttribute: () => false, querySelectorAll: () => targets, contains: e => targets.includes(e), addEventListener: (_, fn) => focus = fn, removeEventListener: () => {} }
  const motion = { matches: reduced, addEventListener: (_, fn) => motionChange = fn, removeEventListener: () => {} }
  class Observer {
    constructor(fn, options) { callback = fn; assert.equal(options.threshold, 0) }
    observe(e) { observed.add(e) }
    unobserve(e) { observed.delete(e) }
    disconnect() { observed.clear() }
  }
  const context = { exports: {}, Element, IntersectionObserver: Observer, window: { matchMedia: () => motion, ...(available ? { IntersectionObserver: Observer } : {}) }, require: () => ({ useRef: () => ({ current: root }), useEffect: fn => cleanup = fn() }) }
  vm.runInNewContext(source, context)
  context.exports.useReveal()
  return { targets, observed, enter: e => callback([{ target:e, isIntersecting:true }]), reduce: () => { motion.matches=true; motionChange() }, focus: e => focus({target:e}), cleanup }
}
test('items reveal independently at first intersection', () => {
 const s=setup(); assert.equal(s.observed.size,2); s.enter(s.targets[0]);
 assert.equal(s.targets[0].attributes.get('data-revealed'),'true'); assert.equal(s.targets[1].hasAttribute('data-reveal-pending'),true)
 s.enter(s.targets[1]); assert.equal(s.observed.size,0)
})
test('reduced motion reveals everything without observers', () => {
 const s=setup(true); assert.equal(s.observed.size,0); for(const e of s.targets) assert.equal(e.attributes.get('data-revealed'),'true')
})
test('changing motion preference reveals pending items', () => { const s=setup(); s.reduce(); assert.equal(s.observed.size,0); for(const e of s.targets) assert.equal(e.hasAttribute('data-reveal-pending'),false) })
test('keyboard focus reveals its target', () => { const s=setup();s.focus(s.targets[1]);assert.equal(s.targets[1].attributes.get('data-revealed'),'true') })
test('unsupported observers leave content visible', () => { const s=setup(false,false);for(const e of s.targets) assert.equal(e.hasAttribute('data-reveal-pending'),false) })
test('cleanup removes pending visibility state', () => { const s=setup();s.cleanup();assert.equal(s.observed.size,0);for(const e of s.targets) assert.equal(e.hasAttribute('data-reveal-pending'),false) })

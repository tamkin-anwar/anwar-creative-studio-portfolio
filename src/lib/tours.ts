// The homepage's product tours. Each one is plain DOM work on markup React
// already rendered: it starts when its device comes into view, pauses when it
// leaves, plays each chapter once and stops. Tabs jump to any chapter and the
// Pause button holds it. With Reduce Motion, each chapter shows its end state.

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

type Cleanup = () => void

function timers() {
  let ids: number[] = []
  return {
    later(fn: () => void, ms: number) { ids.push(window.setTimeout(fn, ms)) },
    stop() { ids.forEach(clearTimeout); ids = [] },
  }
}

function typeInto(t: ReturnType<typeof timers>, el: HTMLElement, text: string, speed: number, done?: () => void) {
  let i = 0
  el.textContent = ''
  const step = () => {
    el.textContent = text.slice(0, ++i)
    if (i < text.length) t.later(step, speed)
    else done?.()
  }
  step()
}

/** Shared chapter engine: tabs with progress bars, Pause, play-in-view. */
function chapters(opts: {
  targets: HTMLElement[]
  tabs: HTMLElement[]
  bar: HTMLElement
  pause: HTMLButtonElement
  order: string[]
  duration: Record<string, number>
  show: (chapter: string, still: boolean) => void
  stopShow: () => void
}): Cleanup {
  const { targets, tabs, bar, pause, order, duration, show, stopShow } = opts
  let advance = 0, cur = 0, paused = false, started = false, finished = false, offscreen = false

  const bars = (ch: string) => tabs.forEach((t) => {
    const on = t.dataset.ch === ch
    t.classList.toggle('on', on)
    t.setAttribute('aria-pressed', String(on))
    t.style.setProperty('--dur', duration[t.dataset.ch ?? ''] + 'ms')
    const i = t.querySelector<HTMLElement>('.bar i')
    if (i) { i.style.animation = 'none'; void i.offsetWidth; i.style.animation = '' }
  })
  const run = (ch: string) => {
    stopShow(); clearTimeout(advance)
    cur = order.indexOf(ch)
    bars(ch)
    const still = reduce()
    show(ch, still)
    if (!still && !paused) {
      advance = window.setTimeout(() => {
        if (cur < order.length - 1) run(order[cur + 1])
        else { finished = true; bar.classList.add('done'); pause.textContent = 'Replay' }
      }, duration[ch])
    }
  }
  const setPaused = (p: boolean) => {
    paused = p
    bar.classList.toggle('paused', p)
    pause.textContent = p ? 'Play' : 'Pause'
    pause.setAttribute('aria-pressed', String(p))
    if (p) clearTimeout(advance)
    else { finished = false; bar.classList.remove('done'); run(order[cur]) }
  }
  const onTab = (e: Event) => {
    const ch = (e.currentTarget as HTMLElement).dataset.ch
    if (!ch) return
    finished = false; bar.classList.remove('done'); pause.textContent = paused ? 'Play' : 'Pause'; run(ch)
  }
  const onPause = () => {
    if (finished) { finished = false; bar.classList.remove('done'); paused = false; pause.textContent = 'Pause'; run(order[0]) }
    else setPaused(!paused)
  }
  tabs.forEach((t) => t.addEventListener('click', onTab))
  pause.addEventListener('click', onPause)
  if (reduce()) { setPaused(true); run(order[0]) }

  // the tour plays while any of its targets is in view (on phones: the MacBook or its close-up)
  const inView = new Set<Element>()
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) inView.add(e.target)
      else inView.delete(e.target)
    }
    if (inView.size) {
      if (!started) { started = true; run(order[0]) }
      else if (offscreen && !paused && !finished) { offscreen = false; run(order[cur]) }
    } else if (started && !finished && !offscreen) {
      offscreen = true; stopShow(); clearTimeout(advance)
    }
  }, { threshold: 0.3 })
  targets.forEach((t) => io.observe(t))

  return () => {
    io.disconnect(); stopShow(); clearTimeout(advance)
    tabs.forEach((t) => t.removeEventListener('click', onTab))
    pause.removeEventListener('click', onPause)
  }
}

/** Scales the 1352 x 878 pt macOS display to whatever size the bezel is drawn at. */
function fitMac(screen: HTMLElement): Cleanup {
  const fit = () => { const w = screen.clientWidth; if (w) document.documentElement.style.setProperty('--mac-s', (w / 1352).toFixed(4)) }
  fit()
  const ro = new ResizeObserver(fit)
  ro.observe(screen)
  return () => ro.disconnect()
}

/** On phones the whole Mac display is too small to read, so a close-up under
 * the MacBook mirrors its window, change for change, at a readable size. */
function closeUp(win: HTMLElement, host: HTMLElement): Cleanup {
  const phone = window.matchMedia('(max-width: 760px)')
  const map = new Map<Node, Node>()
  let mo: MutationObserver | undefined
  const pair = (a: Node, b: Node) => { map.set(a, b); a.childNodes.forEach((n, i) => pair(n, b.childNodes[i])) }
  const build = () => {
    mo?.disconnect(); map.clear(); host.replaceChildren()
    if (!phone.matches) return
    const copy = win.cloneNode(true) as HTMLElement
    copy.removeAttribute('id'); copy.removeAttribute('role'); copy.removeAttribute('aria-label')
    pair(win, copy)
    host.appendChild(copy)
    // the close-up is one column, so the reply draft sits below the email: follow it as it's written
    const maya = copy.querySelector<HTMLElement>('.v-maya')!
    const follow = () => {
      if (copy.classList.contains('drafting')) maya.scrollTo({ top: maya.scrollHeight, behavior: reduce() ? 'auto' : 'smooth' })
      else maya.scrollTop = 0
    }
    mo = new MutationObserver((records) => { records.forEach((r) => {
      const c = map.get(r.target)
      if (!c) return
      if (r.type === 'attributes') {
        const name = r.attributeName!, v = (r.target as Element).getAttribute(name)
        if (r.target === win && ['id', 'role', 'aria-label'].includes(name)) return
        if (v === null) (c as Element).removeAttribute(name)
        else (c as Element).setAttribute(name, v)
      } else if (r.type === 'characterData') c.textContent = r.target.textContent
      else (c as Element).replaceChildren(...[...r.target.childNodes].map((n) => { const k = n.cloneNode(true); pair(n, k); return k }))
    }); follow() })
    mo.observe(win, { attributes: true, characterData: true, childList: true, subtree: true })
  }
  build()
  phone.addEventListener('change', build)
  return () => { mo?.disconnect(); phone.removeEventListener('change', build); host.replaceChildren() }
}

export function startMacTour(root: HTMLElement): Cleanup {
  const win = root.querySelector<HTMLElement>('.win')!
  const screen = root.querySelector<HTMLElement>('.mbp > .screen')!
  const needN = root.querySelector<HTMLElement>('[data-need-count]')!
  const askq = root.querySelector<HTMLElement>('[data-ask]')!
  const draftq = root.querySelector<HTMLElement>('[data-draft]')!
  const maya = root.querySelector<HTMLElement>('[data-maya]')!
  const sofia = root.querySelector<HTMLElement>('[data-sofia]')!
  const Q = 'When is my flight to Lisbon?'
  const DRAFT = 'Hi Maya,\n\nApproved. This is the one, and thank you for taking the time with it. See you at tomorrow’s review.\n\nBest,\nTamkin'
  const t = timers()
  const sel = (which: string) => win.querySelectorAll<HTMLElement>('.sitem').forEach((s) => s.classList.toggle('on', s.dataset.s === which))
  const count = (to: number) => { let n = 0; const step = () => { needN.textContent = String(n); if (n++ < to) t.later(step, 90) }; step() }

  const show = (ch: string, still: boolean) => {
    win.dataset.ch = ch
    win.classList.remove('reading', 'asking', 'answered', 'picked', 'drafting', 'opened')
    askq.textContent = ''; draftq.textContent = ''; maya.classList.remove('sel')
    sofia.classList.toggle('sel', ch === 'sort')
    if (ch === 'sort') { win.classList.remove('sorted'); sel('all'); needN.textContent = '0' }
    else { win.classList.add('sorted'); needN.textContent = '3'; sel(ch === 'private' ? 'updates' : 'needs') }

    if (ch === 'sort') {
      if (still) { win.classList.add('sorted'); sel('needs'); needN.textContent = '3' }
      else {
        t.later(() => win.classList.add('reading'), 300)
        t.later(() => { win.classList.remove('reading'); win.classList.add('sorted'); sel('needs'); count(3) }, 1300)
      }
    } else if (ch === 'ask') {
      win.classList.add('asking')
      if (still) { askq.textContent = Q; win.classList.add('answered') }
      else t.later(() => typeInto(t, askq, Q, 55, () => t.later(() => win.classList.add('answered'), 450)), 450)
    } else if (ch === 'reply') {
      maya.classList.add('sel'); win.classList.add('picked')
      if (still) { win.classList.add('drafting'); draftq.textContent = DRAFT }
      else t.later(() => { win.classList.add('drafting'); typeInto(t, draftq, DRAFT, 20) }, 2100)
    } else {
      win.classList.add('opened')
    }
  }

  const stopFit = fitMac(screen)
  const close = root.querySelector<HTMLElement>('.mac-close')!
  const stopClose = closeUp(win, close)
  const stop = chapters({
    targets: [win, close],
    tabs: [...root.querySelectorAll<HTMLElement>('.ch-tab')],
    bar: root.querySelector<HTMLElement>('.chapters')!,
    pause: root.querySelector<HTMLButtonElement>('.ch-pause')!,
    order: ['sort', 'ask', 'reply', 'private'],
    duration: { sort: 4200, ask: 6400, reply: 8400, private: 5600 },
    show,
    stopShow: t.stop,
  })
  return () => { stop(); stopFit(); stopClose() }
}

export function startCorresPhone(root: HTMLElement): Cleanup {
  const phone = root.querySelector<HTMLElement>('.cphone')!
  const replay = root.querySelector<HTMLButtonElement>('[data-replay]')
  const t = timers()
  const arrive = () => {
    t.stop()
    phone.classList.remove('notifying', 'arrived')
    if (reduce()) { phone.classList.add('arrived'); return }
    t.later(() => phone.classList.add('notifying'), 500)
    t.later(() => { phone.classList.remove('notifying'); phone.classList.add('arrived') }, 2600)
  }
  let done = false
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && !done) { done = true; arrive() } }), { threshold: 0.5 })
  io.observe(phone)
  replay?.addEventListener('click', arrive)
  return () => { io.disconnect(); t.stop(); replay?.removeEventListener('click', arrive) }
}

export function startArthaTour(root: HTMLElement): Cleanup {
  const phone = root.querySelector<HTMLElement>('#artha-phone')!
  const digits = [...phone.querySelectorAll<HTMLElement>('.digit')]
  const sent = phone.querySelector<HTMLElement>('[data-sentence]')!
  const me = phone.querySelector<HTMLElement>('[data-me]')!
  const ME = 'Lunch with Sam was $32, I paid'
  const t = timers()
  digits.forEach((d) => {
    const s = d.firstElementChild as HTMLElement
    if (s.childElementCount) return
    for (let i = 0; i < 10; i++) { const it = document.createElement('i'); it.textContent = String(i); s.appendChild(it) }
  })
  const showNumber = (n: number) => {
    const str = String(n).padStart(digits.length, '0')
    digits.forEach((d, i) => { (d.firstElementChild as HTMLElement).style.transform = `translateY(${-Number(str[i])}em)` })
  }
  showNumber(0)

  const show = (ch: string, still: boolean) => {
    phone.dataset.ch = ch
    phone.classList.remove('drawn', 'logged', 'typed', 'proposed', 'added', 'filled', 'listed', 'saved')
    sent.textContent = '$64 a day for 7 days'
    me.textContent = ''
    if (ch === 'today') {
      showNumber(0)
      if (still) { phone.classList.add('drawn'); showNumber(448) }
      else { t.later(() => phone.classList.add('drawn'), 200); t.later(() => showNumber(448), 1050) }
    } else if (ch === 'assist') {
      showNumber(448)
      if (still) { me.textContent = ME; phone.classList.add('typed', 'proposed', 'added') }
      else t.later(() => {
        phone.classList.add('typed')
        typeInto(t, me, ME, 45, () => {
          t.later(() => phone.classList.add('proposed'), 500)
          t.later(() => phone.classList.add('added'), 2600)
        })
      }, 400)
    } else if (ch === 'plan') {
      if (still) phone.classList.add('filled'); else t.later(() => phone.classList.add('filled'), 300)
    } else {
      if (still) phone.classList.add('listed', 'saved')
      else { t.later(() => phone.classList.add('listed'), 250); t.later(() => phone.classList.add('saved'), 3600) }
    }
  }

  return chapters({
    targets: [phone],
    tabs: [...root.querySelectorAll<HTMLElement>('.tour-item')],
    bar: root.querySelector<HTMLElement>('.tour')!,
    pause: root.querySelector<HTMLButtonElement>('[data-artha-pause]')!,
    order: ['today', 'assist', 'plan', 'import'],
    duration: { today: 4600, assist: 7600, plan: 4800, import: 6000 },
    show,
    stopShow: t.stop,
  })
}

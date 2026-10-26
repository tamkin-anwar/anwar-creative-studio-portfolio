  // Corres for Mac: a four-chapter tour. It starts when it comes into view, pauses when it leaves,
  // plays each chapter once and stops; the tabs jump to any chapter and the button pauses it.
  var win = document.getElementById('corres'), needN = document.getElementById('needN');
  var tabs = [].slice.call(document.querySelectorAll('.ch-tab')), pauseBtn = document.getElementById('ch-pause'), chapters = document.getElementById('chapters');
  var CH = ['sort', 'ask', 'reply', 'private'], DUR = { sort: 4200, ask: 6400, reply: 8400, private: 5600 };
  var Q = 'When is my flight to Lisbon?';
  var DRAFT = 'Hi Maya,\n\nApproved. This is the one, and thank you for taking the time with it. See you at tomorrow’s review.\n\nBest,\nTamkin';
  var askq = document.getElementById('askq'), draftq = document.getElementById('draftq'), maya = document.getElementById('maya');
  var timers = [], advanceT = null, cur = 0, paused = false, started = false, finished = false, offscreen = false;
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function stopAll() { timers.forEach(clearTimeout); timers = []; clearTimeout(advanceT); }
  function sel(which) { win.querySelectorAll('.sitem').forEach(function (s) { s.classList.toggle('on', s.dataset.s === which); }); }
  function type(el, text, speed, done) { var i = 0; el.textContent = ''; (function step() { el.textContent = text.slice(0, ++i); if (i < text.length) later(step, speed); else if (done) done(); })(); }
  function count(to) { var n = 0; (function step() { needN.textContent = String(n); if (n++ < to) later(step, 90); })(); }
  function base(ch) {
    win.dataset.ch = ch;
    win.classList.remove('reading', 'asking', 'answered', 'picked', 'drafting', 'opened');
    askq.textContent = ''; draftq.textContent = ''; maya.classList.remove('sel');
    if (ch === 'sort') { win.classList.remove('sorted'); sel('all'); needN.textContent = '0'; }
    else { win.classList.add('sorted'); needN.textContent = '3'; sel(ch === 'private' ? 'updates' : 'needs'); }
  }
  function bars(ch) {
    tabs.forEach(function (t) {
      t.classList.toggle('on', t.dataset.ch === ch); t.setAttribute('aria-pressed', String(t.dataset.ch === ch));
      t.style.setProperty('--dur', DUR[t.dataset.ch] + 'ms');
      var i = t.querySelector('.bar i'); i.style.animation = 'none'; void i.offsetWidth; i.style.animation = '';
    });
  }
  function run(ch) {
    stopAll(); base(ch); bars(ch); cur = CH.indexOf(ch);
    var still = reduce();
    if (ch === 'sort') {
      if (still) { win.classList.add('sorted'); sel('needs'); needN.textContent = '3'; }
      else { later(function () { win.classList.add('reading'); }, 300); later(function () { win.classList.remove('reading'); win.classList.add('sorted'); sel('needs'); count(3); }, 1300); }
    } else if (ch === 'ask') {
      win.classList.add('asking');
      if (still) { askq.textContent = Q; win.classList.add('answered'); }
      else later(function () { type(askq, Q, 55, function () { later(function () { win.classList.add('answered'); }, 450); }); }, 450);
    } else if (ch === 'reply') {
      maya.classList.add('sel'); win.classList.add('picked');
      if (still) { win.classList.add('drafting'); draftq.textContent = DRAFT; }
      else later(function () { win.classList.add('drafting'); type(draftq, DRAFT, 20); }, 2100);
    } else {
      win.classList.add('opened');
    }
    if (!still && !paused) advanceT = setTimeout(function () {
      if (cur < CH.length - 1) run(CH[cur + 1]); else { finished = true; chapters.classList.add('done'); }
    }, DUR[ch]);
  }
  function setPaused(p) {
    paused = p; chapters.classList.toggle('paused', p);
    pauseBtn.textContent = p ? 'Play' : 'Pause'; pauseBtn.setAttribute('aria-pressed', String(p));
    if (p) clearTimeout(advanceT); else { finished = false; chapters.classList.remove('done'); run(CH[cur]); }
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { finished = false; chapters.classList.remove('done'); run(t.dataset.ch); }); });
  pauseBtn.addEventListener('click', function () { if (finished) { finished = false; chapters.classList.remove('done'); paused = false; run('sort'); } else setPaused(!paused); });
  if (reduce()) { setPaused(true); run('sort'); }
  new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        if (!started) { started = true; run('sort'); }
        else if (offscreen && !paused && !finished) { offscreen = false; run(CH[cur]); }
      } else if (started && !finished) { offscreen = true; stopAll(); }
    });
  }, { threshold: .3 }).observe(win);

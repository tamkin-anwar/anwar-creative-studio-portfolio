  // Artha on iPhone: a four-chapter tour, the same engine rules as the Mac.
  var phone = document.getElementById('artha-phone'), digits = phone.querySelectorAll('.digit'), sent = document.getElementById('asent');
  var aItems = [].slice.call(document.querySelectorAll('#artha-tour .tour-item')), aTour = document.getElementById('artha-tour'), aPause = document.getElementById('artha-pause');
  var ACH = ['today', 'assist', 'plan', 'import'], ADUR = { today: 4600, assist: 7600, plan: 4800, import: 6000 };
  var aT = [], aAdv = null, aCur = 0, aPaused = false, aStarted = false, aDone = false, aOff = false;
  var ME = 'Lunch with Sam was $32, I paid';
  digits.forEach(function (d) { var s = d.firstElementChild; for (var i = 0; i < 10; i++) { var it = document.createElement('i'); it.textContent = i; s.appendChild(it); } });
  function show(n) { var str = String(n).padStart(2, '0'); digits.forEach(function (d, i) { d.firstElementChild.style.transform = 'translateY(' + (-Number(str[i])) + 'em)'; }); }
  function aLater(fn, ms) { aT.push(setTimeout(fn, ms)); }
  function aStop() { aT.forEach(clearTimeout); aT = []; clearTimeout(aAdv); }
  function aType(el, text, speed, done) { var i = 0; el.textContent = ''; (function step() { el.textContent = text.slice(0, ++i); if (i < text.length) aLater(step, speed); else if (done) done(); })(); }
  function aBars(ch) {
    aItems.forEach(function (t) {
      t.classList.toggle('on', t.dataset.ch === ch); t.setAttribute('aria-pressed', String(t.dataset.ch === ch));
      t.style.setProperty('--dur', ADUR[t.dataset.ch] + 'ms');
      var i = t.querySelector('.bar i'); i.style.animation = 'none'; void i.offsetWidth; i.style.animation = '';
    });
  }
  function aRun(ch) {
    aStop(); aBars(ch); aCur = ACH.indexOf(ch);
    phone.dataset.ch = ch;
    phone.classList.remove('drawn', 'logged', 'typed', 'proposed', 'added', 'filled', 'listed', 'saved');
    sent.textContent = 'You can spend $64 a day until the 31st and still finish October on plan.';
    document.getElementById('a-me').textContent = '';
    var still = reduce();
    if (ch === 'today') {
      show(0);
      if (still) { phone.classList.add('drawn'); show(64); }
      else { aLater(function () { phone.classList.add('drawn'); }, 200); aLater(function () { show(64); }, 1050); }
    } else if (ch === 'assist') {
      show(64);
      var me = document.getElementById('a-me');
      if (still) { me.textContent = ME; phone.classList.add('typed', 'proposed', 'added', 'logged'); show(32); }
      else {
        aLater(function () { phone.classList.add('typed'); aType(me, ME, 45, function () {
          aLater(function () { phone.classList.add('proposed'); }, 500);
          aLater(function () { phone.classList.add('added'); }, 2600);
        }); }, 400);
      }
    } else if (ch === 'plan') {
      if (still) phone.classList.add('filled'); else aLater(function () { phone.classList.add('filled'); }, 300);
    } else {
      if (still) phone.classList.add('listed', 'saved');
      else { aLater(function () { phone.classList.add('listed'); }, 250); aLater(function () { phone.classList.add('saved'); }, 3600); }
    }
    if (!still && !aPaused) aAdv = setTimeout(function () {
      if (aCur < ACH.length - 1) aRun(ACH[aCur + 1]); else { aDone = true; aTour.classList.add('done'); }
    }, ADUR[ch]);
  }
  function aSetPaused(p) {
    aPaused = p; aTour.classList.toggle('paused', p);
    aPause.textContent = p ? 'Play' : 'Pause'; aPause.setAttribute('aria-pressed', String(p));
    if (p) clearTimeout(aAdv); else { aDone = false; aTour.classList.remove('done'); aRun(ACH[aCur]); }
  }
  aItems.forEach(function (t) { t.addEventListener('click', function () { aDone = false; aTour.classList.remove('done'); aRun(t.dataset.ch); }); });
  aPause.addEventListener('click', function () { if (aDone) { aDone = false; aTour.classList.remove('done'); aPaused = false; aRun('today'); } else aSetPaused(!aPaused); });
  show(0);
  if (reduce()) { aSetPaused(true); aRun('today'); }
  new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        if (!aStarted) { aStarted = true; aRun('today'); }
        else if (aOff && !aPaused && !aDone) { aOff = false; aRun(ACH[aCur]); }
      } else if (aStarted && !aDone) { aOff = true; aStop(); }
    });
  }, { threshold: .35 }).observe(phone);

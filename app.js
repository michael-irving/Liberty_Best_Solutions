/* Liberty Best Solutions — shared interactions */
(function () {
  'use strict';

  /* ---- Header shadow on scroll ---- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Scroll reveal — IO + scroll fallback + visibility failsafe ---- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function reveal(el) { if (el && !el.classList.contains('in')) el.classList.add('in'); }
  function checkReveals() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < reveals.length; i++) {
      var el = reveals[i];
      if (!el || el.classList.contains('in')) continue;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) reveal(el);
    }
  }
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    }
    checkReveals();
    window.addEventListener('scroll', checkReveals, { passive: true });
    window.addEventListener('resize', checkReveals, { passive: true });
    window.addEventListener('load', checkReveals);
    setTimeout(checkReveals, 250);
    // failsafe: never leave content invisible (e.g. non-scrolling embed contexts)
    setTimeout(function () { reveals.forEach(reveal); }, 2600);
  }

  /* ---- Contact form validation ---- */
  var form = document.querySelector('#contact-form');
  if (form) {
    var success = form.parentNode.querySelector('.form__success');

    function setError(field, on) {
      field.classList.toggle('invalid', on);
    }
    function validEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var fields = form.querySelectorAll('.field[data-required]');
      fields.forEach(function (f) {
        var ctrl = f.querySelector('input,textarea');
        var val = (ctrl.value || '').trim();
        var bad = !val || (ctrl.type === 'email' && !validEmail(val));
        setError(f, bad);
        if (bad && ok) { ok = false; ctrl.focus(); }
      });
      if (!ok) return;

      var btn = form.querySelector('button[type="submit"]');
      var errNote = form.querySelector('.form__error');
      if (errNote) errNote.hidden = true;
      if (btn) btn.disabled = true;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data.success) throw new Error(data.message || 'Submission failed');
          form.style.display = 'none';
          if (success) success.classList.add('show');
        })
        .catch(function () {
          if (errNote) errNote.hidden = false;
          if (btn) btn.disabled = false;
        });
    });

    // clear error as the user types
    form.querySelectorAll('.field input, .field textarea').forEach(function (ctrl) {
      ctrl.addEventListener('input', function () {
        var f = ctrl.closest('.field');
        if (f && f.classList.contains('invalid')) {
          var val = (ctrl.value || '').trim();
          var bad = !val || (ctrl.type === 'email' && !validEmail(val));
          if (!bad) f.classList.remove('invalid');
        }
      });
    });
  }

  /* ---- Footer year ---- */
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();

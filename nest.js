/* Pull-to-refresh: three creatures wake from the nest in the dark.
   Touch devices only. Suppresses the native pull-to-refresh and drives its own.
   On-brand with the three agents (Cedar / Cipher / Vault). No dependencies. */
(function () {
  if (!('ontouchstart' in window) && !navigator.maxTouchPoints) return;

  var ptr = document.createElement('div');
  ptr.id = 'nest-ptr';
  ptr.setAttribute('aria-hidden', 'true');
  ptr.innerHTML =
    '<div class="nest-scene">' +
      '<div class="nest-creature c1"><i></i><i></i></div>' +
      '<div class="nest-creature c2"><i></i><i></i></div>' +
      '<div class="nest-creature c3"><i></i><i></i></div>' +
    '</div>' +
    '<div class="nest-twig"></div>' +
    '<div class="nest-hint">the nest is asleep</div>';
  document.body.appendChild(ptr);

  var hint = ptr.querySelector('.nest-hint');
  var creatures = [].slice.call(ptr.querySelectorAll('.nest-creature'));

  var H = 130;           // full reveal height (px)
  var THRESHOLD = 88;    // pull distance to trigger a refresh
  var startY = 0, dist = 0, pulling = false, refreshing = false;

  function render(d) {
    dist = d;
    var shown = Math.min(d, H);
    ptr.style.transform = 'translateY(' + (shown - H) + 'px)';
    var p = Math.min(d / THRESHOLD, 1);
    creatures.forEach(function (c, i) {
      c.style.transform = 'translateY(' + (52 - 52 * p) + 'px)';
      // wake them one at a time as the pull deepens
      if (p > 0.30 + i * 0.14) c.classList.add('awake');
      else c.classList.remove('awake');
    });
    if (d >= THRESHOLD) {
      ptr.classList.add('ready');
      hint.textContent = 'release to wake them';
    } else {
      ptr.classList.remove('ready');
      hint.textContent = 'the nest is asleep';
    }
  }

  function retract() {
    ptr.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
    ptr.style.transform = 'translateY(-' + H + 'px)';
    creatures.forEach(function (c) {
      c.classList.remove('awake');
      c.style.transform = 'translateY(52px)';
    });
    setTimeout(function () { ptr.style.transition = ''; }, 420);
  }

  window.addEventListener('touchstart', function (e) {
    if (window.scrollY <= 0 && !refreshing) {
      startY = e.touches[0].clientY;
      pulling = true;
      ptr.style.transition = '';
    } else {
      pulling = false;
    }
  }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    if (!pulling || refreshing) return;
    var d = e.touches[0].clientY - startY;
    if (d > 0 && window.scrollY <= 0) {
      e.preventDefault();          // take over from the native pull-to-refresh
      render(d * 0.55);            // rubber-band resistance
    } else if (d < 0) {
      pulling = false;
      retract();
    }
  }, { passive: false });

  window.addEventListener('touchend', function () {
    if (!pulling || refreshing) return;
    pulling = false;
    if (dist >= THRESHOLD) {
      refreshing = true;
      ptr.classList.add('refreshing');
      hint.textContent = 'waking the nest';
      creatures.forEach(function (c) {
        c.classList.add('awake');
        c.style.transform = '';    // hand off to the CSS bob animation
      });
      ptr.style.transition = 'transform 0.25s ease';
      ptr.style.transform = 'translateY(-' + (H - 74) + 'px)'; // keep them peeking
      setTimeout(function () { location.reload(); }, 780);
    } else {
      retract();
    }
  }, { passive: true });
})();

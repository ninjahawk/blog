/* Pull-to-refresh: a pixel raven perches, then takes off to refresh.
   Sprite: CC0 "Pixel Raven" by JsRobin (opengameart.org), no credits required.
   Touch devices only. Suppresses the native pull-to-refresh, no text. */
(function () {
  if (!('ontouchstart' in window) && !navigator.maxTouchPoints) return;

  var ptr = document.createElement('div');
  ptr.id = 'nest-ptr';
  ptr.setAttribute('aria-hidden', 'true');
  ptr.innerHTML = '<div class="nest-raven"></div>';
  document.body.appendChild(ptr);

  var raven = ptr.querySelector('.nest-raven');

  var H = 120;           // full reveal height (px)
  var THRESHOLD = 84;    // pull distance to trigger a refresh
  var startY = 0, dist = 0, pulling = false, refreshing = false;

  function render(d) {
    dist = d;
    var shown = Math.min(d, H);
    ptr.style.transform = 'translateY(' + (shown - H) + 'px)';
    if (d >= THRESHOLD) { raven.classList.add('flying'); ptr.classList.add('ready'); }
    else { raven.classList.remove('flying'); ptr.classList.remove('ready'); }
  }

  function retract() {
    ptr.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
    ptr.style.transform = 'translateY(-' + H + 'px)';
    raven.classList.remove('flying');
    setTimeout(function () { ptr.style.transition = ''; }, 420);
  }

  window.addEventListener('touchstart', function (e) {
    if (window.scrollY <= 0 && !refreshing) {
      startY = e.touches[0].clientY;
      pulling = true;
      raven.classList.remove('gone');
      raven.style.transform = '';
      ptr.style.transition = '';
    } else {
      pulling = false;
    }
  }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    if (!pulling || refreshing) return;
    var d = e.touches[0].clientY - startY;
    if (d > 0 && window.scrollY <= 0) {
      e.preventDefault();       // take over from the native pull-to-refresh
      render(d * 0.55);         // rubber-band resistance
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
      raven.classList.add('flying');
      // the raven flaps, then flies up and off before the reload
      raven.style.transition = 'transform 0.6s ease-in, opacity 0.6s ease-in';
      raven.style.transform = 'translateY(-130px)';
      raven.style.opacity = '0';
      setTimeout(function () { location.reload(); }, 640);
    } else {
      retract();
    }
  }, { passive: true });
})();

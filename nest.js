/* Pull-to-refresh: the page pulls down, a pixel raven flaps in the gap, release
   reloads. Sprite: CC0 "Pixel Raven" (opengameart.org), no credits required.
   Touch devices only. Takes over the native pull-to-refresh. */
(function () {
  if (!('ontouchstart' in window) && !navigator.maxTouchPoints) return;

  var ptr = document.createElement('div');
  ptr.id = 'nest-ptr';
  ptr.setAttribute('aria-hidden', 'true');
  ptr.innerHTML = '<div class="nest-raven"></div>';
  // Sits behind the page content; revealed as the content is pulled down.
  document.documentElement.insertBefore(ptr, document.body);
  var raven = ptr.querySelector('.nest-raven');
  var body = document.body;

  var MAX = 150, THRESHOLD = 82;
  var startY = 0, gap = 0, pulling = false, refreshing = false;

  function setGap(g) {
    gap = g;
    body.style.transform = 'translateY(' + g + 'px)';
    ptr.style.height = g + 'px';
    if (g >= THRESHOLD) raven.classList.add('flying');
    else raven.classList.remove('flying');
  }

  function ease(prop, val) {
    body.style.transition = 'transform 0.35s cubic-bezier(0.16,1,0.3,1)';
    ptr.style.transition = 'height 0.35s cubic-bezier(0.16,1,0.3,1)';
  }

  function reset() {
    ease();
    body.style.transform = 'translateY(0)';
    ptr.style.height = '0px';
    raven.classList.remove('flying');
    setTimeout(function () {
      body.style.transition = ''; ptr.style.transition = '';
      body.style.transform = ''; body.style.willChange = '';
    }, 380);
  }

  window.addEventListener('touchstart', function (e) {
    if (window.scrollY <= 0 && !refreshing) {
      startY = e.touches[0].clientY;
      pulling = true;
      body.style.transition = ''; ptr.style.transition = '';
      body.style.willChange = 'transform';
    } else {
      pulling = false;
    }
  }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    if (!pulling || refreshing) return;
    var d = e.touches[0].clientY - startY;
    if (d > 0 && window.scrollY <= 0) {
      e.preventDefault();               // take over from the native pull-to-refresh
      setGap(Math.min(d * 0.5, MAX));   // rubber-band resistance
    } else if (d < 0) {
      pulling = false;
      reset();
    }
  }, { passive: false });

  window.addEventListener('touchend', function () {
    if (!pulling || refreshing) return;
    pulling = false;
    if (gap >= THRESHOLD) {
      refreshing = true;
      raven.classList.add('flying');
      // settle to a steady spot, flap, then actually reload the page
      body.style.transition = 'transform 0.2s ease';
      ptr.style.transition = 'height 0.2s ease';
      body.style.transform = 'translateY(72px)';
      ptr.style.height = '72px';
      setTimeout(function () { location.reload(); }, 620);
    } else {
      reset();
    }
  }, { passive: true });
})();

/* Pull-to-refresh: a real slide-down. An in-flow element at the top of <body>
   grows as you pull, pushing the whole page down; a pixel raven flaps in the
   opened space; release reloads. Sprite: CC0 "Pixel Raven" (opengameart.org),
   no credits required. Touch devices only; takes over the native gesture. */
(function () {
  if (!('ontouchstart' in window) && !navigator.maxTouchPoints) return;

  var ptr = document.createElement('div');
  ptr.id = 'nest-ptr';
  ptr.setAttribute('aria-hidden', 'true');
  ptr.innerHTML = '<div class="nest-raven"></div>';
  // First child of <body>, in normal flow: its height literally moves the page.
  document.body.insertBefore(ptr, document.body.firstChild);
  var raven = ptr.querySelector('.nest-raven');

  var MAX = 150, THRESHOLD = 82;
  var startY = 0, gap = 0, pulling = false, refreshing = false;

  function setGap(g) {
    gap = g;
    ptr.style.height = g + 'px';
    if (g >= THRESHOLD) raven.classList.add('flying');
    else raven.classList.remove('flying');
  }

  function reset() {
    raven.classList.remove('flying');
    ptr.style.transition = 'height 0.35s cubic-bezier(0.16,1,0.3,1)';
    ptr.style.height = '0px';
    setTimeout(function () { ptr.style.transition = ''; }, 360);
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
      ptr.style.transition = 'height 0.2s ease';
      ptr.style.height = '72px';        // settle, keep the raven visible
      setTimeout(function () { location.reload(); }, 640);
    } else {
      reset();
    }
  }, { passive: true });
})();

/* Meadow: a grass field that sways in the wind and parts around the cursor.
   Used only on outside-work.html. Draws to <canvas id="meadow">, which sits behind the page. */
(function () {
  var canvas = document.getElementById('meadow');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Palettes: a hazy afternoon, and a firefly night for dark mode.
  var PALETTES = {
    day: {
      layers: [
        ['#a7c4b4', '#b3cbbd', '#bccfc4', '#a9bfb9'],   // far: pale, tinted towards the sky
        ['#7fae7a', '#8fbb7d', '#9cc285', '#86b48a'],   // middle
        ['#4f8a5b', '#5e9a5f', '#6aa666', '#4b8063']    // near: deepest green
      ],
      haze: 'rgba(252, 236, 214, 0.3)',
      ground: ['rgba(110, 166, 112, 0)', 'rgba(86, 148, 92, 0.9)'],
      tuft: 'rgba(255, 252, 245, 0.95)',
      mote: [255, 246, 222]
    },
    night: {
      layers: [
        ['#2f4d5c', '#34525f', '#3a5966', '#2c4757'],
        ['#24404c', '#2a4a50', '#2f5155', '#233c4a'],
        ['#173039', '#1c3a3c', '#21423f', '#152b36']
      ],
      haze: 'rgba(40, 52, 96, 0.40)',
      ground: ['rgba(23, 48, 57, 0)', 'rgba(20, 42, 50, 0.95)'],
      tuft: 'rgba(225, 232, 255, 0.85)',
      mote: [214, 255, 150]
    }
  };

  var W = 0, H = 0, dpr = 1, grassH = 0;
  var blades = [], motes = [], sprite = null, palette = null;
  var pointer = { x: -9999, y: -9999, vx: 0, active: false, last: 0 };
  var running = false, start = performance.now();

  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }

  function makeSprite(rgb) {
    // A soft glowing dot, drawn once and reused for every mote.
    var s = document.createElement('canvas'), r = 16;
    s.width = s.height = r * 2;
    var g = s.getContext('2d'), grad = g.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, 'rgba(' + rgb + ',1)');
    grad.addColorStop(0.25, 'rgba(' + rgb + ',0.6)');
    grad.addColorStop(1, 'rgba(' + rgb + ',0)');
    g.fillStyle = grad; g.fillRect(0, 0, r * 2, r * 2);
    return s;
  }

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    palette = darkQuery.matches ? PALETTES.night : PALETTES.day;
    sprite = makeSprite(palette.mote.join(','));
    grassH = Math.max(140, Math.min(H * 0.34, 320));

    // Three depth layers, drawn back to front. Fewer blades on small screens.
    blades = [];
    var spacing = W < 700 ? 4.2 : 3.2;
    var layerSpec = [
      { scale: 0.55, width: [2.0, 3.2], density: 0.8 },
      { scale: 0.78, width: [2.6, 4.2], density: 0.9 },
      { scale: 1.0,  width: [3.2, 5.6], density: 1.0 }
    ];
    layerSpec.forEach(function (spec, li) {
      var n = Math.floor((W / spacing) * spec.density);
      for (var i = 0; i < n; i++) {
        var tall = Math.random() < 0.025 && li > 0;
        blades.push({
          layer: li,
          x: rand(-10, W + 10),
          h: grassH * spec.scale * (tall ? rand(1.05, 1.25) : rand(0.45, 1.0)),
          w: rand(spec.width[0], spec.width[1]),
          color: pick(palette.layers[li]),
          phase: rand(0, Math.PI * 2),
          stiff: rand(0.75, 1.25),
          tuft: tall,
          a: 0, v: 0
        });
      }
    });

    motes = [];
    var mCount = W < 700 ? 18 : 36;
    for (var m = 0; m < mCount; m++) motes.push(newMote(true));
  }

  function newMote(anywhere) {
    return {
      x: rand(0, W),
      y: anywhere ? rand(H * 0.25, H) : H - rand(0, grassH * 0.6),
      r: rand(1.2, 3.2),
      speed: rand(0.08, 0.28),
      drift: rand(0.4, 1.2),
      phase: rand(0, Math.PI * 2)
    };
  }

  function wind(x, t, phase) {
    // Two slow sine waves plus a gust that rolls across the field.
    var gustX = ((t * 0.045) % (W + 800)) - 400;
    var gust = 0.16 * Math.exp(-Math.pow(x - gustX, 2) / (2 * 220 * 220));
    return 0.07 * Math.sin(t * 0.0011 + x * 0.004) +
           0.045 * Math.sin(t * 0.0023 + x * 0.013 + phase) + gust;
  }

  function step(t) {
    var base = H + 4, R = W < 700 ? 110 : 150;
    var pv = pointer.vx;
    for (var i = 0; i < blades.length; i++) {
      var b = blades[i];
      var target = wind(b.x, t, b.phase) / b.stiff;
      if (pointer.active) {
        // Bend away from the cursor, and sweep along with its movement.
        var midX = b.x + Math.sin(b.a) * b.h * 0.5, midY = base - b.h * 0.55;
        var dx = midX - pointer.x, dy = midY - pointer.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < R) {
          var f = 1 - d / R; f *= f;
          target += (dx >= 0 ? 1 : -1) * f * 0.95 + pv * 0.012 * f;
        }
      }
      b.v += (target - b.a) * 0.06;   // spring towards the target
      b.v *= 0.86;                    // damping
      b.a += b.v;
    }
    pointer.vx *= 0.9;
    if (performance.now() - pointer.last > 2500) pointer.active = false;

    for (var m = 0; m < motes.length; m++) {
      var mo = motes[m];
      mo.y -= mo.speed;
      mo.x += Math.sin(t * 0.0006 * mo.drift + mo.phase) * 0.25;
      if (mo.y < H * 0.15) motes[m] = newMote(false);
    }
  }

  function drawBlade(b, base) {
    var s = Math.sin(b.a), c = Math.cos(b.a);
    var tipX = b.x + s * b.h, tipY = base - c * b.h;
    var cx = b.x + Math.sin(b.a * 0.45) * b.h * 0.5, cy = base - b.h * 0.55;
    var hw = b.w / 2;
    ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.moveTo(b.x - hw, base);
    ctx.quadraticCurveTo(cx - hw * 0.6, cy, tipX, tipY);
    ctx.quadraticCurveTo(cx + hw * 0.6, cy, b.x + hw, base);
    ctx.closePath();
    ctx.fill();
    if (b.tuft) {
      // A dandelion clock on the odd tall stem.
      ctx.globalAlpha = 0.9;
      ctx.drawImage(sprite, tipX - 9, tipY - 9, 18, 18);
      ctx.fillStyle = palette.tuft;
      ctx.beginPath(); ctx.arc(tipX, tipY, 3.2, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    // Soft ground behind the blades so the field reads as lush, not sparse.
    var gy = H - grassH * 0.55, gg = ctx.createLinearGradient(0, gy, 0, H);
    gg.addColorStop(0, palette.ground[0]); gg.addColorStop(1, palette.ground[1]);
    ctx.fillStyle = gg; ctx.fillRect(0, gy, W, H - gy);
    var base = H + 4, layer = 0;
    for (var i = 0; i < blades.length; i++) {
      var b = blades[i];
      if (b.layer !== layer) {
        // A wash of haze between layers gives the field depth.
        var g = ctx.createLinearGradient(0, H - grassH * 0.7, 0, H);
        g.addColorStop(0, 'rgba(255,255,255,0)');
        g.addColorStop(1, palette.haze);
        ctx.fillStyle = g;
        ctx.fillRect(0, H - grassH * 0.7, W, grassH * 0.7);
        layer = b.layer;
      }
      drawBlade(b, base);
    }
    for (var m = 0; m < motes.length; m++) {
      var mo = motes[m];
      var tw = 0.55 + 0.45 * Math.sin(t * 0.002 + mo.phase * 3);
      ctx.globalAlpha = tw;
      var size = mo.r * 6;
      ctx.drawImage(sprite, mo.x - size / 2, mo.y - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
  }

  function frame(now) {
    if (!running) return;
    var t = now - start;
    step(t); draw(t);
    requestAnimationFrame(frame);
  }

  function play() {
    if (running || reduceMotion.matches || document.hidden) return;
    running = true; requestAnimationFrame(frame);
  }
  function pause() { running = false; }

  function still() {
    // Reduced motion: one calm frame, no animation.
    for (var i = 0; i < blades.length; i++) blades[i].a = wind(blades[i].x, 0, blades[i].phase);
    draw(0);
  }

  function onMove(x, y) {
    var now = performance.now();
    if (pointer.active) pointer.vx += (x - pointer.x) * 0.5;
    pointer.x = x; pointer.y = y; pointer.active = true; pointer.last = now;
  }

  window.addEventListener('pointermove', function (e) { onMove(e.clientX, e.clientY); }, { passive: true });
  window.addEventListener('touchmove', function (e) {
    var p = e.touches[0]; if (p) onMove(p.clientX, p.clientY);
  }, { passive: true });
  document.addEventListener('pointerleave', function () { pointer.active = false; });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { build(); if (!running) still(); }, 150);
  });
  document.addEventListener('visibilitychange', function () { document.hidden ? pause() : play(); });
  function refresh() { build(); pause(); if (reduceMotion.matches) still(); else play(); }
  darkQuery.addEventListener ? darkQuery.addEventListener('change', refresh) : darkQuery.addListener(refresh);
  reduceMotion.addEventListener ? reduceMotion.addEventListener('change', refresh) : reduceMotion.addListener(refresh);

  build();
  if (reduceMotion.matches) still(); else play();
})();

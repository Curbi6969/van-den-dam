// Smooth scroll
document.documentElement.style.scrollBehavior = 'smooth';

// Navbar scroll effect
(function() {
  var nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 40) {
      nav.style.background = 'rgba(251,248,255,0.97)';
      nav.style.boxShadow = '0 4px 24px rgba(35,34,39,0.12)';
    } else {
      nav.style.background = 'rgba(251,248,255,0.85)';
      nav.style.boxShadow = '0 10px 40px rgba(35,34,39,0.06)';
    }
  }, { passive: true });
})();

// Mobile menu toggle
(function() {
  var btn = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function() {
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
})();

// Scroll reveal
(function() {
  var style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
    .reveal.visible { opacity: 1; transform: none; }
  `;
  document.head.appendChild(style);

  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('section > div, .reveal-target').forEach(function(el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  });
})();

// Lazy load images
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img:not([loading])').forEach(function(img) {
      // Skip above-fold hero images
      if (img.closest('section') && img.closest('section').classList.contains('hero-no-lazy')) return;
      img.setAttribute('loading', 'lazy');
    });
  });
})();

// Uitvoermaand picker: volgende maand t/m huidige maand + 1 jaar
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var sel = document.getElementById('uitvoer');
    if (!sel) return;
    var maanden = ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'];
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1; // volgende maand
    if (m > 11) { m = 0; y++; }
    var endY = now.getFullYear() + 1;
    var endM = now.getMonth();
    while (y < endY || (y === endY && m <= endM)) {
      var opt = document.createElement('option');
      opt.value = y + '-' + String(m + 1).padStart(2, '0');
      opt.textContent = maanden[m] + ' ' + y;
      sel.appendChild(opt);
      m++;
      if (m > 11) { m = 0; y++; }
    }
  });
})();

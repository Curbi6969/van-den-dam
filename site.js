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

// Uitvoermaand picker: min = volgende maand, max = huidige maand + 2 jaar
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var input = document.getElementById('uitvoer');
    if (!input) return;
    var now = new Date();
    var minYear = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
    var minMonth = now.getMonth() === 11 ? 0 : now.getMonth() + 1;
    var maxYear = now.getFullYear() + 1;
    var maxMonth = now.getMonth();
    function fmt(y, m) { return y + '-' + String(m + 1).padStart(2, '0'); }
    input.min = fmt(minYear, minMonth);
    input.max = fmt(maxYear, maxMonth);
  });
})();

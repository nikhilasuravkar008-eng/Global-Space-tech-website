/* ============================================
   ANIMATIONS.JS
   - Scroll-reveal: adds .is-visible to .reveal
     elements as they enter the viewport
   ============================================ */

(function () {
  function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
  }

  function init() {
    initScrollReveal();
  }

  // Reveal targets exist in static HTML immediately, but if a page later
  // injects content after partialsLoaded, re-run so nothing is missed.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('partialsLoaded', initScrollReveal);
})();

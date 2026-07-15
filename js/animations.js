/* ============================================
   ANIMATIONS.JS
   - Scroll-reveal: adds .is-visible to .reveal
     elements as they enter the viewport
   - Why GlobalSpace grid: staggers cards in
     sequence as they enter the viewport
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
      { threshold: 0.15, rootMargin: '0px 0px -20% 0px' }
    );

    targets.forEach((el) => observer.observe(el));
  }

  function initWhyGridStagger() {
    const grid = document.querySelector('[data-why-grid]');
    if (!grid) return;
    const cards = grid.querySelectorAll('.why-card');
    if (!cards.length) return;

    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('why-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Array.prototype.indexOf.call(cards, entry.target);
            entry.target.style.animationDelay = (i * 0.25) + 's';
            entry.target.classList.add('why-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -15% 0px' }
    );

    cards.forEach((card) => observer.observe(card));
  }

  function init() {
    initScrollReveal();
    initWhyGridStagger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('partialsLoaded', initScrollReveal);
})();
/* ============================================
   HOME.JS — Home page only interactions
   ============================================ */

(function () {
  function initDemoSelect() {
    const wrap = document.querySelector('[data-demo-select]');
    if (!wrap) return;

    wrap.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-demo]');
      if (!btn) return;
      wrap.querySelectorAll('button').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  }

function initHeroSlider() {
    const slider = document.querySelector('[data-hero-slider]');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero-slider__slide');
    const dots = slider.querySelectorAll('[data-hero-dot]');
    let current = 0;
    let timer = null;

    function goTo(index) {
      const prevSlide = slides[current];
      prevSlide.classList.remove('is-active');
      dots[current].classList.remove('is-active');

      current = (index + slides.length) % slides.length;
      const nextSlide = slides[current];

      // Force reflow so the entrance animation reliably replays,
      // even if this slide was active before.
      void nextSlide.offsetWidth;

      nextSlide.classList.add('is-active');
      dots[current].classList.add('is-active');
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function restart() { clearInterval(timer); timer = setInterval(next, 6000); }

    slider.querySelector('[data-hero-next]').addEventListener('click', () => { next(); restart(); });
    slider.querySelector('[data-hero-prev]').addEventListener('click', () => { prev(); restart(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); restart(); }));

    restart();
  }

  function initHoverVideos() {
    document.querySelectorAll('[data-hover-video]').forEach((wrap) => {
      const video = wrap.querySelector('.product-media__video');
      if (!video) return;

      wrap.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.play().catch(() => {});
      });
      wrap.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    });
  }

  function init() {
    initDemoSelect();
    initHeroSlider();
    initHoverVideos();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ============================================
   LOGO MARQUEE — optional touch pause support
   ============================================ */
(function () {
  function initLogoMarquee() {
    const marquee = document.querySelector('[data-logo-marquee]');
    if (!marquee) return;

    const track = marquee.querySelector('.logo-marquee__track');
    if (!track) return;

    marquee.addEventListener('touchstart', () => {
      track.style.animationPlayState = 'paused';
    }, { passive: true });

    marquee.addEventListener('touchend', () => {
      track.style.animationPlayState = 'running';
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogoMarquee);
  } else {
    initLogoMarquee();
  }
})();
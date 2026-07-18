/* ============================================
   HOME.JS — Home page only interactions
   ============================================ */

(function () {
  gsap.registerPlugin(ScrollTrigger);

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

function initSolutionsScrollAnim() {
    const divider = document.querySelector('.solutions-divider');
    if (!divider) return;

    gsap.from(divider.querySelectorAll('.eyebrow, h2'), {
      opacity: 0,
      y: 32,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: divider,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  function initProductBriefScrollAnim() {
    document.querySelectorAll('.product-brief').forEach((brief) => {
      const copy = brief.querySelector('.product-brief__copy');
      const visual = brief.querySelector('.product-brief__visual');
      if (!copy || !visual) return;

      const isReversed = brief.classList.contains('product-brief--reverse');
      const copyFromX = isReversed ? 70 : -70;
      const visualFromX = isReversed ? -70 : 70;

      gsap.timeline({
        scrollTrigger: {
          trigger: brief,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 1
        }
      })
      .from(copy, { x: copyFromX, opacity: 0, ease: 'none' }, 0)
      .from(visual, { x: visualFromX, opacity: 0, ease: 'none' }, 0);
    });
  }

  function init() {
    initDemoSelect();
    initHeroSlider();
    initHoverVideos();
    initSolutionsScrollAnim();
    initProductBriefScrollAnim();
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
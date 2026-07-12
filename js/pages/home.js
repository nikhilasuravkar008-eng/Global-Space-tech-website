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

  function init() {
    initDemoSelect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

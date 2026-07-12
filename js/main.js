/* ============================================
   MAIN.JS
   - Injects shared header/footer partials
   - Wires up navbar, mega-menu, mobile nav toggle
   - Highlights the active nav link per page
   - Sets footer's current year
   ============================================ */

(function () {
  const MEGA_DATA = {
    vodo: {
      name: 'VODO',
      tag: 'Unified Commercial Excellence Platform',
      items: [
        { name: 'VODO SFA', desc: 'Sales Force Automation & Field Execution', href: '/pages/products/vodo.html' },
        { name: 'VODO AI', desc: 'AI-Powered Commercial Intelligence', href: '/pages/products/vodo.html' },
        { name: 'VODO MDM', desc: 'Enterprise Mobility & Device Management', href: '/products.html' },
        { name: 'VODO CLM', desc: 'Closed-Loop Marketing & HCP Engagement', href: '/pages/products/vodo.html' }
      ]
    },
    mediola: {
      name: 'Mediola',
      tag: 'Pharmaceutical Distribution ERP & AI Platform',
      items: [
        { name: 'Distribution ERP', desc: 'End-to-end pharma distribution management', href: '/pages/products/mediola.html' },
        { name: 'AI Document OCR', desc: 'Sales statement & document intelligence', href: '/pages/products/mediola.html' },
        { name: 'Proof of Delivery', desc: 'AI-verified delivery confirmation', href: '/pages/products/mediola.html' },
        { name: 'MediApp', desc: 'Field & channel partner mobile app', href: '/products.html' }
      ]
    },
    docexa: {
      name: 'DocExa',
      tag: 'Healthcare Operations Platform',
      items: [
        { name: 'OPD', desc: 'Outpatient Workflow Management', href: '/products.html' },
        { name: 'IPD', desc: 'Inpatient Management System', href: '/products.html' },
        { name: 'IoT', desc: 'Connected Healthcare Monitoring', href: '/products.html' },
        { name: 'Genie', desc: 'AI-Powered Clinical Intelligence', href: '/pages/products/docexa.html' }
      ]
    }
  };

  async function loadPartial(path, targetId) {
    try {
      const res = await fetch(path);
      const html = await res.text();
      const target = document.getElementById(targetId);
      if (target) target.innerHTML = html;
    } catch (err) {
      console.error('Failed to load partial:', path, err);
    }
  }

  function setActiveNavLink() {
    const current = document.body.dataset.page;
    if (!current) return;
    document.querySelectorAll('[data-nav-current]').forEach((el) => {
      if (el.dataset.navCurrent === current) {
        el.classList.add('is-active');
      }
    });
  }

  function initMobileToggle() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const links = document.querySelector('[data-nav-links]');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  function renderMegaPanel(catKey) {
    const data = MEGA_DATA[catKey];
    if (!data) return;

    document.querySelectorAll('[data-mega-cat]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.megaCat === catKey);
    });

    const head = document.querySelector('[data-mega-panel-head]');
    if (head) {
      head.innerHTML = `<strong>${data.name}</strong><span>${data.tag}</span>`;
    }

    const itemsWrap = document.querySelector('[data-mega-panel-items]');
    if (itemsWrap) {
      itemsWrap.innerHTML = data.items.map((it) => `
        <a class="mega-item" href="${it.href}">
          <span class="mega-item__name">${it.name}</span>
          <span class="mega-item__desc">${it.desc}</span>
        </a>
      `).join('');
    }
  }

  function initMegaMenu() {
    const wrapper = document.querySelector('[data-mega-wrapper]');
    const trigger = document.querySelector('[data-mega-trigger]');
    const menu = document.querySelector('[data-mega-menu]');
    if (!wrapper || !trigger || !menu) return;

    renderMegaPanel('vodo');

    let closeTimer = null;
    const open = () => {
      clearTimeout(closeTimer);
      menu.classList.add('is-open');
      trigger.classList.add('is-active');
    };
    const scheduleClose = () => {
      closeTimer = setTimeout(() => {
        menu.classList.remove('is-open');
        trigger.classList.remove('is-active');
      }, 200);
    };

    wrapper.addEventListener('mouseenter', open);
    wrapper.addEventListener('mouseleave', scheduleClose);
    trigger.addEventListener('click', () => {
      menu.classList.contains('is-open') ? scheduleClose() : open();
    });

    document.querySelectorAll('[data-mega-cat]').forEach((btn) => {
      btn.addEventListener('mouseenter', () => renderMegaPanel(btn.dataset.megaCat));
      btn.addEventListener('click', () => renderMegaPanel(btn.dataset.megaCat));
    });
  }

  function setFooterYear() {
    const el = document.querySelector('[data-current-year]');
    if (el) el.textContent = new Date().getFullYear();
  }

  async function init() {
    await Promise.all([
      loadPartial('/partials/header.html', 'site-header'),
      loadPartial('/partials/footer.html', 'site-footer')
    ]);

    setActiveNavLink();
    initMobileToggle();
    initMegaMenu();
    setFooterYear();

    document.dispatchEvent(new CustomEvent('partialsLoaded'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

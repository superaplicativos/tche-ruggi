/* ============================================================
   TCHÉ RUGGI — Main JavaScript
   ============================================================ */

(function() {
  'use strict';

  const WHATSAPP = window.WHATSAPP || '5511982109567';

  // ---- LOADER ----
  function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    const bar = loader.querySelector('.loader__bar');
    if (bar) bar.style.width = '100%';
    setTimeout(() => {
      loader.classList.add('is-hidden');
      document.body.style.overflow = '';
    }, 600);
  }

  // ---- NAVIGATION ----
  function initNav() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!nav || !toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !open);
      menu.classList.toggle('is-open');
      toggle.classList.toggle('is-active');
      document.body.style.overflow = open ? '' : 'hidden';
    });

    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        toggle.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });

    // Transparent -> solid on scroll
    window.addEventListener('scroll', () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 80);
    }, { passive: true });
  }

  // ---- SMOOTH SCROLL ----
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ---- SCROLL PROGRESS ----
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / h * 100) + '%';
    }, { passive: true });
  }

  // ---- BACK TO TOP ----
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- REVEAL ON SCROLL ----
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
  }

  // ---- CUSTOM CURSOR ----
  function initCursor() {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const dot = document.getElementById('cursor');
    const ring = document.getElementById('cursor-dot');
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function loop() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, .artwork-card, .tshirt-card').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.classList.add('is-hovering'); ring.classList.add('is-hovering'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('is-hovering'); ring.classList.remove('is-hovering'); });
    });
  }

  // ---- ACTIVE NAV HIGHLIGHT ----
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav__menu a');
    if (!sections.length || !links.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('is-active'));
          const link = document.querySelector('.nav__menu a[href="#' + e.target.id + '"]');
          if (link) link.classList.add('is-active');
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(s => obs.observe(s));
  }

  // ---- RENDER CATALOGO ----
  function renderCatalogo() {
    const grid = document.getElementById('catalogo-grid');
    if (!grid || !window.ARTWORKS) return;

    function render(filter) {
      const works = filter === 'all' ? window.ARTWORKS : window.ARTWORKS.filter(a => a.series === filter);
      grid.innerHTML = '';
      works.forEach((w, i) => {
        const card = document.createElement('div');
        card.className = 'artwork-card reveal' + (w.sold ? ' is-sold' : '');
        card.style.animationDelay = (i * 0.05) + 's';
        card.innerHTML =
          '<div class="artwork-card__image-wrap">' +
            '<img src="images/' + w.img + '" alt="' + w.titlePt + '" loading="lazy" />' +
            (w.sold ? '<span class="artwork-card__badge artwork-card__badge--sold">VENDIDO</span>' :
              (w.priceStr ? '<span class="artwork-card__badge artwork-card__badge--price">' + w.priceStr + '</span>' : '')) +
            (w.edition ? '<span class="artwork-card__badge artwork-card__badge--edition">' + w.edition + '</span>' : '') +
          '</div>' +
          '<div class="artwork-card__info">' +
            '<h3 class="artwork-card__title">' + w.titlePt + '</h3>' +
            '<p class="artwork-card__meta">' + w.year + ' · ' + w.category.toUpperCase() + '</p>' +
            '<p class="artwork-card__detail">' + w.technique + '<br/>' + w.dimensions + '</p>' +
          '</div>' +
          (!w.sold && w.priceStr ?
            '<a href="https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent('Olá! Tenho interesse na obra: ' + w.titlePt + ' - ' + w.priceStr) + '" target="_blank" rel="noopener" class="btn btn--whatsapp btn--sm">Comprar via WhatsApp</a>' : '');
        card.addEventListener('click', function(e) {
          if (e.target.closest('.btn')) return;
          openModal(w);
        });
        grid.appendChild(card);
      });
      initReveal();
    }

    // Filter buttons
    document.querySelectorAll('[data-catalogo-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-catalogo-filter]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        render(btn.dataset.catalogoFilter);
      });
    });

    render('all');
  }

  // ---- RENDER LOJA ----
  function renderLoja() {
    const grid = document.getElementById('loja-grid');
    if (!grid || !window.ARTWORKS) return;

    function render(cat, showSold) {
      let works = window.ARTWORKS.filter(a => !a.sold);
      if (cat !== 'all') works = works.filter(a => a.category === cat);
      if (showSold) {
        const soldWorks = window.ARTWORKS.filter(a => a.sold && (cat === 'all' || a.category === cat));
        works = works.concat(soldWorks);
      }
      works = works.filter(a => a.price > 0);
      grid.innerHTML = '';
      document.getElementById('loja-count').textContent = works.length + ' obras';
      works.forEach((w, i) => {
        const card = document.createElement('div');
        card.className = 'artwork-card reveal' + (w.sold ? ' is-sold' : '');
        card.innerHTML =
          '<div class="artwork-card__image-wrap">' +
            '<img src="images/' + w.img + '" alt="' + w.titlePt + '" loading="lazy" />' +
            (w.sold ? '<span class="artwork-card__badge artwork-card__badge--sold">VENDIDO</span>' :
              '<span class="artwork-card__badge artwork-card__badge--price">' + w.priceStr + '</span>') +
          '</div>' +
          '<div class="artwork-card__info">' +
            '<h3 class="artwork-card__title">' + w.titlePt + '</h3>' +
            '<p class="artwork-card__meta">' + w.technique + '</p>' +
            '<p class="artwork-card__detail">' + w.dimensions + '</p>' +
          '</div>' +
          (!w.sold ?
            '<a href="https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent('Olá! Tenho interesse na obra: ' + w.titlePt + ' - ' + w.priceStr) + '" target="_blank" rel="noopener" class="btn btn--whatsapp">Comprar via WhatsApp</a>' :
            '<span class="btn btn--disabled">Vendido</span>');
        card.addEventListener('click', function(e) {
          if (e.target.closest('.btn')) return;
          openModal(w);
        });
        grid.appendChild(card);
      });
      initReveal();
    }

    document.querySelectorAll('[data-loja-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-loja-filter]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        render(btn.dataset.lojaFilter, document.getElementById('show-sold')?.checked);
      });
    });

    const showSoldToggle = document.getElementById('show-sold');
    if (showSoldToggle) {
      showSoldToggle.addEventListener('change', () => {
        const activeFilter = document.querySelector('[data-loja-filter].is-active');
        render(activeFilter ? activeFilter.dataset.lojaFilter : 'all', showSoldToggle.checked);
      });
    }

    render('all', false);
  }

  // ---- RENDER CAMISETAS ----
  function renderCamisetas() {
    const grid = document.getElementById('camisetas-grid');
    if (!grid || !window.TSHIRTS) return;
    window.TSHIRTS.forEach((ts, i) => {
      const card = document.createElement('div');
      card.className = 'tshirt-card reveal';
      card.style.animationDelay = (i * 0.08) + 's';
      card.innerHTML =
        '<div class="tshirt-card__image-wrap">' +
          '<img src="images/' + ts.img + '" alt="Camiseta ' + ts.name + '" loading="lazy" />' +
          '<div class="tshirt-card__overlay"><span class="tshirt-card__tag">CAMISETA EXCLUSIVA</span></div>' +
        '</div>' +
        '<div class="tshirt-card__info">' +
          '<h3 class="tshirt-card__name">' + ts.name + '</h3>' +
          '<p class="tshirt-card__price">' + ts.price + '</p>' +
          '<p class="tshirt-card__sizes">Tamanhos: P · M · G · GG</p>' +
          '<p class="tshirt-card__colors">Cores: Preto · Branco · Cinza</p>' +
        '</div>' +
        '<a href="https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent('Olá! Quero comprar a camiseta: ' + ts.name + ' - ' + ts.price + '\nTamanho: \nCor: ') + '" target="_blank" rel="noopener" class="btn btn--whatsapp">Comprar via WhatsApp</a>';
      grid.appendChild(card);
    });
    initReveal();
  }

  // ---- RENDER EXHIBITIONS ----
  function renderExhibitions() {
    const timeline = document.getElementById('exhibitions-timeline');
    if (!timeline || !window.EXHIBITIONS) return;
    window.EXHIBITIONS.forEach(ex => {
      const item = document.createElement('div');
      item.className = 'timeline__item reveal';
      item.innerHTML =
        '<div class="timeline__year">' + ex.year + '</div>' +
        '<div class="timeline__content">' +
          '<h3>' + ex.title + '</h3>' +
          '<p>' + ex.venue + '</p>' +
          '<span class="timeline__type">' + (ex.type === 'individual' ? 'Individual' : 'Coletiva') + '</span>' +
        '</div>';
      timeline.appendChild(item);
    });
    initReveal();
  }

  // ---- MODAL ----
  let currentModalIdx = -1;
  function openModal(artwork) {
    const modal = document.getElementById('artwork-modal');
    const body = document.getElementById('modal-body');
    if (!modal || !body) return;
    const allWorks = window.ARTWORKS || [];
    currentModalIdx = allWorks.findIndex(a => a.id === artwork.id);
    body.innerHTML =
      '<img src="images/' + artwork.img + '" alt="' + artwork.titlePt + '" />' +
      '<div class="modal__details">' +
        '<h2>' + artwork.titlePt + '</h2>' +
        '<p class="modal__technique">' + artwork.technique + '</p>' +
        '<p class="modal__dimensions">' + artwork.dimensions + '</p>' +
        '<p class="modal__year">' + artwork.year + '</p>' +
        (artwork.priceStr ? '<p class="modal__price">' + artwork.priceStr + '</p>' : '') +
        (artwork.sold ? '<p class="modal__sold">VENDIDO</p>' :
          '<a href="https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent('Olá! Tenho interesse na obra: ' + artwork.titlePt + ' - ' + (artwork.priceStr || '')) + '" target="_blank" class="btn btn--whatsapp">Comprar via WhatsApp</a>') +
      '</div>';
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  window.openModal = openModal;

  function closeModal() {
    const modal = document.getElementById('artwork-modal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function initModal() {
    document.querySelectorAll('[data-close-modal]').forEach(el => {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
      if (!document.getElementById('artwork-modal')?.classList.contains('is-open')) return;
      const works = window.ARTWORKS || [];
      if (e.key === 'ArrowRight' && currentModalIdx < works.length - 1) openModal(works[currentModalIdx + 1]);
      if (e.key === 'ArrowLeft' && currentModalIdx > 0) openModal(works[currentModalIdx - 1]);
    });
  }

  // ---- FOOTER YEAR ----
  function setYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ---- INIT ----
  document.addEventListener('DOMContentLoaded', function() {
    document.body.style.overflow = 'hidden';
    setTimeout(hideLoader, 800);
    initNav();
    initSmoothScroll();
    initScrollProgress();
    initBackToTop();
    initCursor();
    initActiveNav();
    renderCatalogo();
    renderLoja();
    renderCamisetas();
    renderExhibitions();
    initModal();
    setYear();
    if (window.initThreeScene) window.initThreeScene();
    initReveal();
  });
})();

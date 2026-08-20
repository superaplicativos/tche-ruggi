/* ============================================================
   TCHE RUGGI - Main JavaScript
   ============================================================ */

var WHATSAPP = '5511982109567';

function hideLoader() {
  var loader = document.getElementById('loader');
  if (!loader) return;
  var bar = loader.querySelector('.loader__bar');
  if (bar) bar.style.width = '100%';
  setTimeout(function() {
    loader.classList.add('is-hidden');
    document.body.style.overflow = '';
  }, 600);
}

function initNav() {
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!nav || !toggle || !menu) return;
  toggle.addEventListener('click', function() {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('is-open');
    toggle.classList.toggle('is-active');
    document.body.style.overflow = open ? '' : 'hidden';
  });
  menu.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      toggle.classList.remove('is-active');
      document.body.style.overflow = '';
    });
  });
  window.addEventListener('scroll', function() {
    nav.classList.toggle('is-scrolled', window.scrollY > 80);
  }, { passive: true });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initScrollProgress() {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', function() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / h * 100) + '%';
  }, { passive: true });
}

function initBackToTop() {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });
  btn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

function initReveal() {
  var els = document.querySelectorAll('.reveal:not(.is-visible)');
  if (!els.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function(el) { obs.observe(el); });
}

function initCursor() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  var dot = document.getElementById('cursor');
  var ring = document.getElementById('cursor-dot');
  if (!dot || !ring) return;
  var mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; });
  (function loop() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
    requestAnimationFrame(loop);
  })();
}

function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.nav__menu a');
  if (!sections.length || !links.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        links.forEach(function(l) { l.classList.remove('is-active'); });
        var link = document.querySelector('.nav__menu a[href="#' + e.target.id + '"]');
        if (link) link.classList.add('is-active');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(function(s) { obs.observe(s); });
}

function renderCatalogo() {
  var grid = document.getElementById('catalogo-grid');
  if (!grid || !window.ARTWORKS) return;
  function render(filter) {
    var works = filter === 'all' ? window.ARTWORKS : window.ARTWORKS.filter(function(a) { return a.series === filter; });
    grid.innerHTML = '';
    works.forEach(function(w, i) {
      var card = document.createElement('div');
      card.className = 'artwork-card reveal' + (w.sold ? ' is-sold' : '');
      card.style.animationDelay = (i * 0.05) + 's';
      var badges = '';
      if (w.sold) badges += '<span class="artwork-card__badge artwork-card__badge--sold">VENDIDO</span>';
      else if (w.priceStr) badges += '<span class="artwork-card__badge artwork-card__badge--price">' + w.priceStr + '</span>';
      if (w.edition) badges += '<span class="artwork-card__badge artwork-card__badge--edition">' + w.edition + '</span>';
      var btn = '';
      if (!w.sold && w.priceStr) {
        btn = '<a href="https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent('Ola! Tenho interesse na obra: ' + w.titlePt + ' - ' + w.priceStr) + '" target="_blank" rel="noopener" class="btn btn--whatsapp btn--sm">Comprar via WhatsApp</a>';
      }
      card.innerHTML = '<div class="artwork-card__image-wrap"><img src="images/' + w.img + '" alt="' + w.titlePt + '" loading="lazy" />' + badges + '</div><div class="artwork-card__info"><h3 class="artwork-card__title">' + w.titlePt + '</h3><p class="artwork-card__meta">' + w.year + ' &middot; ' + w.category.toUpperCase() + '</p><p class="artwork-card__detail">' + w.technique + '<br/>' + w.dimensions + '</p></div>' + btn;
      card.addEventListener('click', function(e) { if (e.target.closest('.btn')) return; openModal(w); });
      grid.appendChild(card);
    });
    initReveal();
  }
  document.querySelectorAll('[data-catalogo-filter]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('[data-catalogo-filter]').forEach(function(b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      render(btn.dataset.catalogoFilter);
    });
  });
  render('all');
}

function renderLoja() {
  var grid = document.getElementById('loja-grid');
  if (!grid || !window.ARTWORKS) return;
  function render(cat, showSold) {
    var works = window.ARTWORKS.filter(function(a) { return !a.sold; });
    if (cat !== 'all') works = works.filter(function(a) { return a.category === cat; });
    if (showSold) {
      var soldWorks = window.ARTWORKS.filter(function(a) { return a.sold && (cat === 'all' || a.category === cat); });
      works = works.concat(soldWorks);
    }
    works = works.filter(function(a) { return a.price > 0; });
    grid.innerHTML = '';
    var countEl = document.getElementById('loja-count');
    if (countEl) countEl.textContent = works.length + ' obras';
    works.forEach(function(w, i) {
      var card = document.createElement('div');
      card.className = 'artwork-card reveal' + (w.sold ? ' is-sold' : '');
      var badges = w.sold ? '<span class="artwork-card__badge artwork-card__badge--sold">VENDIDO</span>' : '<span class="artwork-card__badge artwork-card__badge--price">' + w.priceStr + '</span>';
      var btn = w.sold ? '<span class="btn btn--disabled">Vendido</span>' : '<a href="https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent('Ola! Tenho interesse na obra: ' + w.titlePt + ' - ' + w.priceStr) + '" target="_blank" rel="noopener" class="btn btn--whatsapp">Comprar via WhatsApp</a>';
      card.innerHTML = '<div class="artwork-card__image-wrap"><img src="images/' + w.img + '" alt="' + w.titlePt + '" loading="lazy" />' + badges + '</div><div class="artwork-card__info"><h3 class="artwork-card__title">' + w.titlePt + '</h3><p class="artwork-card__meta">' + w.technique + '</p><p class="artwork-card__detail">' + w.dimensions + '</p></div>' + btn;
      card.addEventListener('click', function(e) { if (e.target.closest('.btn')) return; openModal(w); });
      grid.appendChild(card);
    });
    initReveal();
  }
  document.querySelectorAll('[data-loja-filter]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('[data-loja-filter]').forEach(function(b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      render(btn.dataset.lojaFilter, document.getElementById('show-sold') && document.getElementById('show-sold').checked);
    });
  });
  var showSoldToggle = document.getElementById('show-sold');
  if (showSoldToggle) {
    showSoldToggle.addEventListener('change', function() {
      var activeFilter = document.querySelector('[data-loja-filter].is-active');
      render(activeFilter ? activeFilter.dataset.lojaFilter : 'all', showSoldToggle.checked);
    });
  }
  render('all', false);
}

function renderCamisetas() {
  var grid = document.getElementById('camisetas-grid');
  if (!grid || !window.TSHIRTS) return;
  window.TSHIRTS.forEach(function(ts, i) {
    var card = document.createElement('div');
    card.className = 'tshirt-card reveal';
    card.style.animationDelay = (i * 0.08) + 's';
    card.innerHTML = '<div class="tshirt-card__image-wrap"><img src="images/' + ts.img + '" alt="Camiseta ' + ts.name + '" loading="lazy" /><div class="tshirt-card__overlay"><span class="tshirt-card__tag">CAMISETA EXCLUSIVA</span></div></div><div class="tshirt-card__info"><h3 class="tshirt-card__name">' + ts.name + '</h3><p class="tshirt-card__price">' + ts.price + '</p><p class="tshirt-card__sizes">Tamanhos: P &middot; M &middot; G &middot; GG</p><p class="tshirt-card__colors">Cores: Preto &middot; Branco &middot; Cinza</p></div><a href="https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent('Ola! Quero comprar a camiseta: ' + ts.name + ' - ' + ts.price + '\nTamanho: \nCor: ') + '" target="_blank" rel="noopener" class="btn btn--whatsapp">Comprar via WhatsApp</a>';
    grid.appendChild(card);
  });
  initReveal();
}

function renderExhibitions() {
  var timeline = document.getElementById('exhibitions-timeline');
  if (!timeline || !window.EXHIBITIONS) return;
  window.EXHIBITIONS.forEach(function(ex) {
    var item = document.createElement('div');
    item.className = 'timeline__item reveal';
    item.innerHTML = '<div class="timeline__year">' + ex.year + '</div><div class="timeline__content"><h3>' + ex.title + '</h3><p>' + ex.venue + '</p><span class="timeline__type">' + (ex.type === 'individual' ? 'Individual' : 'Coletiva') + '</span></div>';
    timeline.appendChild(item);
  });
  initReveal();
}

var currentModalIdx = -1;
function openModal(artwork) {
  var modal = document.getElementById('artwork-modal');
  var body = document.getElementById('modal-body');
  if (!modal || !body) return;
  var allWorks = window.ARTWORKS || [];
  currentModalIdx = allWorks.findIndex(function(a) { return a.id === artwork.id; });
  var priceHtml = artwork.priceStr ? '<p class="modal__price">' + artwork.priceStr + '</p>' : '';
  var buyHtml = artwork.sold ? '<p class="modal__sold">VENDIDO</p>' : '<a href="https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent('Ola! Tenho interesse na obra: ' + artwork.titlePt + ' - ' + (artwork.priceStr || '')) + '" target="_blank" class="btn btn--whatsapp">Comprar via WhatsApp</a>';
  body.innerHTML = '<img src="images/' + artwork.img + '" alt="' + artwork.titlePt + '" /><div class="modal__details"><h2>' + artwork.titlePt + '</h2><p class="modal__technique">' + artwork.technique + '</p><p class="modal__dimensions">' + artwork.dimensions + '</p><p class="modal__year">' + artwork.year + '</p>' + priceHtml + buyHtml + '</div>';
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  var modal = document.getElementById('artwork-modal');
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

function initModal() {
  document.querySelectorAll('[data-close-modal]').forEach(function(el) {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
    if (!document.getElementById('artwork-modal') || !document.getElementById('artwork-modal').classList.contains('is-open')) return;
    var works = window.ARTWORKS || [];
    if (e.key === 'ArrowRight' && currentModalIdx < works.length - 1) openModal(works[currentModalIdx + 1]);
    if (e.key === 'ArrowLeft' && currentModalIdx > 0) openModal(works[currentModalIdx - 1]);
  });
}

function setYear() {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

function init() {
  hideLoader();
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
}

document.addEventListener('DOMContentLoaded', init);
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(init, 100);
}

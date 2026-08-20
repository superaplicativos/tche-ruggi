/* ============================================================
   TCHÉ RUGGI - Main JavaScript (v4 - matches CSS classes)
   ============================================================ */

var WHATSAPP = '5511982109567';
var currentModalIdx = -1;

/* ── Loader ─────────────────────────────────────────────── */
function hideLoader() {
  var loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(function() {
    loader.classList.add('is-hidden');
  }, 400);
}

/* ── Navigation ─────────────────────────────────────────── */
function initNav() {
  var nav = document.getElementById('nav');
  var hamburger = document.getElementById('nav-hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  if (!nav || !hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function() {
    var isOpen = mobileMenu.classList.contains('is-open');
    if (isOpen) {
      mobileMenu.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('is-open');
      hamburger.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close mobile menu on link click
  var mobileLinks = mobileMenu.querySelectorAll('.nav__mobile-link');
  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener('click', function() {
      mobileMenu.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }

  // Scroll state
  window.addEventListener('scroll', function() {
    if (window.scrollY > 80) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }, { passive: true });
}

/* ── Active Nav Highlight ───────────────────────────────── */
function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.nav__link');
  if (!sections.length || !links.length) return;
  var obs = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        for (var j = 0; j < links.length; j++) {
          links[j].classList.remove('is-active');
        }
        var activeLink = document.querySelector('.nav__link[href="#' + entries[i].target.id + '"]');
        if (activeLink) activeLink.classList.add('is-active');
      }
    }
  }, { threshold: 0.3 });
  for (var k = 0; k < sections.length; k++) {
    obs.observe(sections[k]);
  }
}

/* ── Smooth Scroll ──────────────────────────────────────── */
function initSmoothScroll() {
  var links = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

/* ── Scroll Progress ────────────────────────────────────── */
function initScrollProgress() {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', function() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h > 0) {
      bar.style.width = (window.scrollY / h * 100) + '%';
    }
  }, { passive: true });
}

/* ── Back to Top ────────────────────────────────────────── */
function initBackToTop() {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 600) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Reveal on Scroll ───────────────────────────────────── */
function initReveal() {
  var els = document.querySelectorAll('.reveal:not(.is-visible), .reveal-left:not(.is-visible), .reveal-right:not(.is-visible), .reveal-scale:not(.is-visible), .reveal-fade:not(.is-visible), .reveal-stagger:not(.is-visible)');
  if (!els.length) return;
  var obs = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('is-visible');
        obs.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  for (var j = 0; j < els.length; j++) {
    obs.observe(els[j]);
  }
}

/* ── Footer Year ────────────────────────────────────────── */
function setYear() {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── WhatsApp Link Helper ───────────────────────────────── */
function waLink(text) {
  return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text);
}

/* ── Render Catalogo ────────────────────────────────────── */
function renderCatalogo() {
  var grid = document.getElementById('catalogo-grid');
  if (!grid || !window.ARTWORKS) return;

  function render(filter) {
    var works = (filter === 'all') ? window.ARTWORKS : window.ARTWORKS.filter(function(a) { return a.series === filter; });
    grid.innerHTML = '';
    for (var i = 0; i < works.length; i++) {
      var w = works[i];
      var card = document.createElement('div');
      card.className = 'artwork-card' + (w.sold ? ' artwork-card--sold' : '');

      var seriesTag = '<span class="artwork-card__series">' + (window.SERIES_INFO[w.series] ? window.SERIES_INFO[w.series].title : w.series) + '</span>';
      var priceBadge = w.sold
        ? '<span class="artwork-card__badge artwork-card__badge--sold">Vendido</span>'
        : (w.priceStr ? '<span class="artwork-card__badge artwork-card__badge--available">' + w.priceStr + '</span>' : '');

      card.innerHTML =
        '<div class="artwork-card__image-wrap">' +
          '<img src="images/' + w.img + '" alt="' + w.titlePt + '" loading="lazy" />' +
          '<div class="artwork-card__image-overlay"></div>' +
          seriesTag +
          priceBadge +
        '</div>' +
        '<div class="artwork-card__info">' +
          '<h3 class="artwork-card__title">' + w.titlePt + '</h3>' +
          '<span class="artwork-card__year">' + w.year + '</span>' +
          '<div class="artwork-card__details">' + w.technique + '<br>' + w.dimensions + '</div>' +
        '</div>';

      (function(artwork) {
        card.addEventListener('click', function() { openModal(artwork); });
      })(w);

      grid.appendChild(card);
    }
    initReveal();
  }

  var filters = document.querySelectorAll('[data-catalogo-filter]');
  for (var i = 0; i < filters.length; i++) {
    filters[i].addEventListener('click', function() {
      for (var j = 0; j < filters.length; j++) filters[j].classList.remove('is-active');
      this.classList.add('is-active');
      render(this.getAttribute('data-catalogo-filter'));
    });
  }
  render('all');
}

/* ── Render Loja ────────────────────────────────────────── */
function renderLoja() {
  var grid = document.getElementById('loja-grid');
  var countEl = document.getElementById('loja-count');
  if (!grid || !window.ARTWORKS) return;

  function render(cat) {
    var works = window.ARTWORKS.filter(function(a) { return a.price > 0; });
    if (cat !== 'all') works = works.filter(function(a) { return a.category === cat; });

    if (countEl) countEl.textContent = works.length + ' obras disponíveis';
    grid.innerHTML = '';

    for (var i = 0; i < works.length; i++) {
      var w = works[i];
      var card = document.createElement('div');
      card.className = 'artwork-card' + (w.sold ? ' artwork-card--sold' : '');

      var priceBadge = w.sold
        ? '<span class="artwork-card__badge artwork-card__badge--sold">Vendido</span>'
        : '<span class="artwork-card__badge artwork-card__badge--available">' + w.priceStr + '</span>';

      var waBtn = w.sold
        ? ''
        : '<a href="' + waLink('Olá! Tenho interesse na obra: ' + w.titlePt + ' - ' + w.priceStr) + '" target="_blank" rel="noopener" class="artwork-card__whatsapp"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z"/></svg> WhatsApp</a>';

      card.innerHTML =
        '<div class="artwork-card__image-wrap">' +
          '<img src="images/' + w.img + '" alt="' + w.titlePt + '" loading="lazy" />' +
          '<div class="artwork-card__image-overlay"></div>' +
          priceBadge +
          waBtn +
        '</div>' +
        '<div class="artwork-card__info">' +
          '<h3 class="artwork-card__title">' + w.titlePt + '</h3>' +
          (w.sold ? '' : '<div class="artwork-card__price">' + w.priceStr + '</div>') +
          '<span class="artwork-card__year">' + w.technique + ' · ' + w.dimensions + '</span>' +
          '<div class="artwork-card__details">' + w.year + '</div>' +
        '</div>';

      (function(artwork) {
        card.querySelector('.artwork-card__image-wrap').addEventListener('click', function(e) {
          if (e.target.closest('.artwork-card__whatsapp')) return;
          openModal(artwork);
        });
      })(w);

      grid.appendChild(card);
    }
    initReveal();
  }

  var filters = document.querySelectorAll('[data-loja-filter]');
  for (var i = 0; i < filters.length; i++) {
    filters[i].addEventListener('click', function() {
      for (var j = 0; j < filters.length; j++) filters[j].classList.remove('is-active');
      this.classList.add('is-active');
      render(this.getAttribute('data-loja-filter'));
    });
  }
  render('all');
}

/* ── Render Camisetas ───────────────────────────────────── */
function renderCamisetas() {
  var grid = document.getElementById('camisetas-grid');
  if (!grid || !window.TSHIRTS) return;

  for (var i = 0; i < window.TSHIRTS.length; i++) {
    var ts = window.TSHIRTS[i];
    var card = document.createElement('div');
    card.className = 'camiseta-card';
    card.innerHTML =
      '<div class="camiseta-card__image-wrap">' +
        '<img src="images/' + ts.img + '" alt="Camiseta ' + ts.name + '" loading="lazy" />' +
      '</div>' +
      '<div class="camiseta-card__info">' +
        '<h3 class="camiseta-card__name">' + ts.name + '</h3>' +
        '<div class="camiseta-card__price-row">' +
          '<span class="camiseta-card__price">' + ts.price + '</span>' +
          '<span class="camiseta-card__sizes">P · M · G · GG</span>' +
        '</div>' +
      '</div>' +
      '<a href="' + waLink('Olá! Quero comprar a camiseta: ' + ts.name + ' - ' + ts.price + '\nTamanho: \nCor: ') + '" target="_blank" rel="noopener" class="camiseta-card__buy-btn">' +
        '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z"/></svg>' +
        'Comprar via WhatsApp' +
      '</a>';
    grid.appendChild(card);
  }
}

/* ── Render Exposicoes ──────────────────────────────────── */
function renderExhibitions() {
  var timeline = document.getElementById('exhibitions-timeline');
  if (!timeline || !window.EXHIBITIONS) return;

  for (var i = 0; i < window.EXHIBITIONS.length; i++) {
    var ex = window.EXHIBITIONS[i];
    var item = document.createElement('div');
    item.className = 'expo-item reveal';
    item.innerHTML =
      '<div class="expo-item__dot"></div>' +
      '<div class="expo-item__connector"></div>' +
      '<div class="expo-item__year">' + ex.year + '</div>' +
      '<div class="expo-item__content">' +
        '<h3 class="expo-item__title">' + ex.title + '</h3>' +
        '<p class="expo-item__venue">' + ex.venue + '</p>' +
        '<span class="tag" style="margin-top:var(--space-xs);display:inline-flex">' + (ex.type === 'individual' ? 'Individual' : 'Coletiva') + '</span>' +
      '</div>';
    timeline.appendChild(item);
  }
}

/* ── Modal ──────────────────────────────────────────────── */
function openModal(artwork) {
  var modal = document.getElementById('artwork-modal');
  var imgContainer = document.getElementById('modal-image-container');
  var titleEl = document.getElementById('modal-title');
  var detailsEl = document.getElementById('modal-details');
  if (!modal || !imgContainer) return;

  var allWorks = window.ARTWORKS || [];
  currentModalIdx = -1;
  for (var i = 0; i < allWorks.length; i++) {
    if (allWorks[i].id === artwork.id) { currentModalIdx = i; break; }
  }

  imgContainer.innerHTML = '<img src="images/' + artwork.img + '" alt="' + artwork.titlePt + '" />';
  if (titleEl) titleEl.textContent = artwork.titlePt;
  if (detailsEl) {
    var detailParts = [artwork.technique, artwork.dimensions, artwork.year];
    if (artwork.priceStr) detailParts.push(artwork.priceStr);
    if (artwork.sold) detailParts.push('VENDIDO');
    detailsEl.textContent = detailParts.join(' · ');
  }

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
  var closeBtn = document.getElementById('modal-close');
  var prevBtn = document.getElementById('modal-prev');
  var nextBtn = document.getElementById('modal-next');
  var modal = document.getElementById('artwork-modal');

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', function() {
    var works = window.ARTWORKS || [];
    if (currentModalIdx > 0) openModal(works[currentModalIdx - 1]);
  });
  if (nextBtn) nextBtn.addEventListener('click', function() {
    var works = window.ARTWORKS || [];
    if (currentModalIdx < works.length - 1) openModal(works[currentModalIdx + 1]);
  });

  document.addEventListener('keydown', function(e) {
    if (!modal || !modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    var works = window.ARTWORKS || [];
    if (e.key === 'ArrowRight' && currentModalIdx < works.length - 1) openModal(works[currentModalIdx + 1]);
    if (e.key === 'ArrowLeft' && currentModalIdx > 0) openModal(works[currentModalIdx - 1]);
  });
}

/* ── Init ───────────────────────────────────────────────── */
function init() {
  hideLoader();
  initNav();
  initActiveNav();
  initSmoothScroll();
  initScrollProgress();
  initBackToTop();
  renderCatalogo();
  renderLoja();
  renderCamisetas();
  renderExhibitions();
  initModal();
  setYear();
  initReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
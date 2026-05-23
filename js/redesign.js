/* ============================================
   BMW SERVICE MIAMI — REDESIGN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Page Loader --- */
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('loaded'), 1200);
    });
    // Fallback in case load event already fired
    setTimeout(() => loader.classList.add('loaded'), 3000);
  }

  /* --- Mobile Menu --- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  /* --- Navbar scroll state (adds solid background once scrolled) --- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Media page: varied-size masonry sizing --- */
  const mediaGallery = document.querySelector('.media-gallery');
  if (mediaGallery) {
    const sizePattern = ['lg','sm','sm','tall','sm','wide','sm','sm','lg','sm','tall','sm','sm','wide','sm','tall','sm'];
    [...mediaGallery.querySelectorAll('.gallery-item')].forEach((tile, i) => {
      tile.classList.add('g-' + sizePattern[i % sizePattern.length]);
    });
  }

  /* --- GSAP Animations --- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Hero entrance
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.hero-main-img', { opacity: 0, scale: 1.05, duration: 1.6, delay: 1.5 })
      .from('.hero-intro', { opacity: 0, y: 30, duration: 0.8 }, '-=0.3');

    // Service rows stagger
    gsap.from('.service-row', {
      scrollTrigger: {
        trigger: '.services-list',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out'
    });

    // Services box entrance
    gsap.from('.services-box', {
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top 60%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Bottom section
    gsap.from('.bottom-top-grid', {
      scrollTrigger: {
        trigger: '.bottom-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    });

    gsap.from('.bottom-contact-box', {
      scrollTrigger: {
        trigger: '.bottom-contact-box',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  /* --- Services page: asymmetric magazine masonry --- */
  const svcMagGrids = [...document.querySelectorAll('.svc-grid')].filter(g =>
    g.querySelectorAll(':scope > .svc-card').length > 1 &&
    !g.querySelector('.svc-card-wide')
  );
  svcMagGrids.forEach((grid, gi) => {
    const cards = [...grid.querySelectorAll(':scope > .svc-card')];
    const wideLeft = gi % 2 === 0;
    let mode = '';
    const layout = () => {
      const want = window.innerWidth > 768 ? 'mag' : 'flat';
      if (want === mode) return;
      mode = want;
      cards.forEach(c => c.classList.remove('svc-feature', 'is-flipped'));
      if (want === 'mag') {
        const feature = cards[0];
        feature.classList.add('svc-feature');
        if (!wideLeft) feature.classList.add('is-flipped');
        const colWide = document.createElement('div');
        const colNarrow = document.createElement('div');
        colWide.className = 'svc-col is-wide';
        colNarrow.className = 'svc-col is-narrow';
        cards.slice(1).forEach((card, i) => {
          (i % 2 === 0 ? colWide : colNarrow).appendChild(card);
        });
        const masonry = document.createElement('div');
        masonry.className = 'svc-masonry';
        masonry.append(...(wideLeft ? [colWide, colNarrow] : [colNarrow, colWide]));
        grid.replaceChildren(feature, masonry);
      } else {
        grid.replaceChildren(...cards);
      }
    };
    layout();
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 150);
    });
  });

  /* --- Cross-page deep-link: scroll to a service section --- */
  let deepLinkTarget = null;
  try {
    if (window.location.hash.length > 1) {
      deepLinkTarget = document.querySelector(window.location.hash);
    }
  } catch (e) { /* invalid hash selector — ignore */ }
  if (deepLinkTarget) {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    window.addEventListener('load', () => {
      setTimeout(() => {
        deepLinkTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 1500);
    });
  }

});

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

  /* --- GSAP Animations --- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Hero entrance
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.hero-layer-bg', { opacity: 0, scale: 1.05, duration: 1.6, delay: 1.5 })
      .from('.hero-layer-text', { opacity: 0, scale: 0.9, duration: 1.2 }, '-=0.8')
      .from('.hero-layer-car', { opacity: 0, duration: 1 }, '-=0.6')
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

});

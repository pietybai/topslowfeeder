// Mobile menu toggle
const toggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Tap dropdown on mobile
  nav.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        if (!link.parentElement.classList.contains('open')) {
          e.preventDefault();
          link.parentElement.classList.toggle('open');
        }
      }
    });
  });
}

// Product gallery thumbnail switcher
const mainImg = document.querySelector('.product-main-img img');
const thumbs = document.querySelectorAll('.product-thumbs img');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    if (mainImg) mainImg.src = thumb.src;
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

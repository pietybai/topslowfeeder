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
        e.preventDefault();
        link.parentElement.classList.toggle('open');
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

// Contact form submission feedback
const contactForm = document.querySelector('form[action*="web3forms"]');
if (contactForm) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const msgDiv = document.createElement('div');
  msgDiv.style.cssText = 'margin-top:16px;padding:14px 18px;border-radius:8px;font-size:0.95rem;display:none;';
  contactForm.appendChild(msgDiv);

  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm)
      });
      const data = await res.json();
      if (data.success) {
        msgDiv.style.cssText += 'background:#e6f4ea;color:#1e7e34;border:1px solid #a8d5b0;display:block;';
        msgDiv.textContent = '✓ Your inquiry has been sent. We\'ll reply within 12 hours on business days.';
        contactForm.reset();
        submitBtn.textContent = 'Sent';
      } else {
        throw new Error('failed');
      }
    } catch {
      msgDiv.style.cssText += 'background:#fdecea;color:#c0392b;border:1px solid #f5c6cb;display:block;';
      msgDiv.innerHTML = '✕ Something went wrong. Please email us directly at <a href="mailto:marvin@szqidian.net">marvin@szqidian.net</a>.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Inquiry';
    }
  });
}

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

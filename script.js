// ─── Navigation scroll shadow ───────────────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ─── Hamburger menu ─────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ─── Scroll to top ──────────────────────────────────────────────────────────
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── FAQ Accordion ──────────────────────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ─── Active nav link ────────────────────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.style.color    = 'var(--primary)';
    link.style.fontWeight = '700';
  }
});

// ─── Hero animation bfcache reset ───────────────────────────────────────────
// Браузер восстанавливает страницу из кэша (bfcache) без перезагрузки —
// анимация уже сыграна и не повторится. Сбрасываем вручную.
window.addEventListener('pageshow', (e) => {
  if (!e.persisted) return;
  ['.hero h1', '.hero p', '.hero-buttons'].forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.animation = 'none';
    el.offsetHeight; // принудительный reflow
    el.style.animation = '';
  });
});

// ─── Scroll reveal (IntersectionObserver) ───────────────────────────────────
// Staggered delays — назначаются один раз при загрузке страницы
document.querySelectorAll('.trust-items .scroll-reveal').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.1) + 's';
});
document.querySelectorAll('.process-steps .scroll-reveal').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.15) + 's';
});
// price-cards — задержка 0 (одновременно, стили из CSS)

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // срабатывает один раз
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

// ─── Contact form ───────────────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    // PLATZHALTER: Formspree-URL im <form action="..."> eintragen
    // Beispiel: action="https://formspree.io/f/YOUR_FORM_ID" method="POST"
    // Für echte Übermittlung: action auf Formspree setzen und diesen Handler entfernen
    e.preventDefault();
    const btn     = contactForm.querySelector('button[type="submit"]');
    const success = document.getElementById('formSuccess');
    btn.textContent = '✓ Nachricht gesendet!';
    btn.disabled    = true;
    btn.style.background = 'var(--cta)';
    contactForm.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
    if (success) success.classList.add('visible');
  });
}

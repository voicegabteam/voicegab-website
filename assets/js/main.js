/* ═══════════════════════════════
   VOICEGAB MAIN JS v1.0
═══════════════════════════════ */

// 1. Navbar scroll behavior
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// 2. Active nav link detection (current page)
(function setActiveNav() {
  const currentPath = window.location.pathname;
  const page = currentPath.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html') ||
        (page === 'index.html' && href === 'index.html') ||
        (currentPath === '/' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// 3. Mobile menu toggle
const hamburger = document.querySelector('.navbar__hamburger');
const mobileMenu = document.querySelector('.navbar__mobile-menu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu on link click
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// 4. Scroll reveal (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 5. FAQ Accordion (for support page)
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  question?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
    }
  });
});

// FAQ search filter (support page)
const faqSearch = document.querySelector('.search-bar input');
if (faqSearch) {
  const faqItems = [...document.querySelectorAll('.faq-item')];
  const emptyMsg = document.createElement('p');
  emptyMsg.className = 'faq-empty text-center';
  emptyMsg.hidden = true;
  emptyMsg.innerHTML = 'No matching questions. Email us at <a href="mailto:support@voicegab.com">support@voicegab.com</a>.';
  faqItems[0]?.parentElement.appendChild(emptyMsg);

  faqSearch.addEventListener('input', () => {
    const query = faqSearch.value.trim().toLowerCase();
    let matches = 0;
    faqItems.forEach(item => {
      const match = !query || item.textContent.toLowerCase().includes(query);
      item.hidden = !match;
      if (match) matches++;
    });
    emptyMsg.hidden = matches > 0;
  });
  faqSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.querySelector('#faq')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// 6. Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = anchor.getAttribute('href');
    if (target === '#') return;
    e.preventDefault();
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  });
});

// 7. Cookie consent
// Optional scripts must be added as
//   <script type="text/plain" data-consent="analytics" data-src="..."></script>
// (or data-consent="marketing") so they only run after the visitor allows that category.
const VoiceGabConsent = (() => {
  const STORAGE_KEY = 'vg-cookie-consent';
  const CONSENT_VERSION = 2;
  const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
  const CATEGORIES = [
    {
      id: 'necessary',
      name: 'Strictly necessary',
      locked: true,
      description: 'Required for the website to work, such as remembering your cookie choices. These cannot be switched off.',
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Help us understand how visitors use the website so we can improve it. We do not currently use any analytics cookies.',
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Used to measure ad campaigns and show relevant content on other sites. We do not currently use any marketing cookies.',
    },
  ];
  const OPTIONAL_IDS = CATEGORIES.filter(c => !c.locked).map(c => c.id);

  let sessionPrefs = null;
  let banner = null;
  let modal = null;
  let lastFocused = null;

  function read() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && saved.version === CONSENT_VERSION && Date.now() - saved.timestamp < MAX_AGE_MS) {
        return saved;
      }
    } catch (e) { /* storage blocked or corrupt */ }
    return sessionPrefs;
  }

  function write(choices) {
    const prefs = { version: CONSENT_VERSION, timestamp: Date.now(), necessary: true };
    OPTIONAL_IDS.forEach(id => { prefs[id] = Boolean(choices[id]); });
    sessionPrefs = prefs;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) { /* storage blocked: choice lasts for this page view only */ }
    return prefs;
  }

  function loadAllowedScripts(prefs) {
    document.querySelectorAll('script[type="text/plain"][data-consent]').forEach(placeholder => {
      if (!prefs[placeholder.dataset.consent]) return;
      const script = document.createElement('script');
      if (placeholder.dataset.src) script.src = placeholder.dataset.src;
      else script.textContent = placeholder.textContent;
      placeholder.replaceWith(script);
    });
  }

  function save(choices) {
    const prefs = write(choices);
    hideBanner();
    closeModal();
    loadAllowedScripts(prefs);
    document.dispatchEvent(new CustomEvent('vg:consent', { detail: prefs }));
  }

  const allOptional = value => Object.fromEntries(OPTIONAL_IDS.map(id => [id, value]));
  const acceptAll = () => save(allOptional(true));
  const rejectAll = () => save(allOptional(false));

  /* ─── Banner ─── */
  function buildBanner() {
    banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div class="cookie-banner__icon" aria-hidden="true">&#x1F36A;</div>
      <div class="cookie-banner__body">
        <p class="cookie-banner__title">We use cookies</p>
        <p class="cookie-banner__text">
          We use strictly necessary cookies to make our website work. With your consent, we may also use
          optional cookies to improve your experience. You can accept all, reject all, or choose which
          ones to allow. Read our <a href="cookies.html">Cookie Policy</a>.
        </p>
      </div>
      <div class="cookie-banner__actions">
        <button type="button" class="cookie-banner__customize" data-cookie-action="customize">Customize</button>
        <button type="button" class="btn btn--ghost btn--small" data-cookie-action="reject">Reject All</button>
        <button type="button" class="btn btn--primary btn--small" data-cookie-action="accept">Accept All</button>
      </div>`;
    banner.querySelector('[data-cookie-action="accept"]').addEventListener('click', acceptAll);
    banner.querySelector('[data-cookie-action="reject"]').addEventListener('click', rejectAll);
    banner.querySelector('[data-cookie-action="customize"]').addEventListener('click', openModal);
    document.body.appendChild(banner);
  }

  function showBanner() {
    if (!banner) buildBanner();
    banner.hidden = false;
    void banner.offsetHeight; // flush layout so the fade-in transition runs
    banner.classList.add('cookie-banner--visible');
  }

  function hideBanner() {
    if (!banner || banner.hidden) return;
    banner.classList.remove('cookie-banner--visible');
    setTimeout(() => { banner.hidden = true; }, 300);
  }

  /* ─── Preferences modal ─── */
  function buildModal() {
    modal = document.createElement('div');
    modal.className = 'cookie-modal';
    modal.hidden = true;
    const rows = CATEGORIES.map(cat => `
      <div class="cookie-category">
        <div class="cookie-category__head">
          <label class="cookie-category__name" ${cat.locked ? '' : `for="cookie-cat-${cat.id}"`}>${cat.name}</label>
          ${cat.locked
            ? '<span class="cookie-category__always">Always active</span>'
            : `<span class="cookie-switch">
                 <input type="checkbox" role="switch" id="cookie-cat-${cat.id}" data-cookie-category="${cat.id}"
                        aria-describedby="cookie-desc-${cat.id}">
                 <span class="cookie-switch__track" aria-hidden="true"></span>
               </span>`}
        </div>
        <p class="cookie-category__desc" id="cookie-desc-${cat.id}">${cat.description}</p>
      </div>`).join('');
    modal.innerHTML = `
      <div class="cookie-modal__overlay" data-cookie-close></div>
      <div class="cookie-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
        <div class="cookie-modal__header">
          <h2 class="cookie-modal__title" id="cookie-modal-title">Cookie preferences</h2>
          <button type="button" class="cookie-modal__close" aria-label="Close cookie preferences" data-cookie-close>&times;</button>
        </div>
        <p class="cookie-modal__intro">
          Choose which cookies you allow. Strictly necessary cookies are always on because the website
          needs them to work. You can change your choice at any time from <strong>Cookie Settings</strong>
          in the footer. Learn more in our <a href="cookies.html">Cookie Policy</a>.
        </p>
        <div class="cookie-modal__list">${rows}</div>
        <div class="cookie-modal__actions">
          <button type="button" class="btn btn--ghost btn--small" data-cookie-action="reject">Reject All</button>
          <button type="button" class="btn btn--ghost btn--small" data-cookie-action="save">Save Preferences</button>
          <button type="button" class="btn btn--primary btn--small" data-cookie-action="accept">Accept All</button>
        </div>
      </div>`;

    modal.querySelectorAll('[data-cookie-close]').forEach(el => el.addEventListener('click', closeModal));
    modal.querySelector('[data-cookie-action="accept"]').addEventListener('click', acceptAll);
    modal.querySelector('[data-cookie-action="reject"]').addEventListener('click', rejectAll);
    modal.querySelector('[data-cookie-action="save"]').addEventListener('click', () => {
      const choices = {};
      modal.querySelectorAll('[data-cookie-category]').forEach(input => {
        choices[input.dataset.cookieCategory] = input.checked;
      });
      save(choices);
    });
    modal.addEventListener('keydown', trapFocus);
    document.body.appendChild(modal);
  }

  function trapFocus(e) {
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key !== 'Tab') return;
    const focusable = [...modal.querySelectorAll('button, input, a[href]')].filter(el => !el.disabled);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function openModal() {
    if (!modal) buildModal();
    const prefs = read();
    modal.querySelectorAll('[data-cookie-category]').forEach(input => {
      input.checked = Boolean(prefs && prefs[input.dataset.cookieCategory]);
    });
    lastFocused = document.activeElement;
    modal.hidden = false;
    void modal.offsetHeight;
    modal.classList.add('cookie-modal--open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.cookie-modal__close').focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.classList.remove('cookie-modal--open');
    document.body.style.overflow = '';
    setTimeout(() => { modal.hidden = true; }, 200);
    if (lastFocused && document.contains(lastFocused) && !banner?.contains(lastFocused)) lastFocused.focus();
    else if (banner && !banner.hidden) banner.querySelector('[data-cookie-action="accept"]')?.focus();
  }

  function init() {
    const prefs = read();
    if (prefs) loadAllowedScripts(prefs);
    else showBanner();

    document.querySelectorAll('[data-cookie-settings]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });
  }

  init();
  return {
    get: read,
    allows: category => Boolean(read()?.[category]),
    openPreferences: openModal,
  };
})();
window.VoiceGabConsent = VoiceGabConsent;

/**
 * PETER HEPHZIBAH — MINIMALIST BLACK & WHITE PORTFOLIO
 * Features: Text Pull-Up Animations, Contact Dud Transceiver, Case Study Modals
 */

// ==========================================================================
// 1. TEXT PULL-UP ANIMATION SYSTEM
// ==========================================================================
function initTextPullUp() {
  // Trigger Hero pull-up on DOM load
  const heroGroup = document.querySelector('.hero-pull-up-group');
  if (heroGroup) {
    setTimeout(() => {
      heroGroup.classList.add('is-revealed');
    }, 100);
  }

  // IntersectionObserver for scroll-triggered pull-ups
  const scrollPullUps = document.querySelectorAll('.scroll-pull-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  scrollPullUps.forEach(el => observer.observe(el));
}

// ==========================================================================
// 2. CONTACT DUD TRANSCEIVER & TOAST
// ==========================================================================
function initContactDuds() {
  const dudLinks = document.querySelectorAll('[data-dud="true"]');
  const toast = document.getElementById('dud-toast');
  const toastPlatform = document.getElementById('toast-platform');
  const toastSnippet = document.getElementById('toast-snippet');
  const toastClose = document.getElementById('toast-close');
  const toastCopyBtn = document.getElementById('toast-copy-btn');
  let toastTimer = null;

  dudLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const platform = link.getAttribute('data-platform') || 'Platform';
      const sampleUrl = link.getAttribute('data-sample') || `https://${platform.toLowerCase().replace(/\s+/g, '')}.com/peterhephzibah`;

      if (toastPlatform) toastPlatform.textContent = platform;
      if (toastSnippet) {
        toastSnippet.textContent = `href="${sampleUrl}"`;
        toastSnippet.setAttribute('data-copy-val', sampleUrl);
      }

      if (toast) {
        toast.classList.remove('hidden');
        void toast.offsetWidth;
        toast.classList.add('toast-show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.classList.remove('toast-show');
          setTimeout(() => toast.classList.add('hidden'), 350);
        }, 6000);
      }
    });
  });

  if (toastClose && toast) {
    toastClose.addEventListener('click', () => {
      toast.classList.remove('toast-show');
      clearTimeout(toastTimer);
      setTimeout(() => toast.classList.add('hidden'), 350);
    });
  }

  if (toastCopyBtn && toastSnippet) {
    toastCopyBtn.addEventListener('click', () => {
      const val = toastSnippet.getAttribute('data-copy-val') || toastSnippet.textContent;
      navigator.clipboard.writeText(val).then(() => {
        const orig = toastCopyBtn.textContent;
        toastCopyBtn.textContent = 'COPIED';
        setTimeout(() => {
          toastCopyBtn.textContent = orig;
        }, 2000);
      });
    });
  }
}

// ==========================================================================
// 3. CASE STUDY DATA & MODAL SYSTEM
// ==========================================================================
const caseStudies = [
  {
    id: 'aether',
    title: 'Aether Automotive',
    category: 'Autonomous EV Mobility · Visual Identity',
    year: '2026',
    challenge: 'Developing a cohesive visual architecture for a next-generation electric vehicle manufacturer positioning against legacy automotive houses.',
    solution: 'Designed a dynamic variable geometric mark with high-contrast monochrome guidelines, vehicle badging system, and dashboard typography specifications.',
    deliverables: ['Global Brand System', 'Vehicle Emblem Architecture', 'Interface Guidelines', 'Typography Spec']
  },
  {
    id: 'valence',
    title: 'Valence Synthetics',
    category: 'Bio-Computing · Identity Architecture',
    year: '2025',
    challenge: 'Translating deep algorithmic biology research into an institutional visual identity capable of commanding tier-one venture capital.',
    solution: 'Built a systematic identity based on mathematical layout grids, monochromatic technical documentation, and structural letterforms.',
    deliverables: ['Brand Manifesto', 'Corporate Identity Guidelines', 'Scientific Collateral', 'Digital Portal']
  },
  {
    id: 'kroma',
    title: 'Kroma Parfumerie',
    category: 'Luxury Fragrance · Packaging System',
    year: '2024',
    challenge: 'Creating a modern, timeless packaging identity for a Parisian haute parfumerie seeking physical tactile unboxing elegance.',
    solution: 'Engineered solid optical glass bottles with laser-etched typography, accompanied by blind-debossed heavyweight cotton paper boxes.',
    deliverables: ['Structural Packaging', 'Typography Specification', 'Print Production Architecture', 'Brand Book']
  },
  {
    id: 'nexus',
    title: 'Nexus Protocol',
    category: 'Fintech Infrastructure · Visual Identity',
    year: '2024',
    challenge: 'Designing an institutional-grade brand language for high-speed cryptographic settlement infrastructure.',
    solution: 'Engineered an uncompromising brutalist-minimalist brand system featuring high-density grid structures and razor-sharp typographic alignment.',
    deliverables: ['Protocol Identity System', 'Documentation Design Language', 'Global Spatial Branding']
  }
];

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalTriggers = document.querySelectorAll('[data-project-id]');

  if (!modal) return;

  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalYear = document.getElementById('modal-year');
  const modalChallenge = document.getElementById('modal-challenge');
  const modalSolution = document.getElementById('modal-solution');
  const modalDeliverables = document.getElementById('modal-deliverables');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const id = trigger.getAttribute('data-project-id');
      const project = caseStudies.find(p => p.id === id);
      if (!project) return;

      if (modalTitle) modalTitle.textContent = project.title;
      if (modalCategory) modalCategory.textContent = project.category;
      if (modalYear) modalYear.textContent = project.year;
      if (modalChallenge) modalChallenge.textContent = project.challenge;
      if (modalSolution) modalSolution.textContent = project.solution;

      if (modalDeliverables) {
        modalDeliverables.innerHTML = project.deliverables
          .map(d => `<span class="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300">${d}</span>`)
          .join('');
      }

      modal.classList.remove('hidden');
      void modal.offsetWidth;
      modal.classList.add('modal-active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('modal-active');
    setTimeout(() => modal.classList.add('hidden'), 300);
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal-active')) {
      closeModal();
    }
  });
}

// ==========================================================================
// 4. SUBTLE CURSOR DOT
// ==========================================================================
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor');
  if (!dot) return;

  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    dot.style.display = 'none';
    return;
  }

  window.addEventListener('mousemove', (e) => {
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}

// ==========================================================================
// 5. INQUIRY FORM FEEDBACK
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('transmission-form');
  const successNotice = document.getElementById('transmission-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (successNotice) {
      successNotice.classList.remove('hidden');
      form.reset();
      setTimeout(() => {
        successNotice.classList.add('hidden');
      }, 5000);
    }
  });
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTextPullUp();
  initContactDuds();
  initProjectModal();
  initCustomCursor();
  initContactForm();
});

/**
 * PETER HEPHZIBAH — MINIMALIST BLACK & WHITE PORTFOLIO
 * Integrated with Real Portfolio Assets: QORV, Dmflux, Deploy
 */

// ==========================================================================
// 1. TEXT PULL-UP ANIMATION SYSTEM
// ==========================================================================
function initTextPullUp() {
  const heroGroup = document.querySelector('.hero-pull-up-group');
  if (heroGroup) {
    setTimeout(() => {
      heroGroup.classList.add('is-revealed');
    }, 100);
  }

  const scrollElements = document.querySelectorAll('.scroll-pull-up, .scroll-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  scrollElements.forEach(el => observer.observe(el));
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
// 3. REAL CASE STUDIES DATA (QORV, DMFLUX, DEPLOY)
// ==========================================================================
const caseStudies = [
  {
    id: 'qorv',
    title: 'QORV',
    category: 'Brand Identity Architecture · 2026',
    year: '2026',
    pageUrl: 'qorv.html',
    mainImage: 'assets/qorv/qovinsta13.png',
    tagline: '"Visibility that drives growth. Scale strategically." Comprehensive brand identity system built on mathematical clearspace, Google Sans typography, and physical touchpoints.',
    deliverables: ['Primary 3D Emblem & Mark', 'Logomark Geometry', 'Logo Clearspace Specs', 'Google Sans Typography Specs', 'Color Palette Architecture', 'Subway & Transit Billboards', 'Apparel & Security Mockups', 'Tablet Platform UI', 'Social Media Templates'],
    gallery: [
      { src: 'assets/qorv/qovinsta13.png', title: 'Main 3D Metallic Emblem & Wordmark' },
      { src: 'assets/qorv/qovinsta4 - Copy.png', title: 'Primary Logo Construction' },
      { src: 'assets/qorv/qovinsta5 - Copy.png', title: 'Logomark Grid & Angles' },
      { src: 'assets/qorv/qovinsta6 - Copy.png', title: 'Logo Clearspace Requirements' },
      { src: 'assets/qorv/qovinsta2 - Copy.png', title: 'Color Palette Architecture' },
      { src: 'assets/qorv/qovinsta - Copy.png', title: 'Primary Typeface (Google Sans)' },
      { src: 'assets/qorv/qovinsta3 - Copy.png', title: 'Typography Hierarchy Spec' },
      { src: 'assets/qorv/qovinsta10.png', title: 'Outdoor Brand Billboards' },
      { src: 'assets/qorv/qovinsta8.png', title: 'Website Platform UI' },
      { src: 'assets/qorv/qovinsta9.png', title: 'Brand Mockups & Physical Merch' },
      { src: 'assets/qorv/qovinsta7.png', title: 'Brand Spatial Imagery' },
      { src: 'assets/qorv/qovinsta11.png', title: 'Social Media Branding (@qorv_ltd)' },
      { src: 'assets/qorv/qovinsta12.png', title: 'Social Media Template Matrix' }
    ]
  },
  {
    id: 'dmflux',
    title: 'Dmflux',
    category: 'Product & Campaign Architecture · 2025',
    year: '2025',
    pageUrl: 'dmflux.html',
    mainImage: 'assets/dmflux/dmfluxsoc.png',
    tagline: '"Understand unique and returning visitors. Track, Analyze, Convert." 3D optical glass bubble mark, platform conversion UI, and widespread transit billboard campaigns.',
    deliverables: ['3D Optical Glass Emblem', 'Symbol Grid Alignment', 'Auditorium Keynote Billboard', 'Lagos Outdoor Transit Launch', 'Color Palette System', 'Mobile Stories & UI Flow', 'Conversion Social Assets', 'Environmental Mockups'],
    gallery: [
      { src: 'assets/dmflux/dmfluxsoc.png', title: 'Main 3D Optical Glass Bubble Mark' },
      { src: 'assets/dmflux/dmfluxsoc3.png', title: 'Auditorium Stage Billboard Display' },
      { src: 'assets/dmflux/dmfluxsoc15.png', title: 'Lagos Street Billboard Launch' },
      { src: 'assets/dmflux/dmfluxsoc2.png', title: 'Logo Grid Construction' },
      { src: 'assets/dmflux/dmfluxsoc10.png', title: 'Color Palette Specifications' },
      { src: 'assets/dmflux/dmfluxsoc6.png', title: 'Track · Analyze · Convert' },
      { src: 'assets/dmflux/dmfluxsoc12.png', title: 'Mobile Experience Story' },
      { src: 'assets/dmflux/dmfluxsoc16.png', title: 'Transit Billboard Touchpoint' },
      { src: 'assets/dmflux/dmfluxsoc18.png', title: 'Campaign Receipt Visual' },
      { src: 'assets/dmflux/dmfluxsoc20.png', title: 'Digital Social Asset' },
      { src: 'assets/dmflux/dmfluxsoc24.png', title: 'Large Scale Environmental Mockup' },
      { src: 'assets/dmflux/dmfluxsoc8.png', title: 'Campaign Architecture Suite' }
    ]
  },
  {
    id: 'deploy',
    title: 'Deploy',
    category: 'Cloud Infrastructure & Hardware · 2026',
    year: '2025 – 2026',
    pageUrl: 'deploy.html',
    mainImage: 'assets/Deploy/deploy_sm2.png',
    tagline: '"Ship your ideas. Not your time." High-luminescence laser green brand system, glowing physical hardware emblems, and streamlined cloud deployment interfaces.',
    deliverables: ['Primary Brand Mark & Slogan', 'App Icon & Fluid Waveform', 'Laser Green Palette Architecture', 'Physical Glowing Hardware Device', 'Performance Metric Badges', 'Spatial Brand Visuals', 'Developer Portal UI', 'Social Marketing Suite'],
    gallery: [
      { src: 'assets/Deploy/deploy_sm2.png', title: 'Primary Brand Mark ("Ship your ideas. Not your time.")' },
      { src: 'assets/Deploy/deploy_sm.png', title: 'App Icon & Fluid Vertical Waveform' },
      { src: 'assets/Deploy/deploy_sm4.png', title: 'Glowing Physical Device in Hand' },
      { src: 'assets/Deploy/deploy_sm3.png', title: 'Color Palette Architecture' },
      { src: 'assets/Deploy/deploy_sm15.png', title: 'Performance Metrics Badges' },
      { src: 'assets/Deploy/deploy_sm6.png', title: 'Cybernetic Spatial Visual' },
      { src: 'assets/Deploy/deploy_sm13.png', title: 'Developer Portal Architecture' },
      { src: 'assets/Deploy/deploy_sm9.png', title: 'Product Interface Spec' },
      { src: 'assets/Deploy/deploy_sm10.png', title: 'Social Marketing Display' },
      { src: 'assets/Deploy/deploy_sm12.png', title: 'Social Grid Suite' }
    ]
  },
  {
    id: 'social-media-designs',
    title: 'Social media designs',
    category: 'High-Impact Social Systems · 2024–2026',
    year: '2024 – 2026',
    pageUrl: 'social-media-designs.html',
    mainImage: 'assets/Social media designs/qorv smds.png',
    tagline: '"Stop chasing customers. Build demand instead." Strategic high-conversion carousels, 3D futuristic product visuals, key announcement graphics, and systematic social media frameworks.',
    deliverables: [
      '3D Futuristic Key Visuals',
      'AI & Tech Launch Drops',
      'Project Amplify Carousels',
      'LinkedIn & IG Leadership Slides',
      'Conversion Receipt Visuals',
      'Visitor Intelligence Assets',
      'Performance Metric Graphics',
      'Growth & Engagement Creatives'
    ],
    gallery: [
      { src: 'assets/Social media designs/qorv smds.png', title: 'Main Display: 3D Growth Architecture' },
      { src: 'assets/Social media designs/CHATATP7.png', title: 'ChatATP: Studio is LIVE (Cyborg Astronaut)' },
      { src: 'assets/Social media designs/CHATATP8.png', title: 'ChatATP: A New Season To Build Smarter' },
      { src: 'assets/Social media designs/CHATATP9.png', title: 'Gurulabs is Cooking! (Bionic Lab Visual)' },
      { src: 'assets/Social media designs/qorv carousel 11.png', title: 'Project Amplify: QORV x TAS Strategic Alliance' },
      { src: 'assets/Social media designs/qorv carousel 12.png', title: 'QORV Value Proposition & Scale Slide' },
      { src: 'assets/Social media designs/qorv carousel 13 [3].png', title: 'QORV Call-to-Scale Slide' },
      { src: 'assets/Social media designs/dmfluxsoc18.png', title: 'Dmflux Campaign Receipt Graphic' },
      { src: 'assets/Social media designs/dmfluxsoc19.png', title: 'Dmflux Conversion UI & Analytics' },
      { src: 'assets/Social media designs/dmfluxsoc20.png', title: 'Dmflux Visitor Intelligence Spec' },
      { src: 'assets/Social media designs/dmfluxsoc22.png', title: 'Dmflux Performance Metric Graphic' },
      { src: 'assets/Social media designs/dmfluxsoc23.png', title: 'Dmflux Product Experience Graphic' },
      { src: 'assets/Social media designs/dmfluxsoc25.png', title: 'Dmflux Brand Value Statement' },
      { src: 'assets/Social media designs/dmfluxsoc26.png', title: 'Dmflux Growth & Engagement Creative' }
    ]
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
  const modalTagline = document.getElementById('modal-tagline');
  const modalMainImg = document.getElementById('modal-main-img');
  const modalGalleryGrid = document.getElementById('modal-gallery-grid');
  const modalDeliverables = document.getElementById('modal-deliverables');
  const modalFullLink = document.getElementById('modal-full-link');
  const modalBottomLink = document.getElementById('modal-bottom-link');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // If clicking directly on an anchor to another page, let it navigate
      if (trigger.tagName === 'A' && trigger.getAttribute('href') && trigger.getAttribute('href') !== '#') {
        return;
      }
      e.preventDefault();

      const id = trigger.getAttribute('data-project-id');
      const project = caseStudies.find(p => p.id === id);
      if (!project) return;

      if (modalTitle) modalTitle.textContent = project.title;
      if (modalCategory) modalCategory.textContent = project.category;
      if (modalYear) modalYear.textContent = project.year;
      if (modalTagline) modalTagline.textContent = project.tagline;
      if (modalMainImg) {
        modalMainImg.src = project.mainImage;
        modalMainImg.alt = project.title;
      }
      if (modalFullLink) modalFullLink.href = project.pageUrl;
      if (modalBottomLink) modalBottomLink.href = project.pageUrl;

      // Populate Deliverables
      if (modalDeliverables) {
        modalDeliverables.innerHTML = project.deliverables
          .map(d => `<span class="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300">✦ ${d}</span>`)
          .join('');
      }

      // Populate Gallery Grid
      if (modalGalleryGrid && project.gallery) {
        modalGalleryGrid.innerHTML = project.gallery
          .map((item, idx) => `
            <div class="relative group/thumb rounded-lg overflow-hidden bg-black border border-zinc-800 hover:border-white transition-colors cursor-pointer aspect-video" onclick="document.getElementById('modal-main-img').src='${item.src}'; document.getElementById('modal-main-img').scrollIntoView({behavior:'smooth', block:'center'});">
              <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300">
              <div class="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                <span class="text-[9px] text-white font-mono leading-tight">${item.title}</span>
              </div>
            </div>
          `)
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
// 5. INQUIRY FORM FORMSPREE INTEGRATION
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('transmission-form');
  const successNotice = document.getElementById('transmission-success');
  const errorNotice = document.getElementById('transmission-error');
  const submitBtn = document.getElementById('form-submit-btn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalBtnText = submitBtn ? submitBtn.textContent : 'Send Inquiry →';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      submitBtn.classList.add('opacity-75');
    }

    if (errorNotice) errorNotice.classList.add('hidden');
    if (successNotice) successNotice.classList.add('hidden');

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action || 'https://formspree.io/f/xwlozrld', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        if (successNotice) {
          successNotice.classList.remove('hidden');
        }
        form.reset();
        if (submitBtn) {
          submitBtn.textContent = 'Sent ✓';
          setTimeout(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-75');
          }, 4000);
        }
      } else {
        const data = await response.json().catch(() => ({}));
        if (errorNotice) {
          if (data && data.errors && data.errors.length > 0) {
            errorNotice.textContent = data.errors.map(err => err.message).join(', ');
          } else {
            errorNotice.textContent = 'Unable to submit inquiry. Please reach out directly on WhatsApp or Email.';
          }
          errorNotice.classList.remove('hidden');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
          submitBtn.classList.remove('opacity-75');
        }
      }
    } catch (err) {
      if (errorNotice) {
        errorNotice.textContent = 'Unable to submit inquiry. Please reach out directly on WhatsApp or Email.';
        errorNotice.classList.remove('hidden');
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.classList.remove('opacity-75');
      }
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

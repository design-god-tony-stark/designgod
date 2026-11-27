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
// 3. REAL CASE STUDIES DATA (QORV, DMFLUX, DEPLOY, SOCIAL MEDIA DESIGNS)
// ==========================================================================
const caseStudies = [
  {
    id: 'qorv',
    title: 'QORV',
    category: 'Brand Identity Architecture · 2026',
    year: '2026',
    pageUrl: 'qorv.html',
    mainImage: 'assets/Qorv/qorv-opt.png',
    tagline: '"Building businesses that scale." Comprehensive brand identity system built on mathematical clearspace, Google Sans typography, outdoor billboards, and executive digital touchpoints.',
    deliverables: ['Rim-Lit Hero Emblem', 'Primary Logo Presentation', 'Logomark Palette Grid', 'Logo Clearspace Specs', 'Google Sans Typography Specs', 'Color Palette Architecture', 'Subway & Street Billboards', 'Tablet Platform UI', 'Physical Merch & Mockups'],
    gallery: [
      { src: 'assets/Qorv/qorv-opt.png', title: 'Primary Display: Rim-Lit Silhouette & QORV Mark' },
      { src: 'assets/Qorv/qorv-opt2.png', title: '3D Glass Ribbon Brand Visual' },
      { src: 'assets/Qorv/qorv-opt3.png', title: 'Building Businesses That Scale (qorv.org)' },
      { src: 'assets/Qorv/qorv-opt4.png', title: 'Primary Logo Presentation' },
      { src: 'assets/Qorv/qorv-opt5.png', title: 'Logomark Palette & Modular Variants' },
      { src: 'assets/Qorv/qorv-opt6.png', title: 'Logo Clearspace & Safe-Zone Geometry' },
      { src: 'assets/Qorv/qorv-opt7.png', title: 'Primary Typeface (Google Sans)' },
      { src: 'assets/Qorv/qorv-opt8.png', title: 'Typography Hierarchy Spec' },
      { src: 'assets/Qorv/qorv-opt9.png', title: 'Brand Colour Palette Architecture' },
      { src: 'assets/Qorv/qorv-opt10.png', title: 'Executive Brand Spatial Imagery' },
      { src: 'assets/Qorv/qorv-opt11.png', title: 'Website Platform UI (qorv.org)' },
      { src: 'assets/Qorv/qorv-opt12.png', title: 'Physical Mockups & Apparel Merch' },
      { src: 'assets/Qorv/qorv-opt13.png', title: 'Out-of-Home Brand Billboards' }
    ]
  },
  {
    id: 'dmflux',
    title: 'Dmflux',
    category: 'Product & Campaign Architecture · 2025',
    year: '2025',
    pageUrl: 'dmflux.html',
    mainImage: 'assets/Dmflux/dmflux-opt.png',
    tagline: '"Understand unique and returning visitors. Track, Analyze, Convert." 3D optical glass speech-bubble mark, keynote display architecture, wearable companions, and outdoor transit campaigns.',
    deliverables: ['3D Optical Glass Emblem', 'Logo Grid Construction', 'Keynote Stage Displays', 'Poppins Typography System', 'Emerald Color Specs', 'Smartwatch & iOS UI', 'City Transit Billboards', 'Physical Apparel & Tote Merch'],
    gallery: [
      { src: 'assets/Dmflux/dmflux-opt.png', title: 'Main 3D Optical Glass Symbol & Wordmark' },
      { src: 'assets/Dmflux/dmflux-opt2.png', title: 'Logomark Grid & Proportional Alignment' },
      { src: 'assets/Dmflux/dmflux-opt3.png', title: 'Keynote Stage Display ("Understand unique & returning visitors")' },
      { src: 'assets/Dmflux/dmflux-opt4.png', title: 'WhatsApp & Telegram Traffic Keynote' },
      { src: 'assets/Dmflux/dmflux-opt5.png', title: 'Track · Analyze · Convert Core Visual' },
      { src: 'assets/Dmflux/dmflux-opt6.png', title: 'Mobile Experience Story ("Leads tracked, while you work.")' },
      { src: 'assets/Dmflux/dmflux-opt7.png', title: 'Primary Typeface (Poppins)' },
      { src: 'assets/Dmflux/dmflux-opt8.png', title: 'Color Palette Specifications' },
      { src: 'assets/Dmflux/dmflux-opt9.png', title: 'Wearable Metrics Companion (Smartwatch UI)' },
      { src: 'assets/Dmflux/dmflux-opt10.png', title: 'iOS Home Screen App Integration' },
      { src: 'assets/Dmflux/dmflux-opt11.png', title: 'Branded Merchandise (Beanie & Bottle)' },
      { src: 'assets/Dmflux/dmflux-opt12.png', title: 'Verified Social Profile (@dmflux.app)' },
      { src: 'assets/Dmflux/dmflux-opt13.png', title: 'City Transit Campaign Receipt Billboard' },
      { src: 'assets/Dmflux/dmflux-opt14.png', title: 'Outdoor Transit Shelter Campaign' },
      { src: 'assets/Dmflux/dmflux-opt15.png', title: 'Brand Tote Merchandise ("Know what\'s working.")' }
    ]
  },
  {
    id: 'deploy',
    title: 'Deploy',
    category: 'Cloud Infrastructure & Hardware · 2026',
    year: '2025 – 2026',
    pageUrl: 'deploy.html',
    mainImage: 'assets/Deploy/deploy-opt2.png',
    tagline: '"Ship your ideas. Not your time." High-luminescence laser green brand system, glowing glass hardware emblems, Space Grotesk typography, and streamlined wearable/developer UI.',
    deliverables: ['Primary Brand Mark & Slogan', 'App Icon & Fluted Waveform', 'Laser Green Palette Architecture', 'Space Grotesk Font Spec', 'Glowing Glass Hardware Emblem', 'Apple Watch & iOS UI', 'Developer Swag & Pins', 'Physical Apparel'],
    gallery: [
      { src: 'assets/Deploy/deploy-opt2.png', title: 'Primary Brand Mark ("Ship your ideas. Not your time.")' },
      { src: 'assets/Deploy/deploy-opt.png', title: 'App Icon & Fluted Laser Green Waveform' },
      { src: 'assets/Deploy/deploy-opt4.png', title: 'Glowing Glass Emblem Hardware in Hand' },
      { src: 'assets/Deploy/deploy-opt3.png', title: 'Laser Green Palette Architecture' },
      { src: 'assets/Deploy/deploy-opt6.png', title: 'Primary Typography Specification (Space Grotesk)' },
      { src: 'assets/Deploy/deploy-opt5.png', title: 'Physical Apparel ("DEPLOY — SHIP WITH LIGHT SPEED")' },
      { src: 'assets/Deploy/deploy-opt7.png', title: 'App Ecosystem Placement' },
      { src: 'assets/Deploy/deploy-opt8.png', title: 'iOS Home Screen Integration' },
      { src: 'assets/Deploy/deploy-opt9.png', title: 'Apple Watch Deployment Status UI' },
      { src: 'assets/Deploy/deploy-opt10.png', title: 'Performance Display ("5x faster deployment")' },
      { src: 'assets/Deploy/deploy-opt13.png', title: 'Developer Enamel Pin Badges' },
      { src: 'assets/Deploy/deploy-opt14.png', title: 'Developer Workstation Stickers' },
      { src: 'assets/Deploy/deploy-opt15.png', title: 'Spatial Mineral Brand Texture' }
    ]
  },
  {
    id: 'social-media-designs',
    title: 'Social media designs',
    category: 'High-Impact Social Systems · 2024–2026',
    year: '2024 – 2026',
    pageUrl: 'social-media-designs.html',
    mainImage: 'assets/Social media designs/smd-opt3.png',
    tagline: '"Stop chasing customers. Build demand instead." Strategic high-conversion creatives, 3D futuristic AI announcements, QORV x TAS collaborations, and Dmflux performance marketing assets.',
    deliverables: [
      '3D Futuristic AI Visuals',
      'QORV 3D Growth Graphics',
      'Project Amplify (QORV x TAS)',
      'Digital Authority Creatives',
      'WhatsApp Influencer Drops',
      '3D Trophy & Reward Campaigns',
      'E-Book Launch Visuals',
      'High-Conversion Flyers'
    ],
    gallery: [
      { src: 'assets/Social media designs/smd-opt3.png', title: 'QORV 3D Glass Growth Graphic ("Build demand instead")' },
      { src: 'assets/Social media designs/smd-opt10.png', title: 'ChatATP Studio is LIVE (Cyborg Astronaut)' },
      { src: 'assets/Social media designs/smd-opt13.png', title: 'ChatATP: A New Season To Build Smarter' },
      { src: 'assets/Social media designs/smd-opt12.png', title: 'Gurulabs is Cooking! (Bionic Lab Visual)' },
      { src: 'assets/Social media designs/smd-opt2.png', title: 'Project Amplify: QORV x TAS Bionic Fist Bump' },
      { src: 'assets/Social media designs/smd-opt9.png', title: 'QORV x TAS ("Two strengths, One shared goal.")' },
      { src: 'assets/Social media designs/smd-opt7.png', title: 'QORV Digital Authority ("They\'ll look you up.")' },
      { src: 'assets/Social media designs/smd-opt.png', title: 'Dmflux 3 Free E-Books Drop' },
      { src: 'assets/Social media designs/smd-opt4.png', title: 'Dmflux WhatsApp Influencer Pro Launch' },
      { src: 'assets/Social media designs/smd-opt5.png', title: 'Dmflux Audience Opportunity Asset' },
      { src: 'assets/Social media designs/smd-opt6.png', title: 'Dmflux Tournament Guide Card' },
      { src: 'assets/Social media designs/smd-opt8.png', title: 'Dmflux ₦200,000 Reward Pool Display' },
      { src: 'assets/Social media designs/smd-opt11.png', title: 'Dmflux 2027 WhatsApp Influencer Programme Flyer' },
      { src: 'assets/Social media designs/smd-opt14.png', title: 'Dmflux ProofOverHype 3D Glass Trophy' }
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
// 6. 4-PART LAYERED SCROLL SHOWCASE (SLIDE-UP LAYERS ON SCROLL)
// ==========================================================================
function initScrollLayerGrid() {
  const slots = document.querySelectorAll('.scroll-layer-slot');
  if (!slots.length) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let ticking = false;

  function updateLayers() {
    ticking = false;
    const vh = window.innerHeight || document.documentElement.clientHeight;

    slots.forEach((slot) => {
      const rect = slot.getBoundingClientRect();
      const slotIndex = parseInt(slot.getAttribute('data-slot-index') || '0', 10);
      const stagger = slotIndex * 0.035;

      // Normalize progress [0..1] as the card moves from bottom 90% to top 8% of viewport
      const raw = (vh * 0.90 - rect.top) / (vh * 0.82);
      const progress = Math.max(0, Math.min(1, raw));

      const layer2 = slot.querySelector('.scroll-layer-slide[data-layer="2"]');
      const layer3 = slot.querySelector('.scroll-layer-slide[data-layer="3"]');

      if (layer2) {
        const p2 = Math.max(0, Math.min(1, (progress - (0.08 + stagger)) / 0.34));
        const y2 = (1 - p2) * 100;
        layer2.style.transform = `translate3d(0, ${y2.toFixed(2)}%, 0)`;
      }

      if (layer3) {
        const p3 = Math.max(0, Math.min(1, (progress - (0.48 + stagger)) / 0.34));
        const y3 = (1 - p3) * 100;
        layer3.style.transform = `translate3d(0, ${y3.toFixed(2)}%, 0)`;
      }
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateLayers);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateLayers();
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTextPullUp();
  initScrollLayerGrid();
  initContactDuds();
  initProjectModal();
  initCustomCursor();
  initContactForm();
});

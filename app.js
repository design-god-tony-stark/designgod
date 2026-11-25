/**
 * PETER HEPHZIBAH — MINIMALISTIC FUTURISTIC LIQUID GLASS PORTFOLIO
 * Core Script: Liquid Background Canvas, Text Pull-Up Engine, Audio Synthesizer & Contact Dud Transceiver
 */

// ==========================================================================
// 1. SOUND SYNTHESIS ENGINE (Web Audio API - Zero External Dependencies)
// ==========================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playLiquidChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Liquid frequency sweep
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(1240, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.28);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.32);
    } catch (e) {
      // Audio context may be restricted
    }
  }

  playTactileClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.055);
    } catch (e) {
      // Ignore
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

const soundEngine = new SoundEngine();

// ==========================================================================
// 2. INTERACTIVE LIQUID GLASS CANVAS (Metaballs & Fluid Dispersion)
// ==========================================================================
class LiquidCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mouse = { x: this.width / 2, y: this.height / 2, targetX: this.width / 2, targetY: this.height / 2 };
    
    // Dynamic liquid orbs
    this.orbs = [
      { x: this.width * 0.25, y: this.height * 0.3, radius: 260, vx: 0.4, vy: 0.3, color: 'rgba(0, 240, 255, 0.08)' },
      { x: this.width * 0.75, y: this.height * 0.4, radius: 320, vx: -0.3, vy: 0.5, color: 'rgba(110, 86, 207, 0.09)' },
      { x: this.width * 0.5, y: this.height * 0.7, radius: 280, vx: 0.5, vy: -0.4, color: 'rgba(0, 255, 178, 0.06)' },
      { x: this.width * 0.8, y: this.height * 0.85, radius: 240, vx: -0.4, vy: -0.3, color: 'rgba(56, 189, 248, 0.07)' }
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
    });

    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  animate() {
    // Smooth mouse lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Render each liquid fluid orb
    this.orbs.forEach((orb, i) => {
      orb.x += orb.vx;
      orb.y += orb.vy;

      // Bounce gracefully on bounds
      if (orb.x < -100 || orb.x > this.width + 100) orb.vx *= -1;
      if (orb.y < -100 || orb.y > this.height + 100) orb.vy *= -1;

      // Subtle interaction with mouse
      const dx = this.mouse.x - orb.x;
      const dy = this.mouse.y - orb.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 400) {
        orb.x += (dx / dist) * 0.4;
        orb.y += (dy / dist) * 0.4;
      }

      const grad = this.ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
      grad.addColorStop(0, orb.color);
      grad.addColorStop(0.5, orb.color.replace(/[\d\.]+\)$/, '0.03)'));
      grad.addColorStop(1, 'transparent');

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// ==========================================================================
// 3. TEXT PULL-UP ANIMATION SYSTEM
// ==========================================================================
function initTextPullUp() {
  // Trigger Hero pull-up on DOM load
  const heroGroup = document.querySelector('.hero-pull-up-group');
  if (heroGroup) {
    setTimeout(() => {
      heroGroup.classList.add('is-revealed');
    }, 150);
  }

  // IntersectionObserver for scroll-triggered pull-ups
  const scrollPullUps = document.querySelectorAll('.scroll-pull-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Optional: unobserve once revealed for performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  scrollPullUps.forEach(el => observer.observe(el));
}

// ==========================================================================
// 4. CONTACT DUD TRANSCEIVER & TOAST NOTIFICATION
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
      soundEngine.init();
      soundEngine.playLiquidChime();

      const platform = link.getAttribute('data-platform') || 'Platform';
      const sampleUrl = link.getAttribute('data-sample') || `https://${platform.toLowerCase().replace(/\s+/g, '')}.com/peterhephzibah`;

      // Update toast UI
      if (toastPlatform) toastPlatform.textContent = platform;
      if (toastSnippet) {
        toastSnippet.textContent = `href="${sampleUrl}"`;
        toastSnippet.setAttribute('data-copy-val', sampleUrl);
      }

      // Show toast
      if (toast) {
        toast.classList.add('toast-show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.classList.remove('toast-show');
        }, 7000);
      }
    });
  });

  if (toastClose && toast) {
    toastClose.addEventListener('click', () => {
      soundEngine.playTactileClick();
      toast.classList.remove('toast-show');
      clearTimeout(toastTimer);
    });
  }

  if (toastCopyBtn && toastSnippet) {
    toastCopyBtn.addEventListener('click', () => {
      soundEngine.playTactileClick();
      const val = toastSnippet.getAttribute('data-copy-val') || toastSnippet.textContent;
      navigator.clipboard.writeText(val).then(() => {
        const originalText = toastCopyBtn.textContent;
        toastCopyBtn.textContent = 'COPIED!';
        setTimeout(() => {
          toastCopyBtn.textContent = originalText;
        }, 2000);
      });
    });
  }
}

// ==========================================================================
// 5. CASE STUDY DATA & MODAL SYSTEM
// ==========================================================================
const caseStudies = [
  {
    id: 'aether',
    title: 'AETHER AUTOMOTIVE',
    category: 'Autonomous EV Mobility · Visual Identity & Spatial HMI',
    year: '2025 – 2026',
    tagline: 'Architecting the visual soul of zero-emission autonomous vehicles.',
    challenge: 'Aether required a brand identity that positioned them not merely as a car manufacturer, but as an ambient spatial intelligence ecosystem.',
    solution: 'Designed a variable geometric lettermark with dynamic weight shifting based on acceleration, coupled with a deep liquid glass digital dashboard language and luxury monochromatic vehicle badging.',
    deliverables: ['Global Brand System', 'HMI Typography Spec', 'Vehicle Emblem Architecture', 'Spatial Design Guidelines'],
    colors: ['#050608', '#00F0FF', '#7A889B', '#FFFFFF'],
    typography: 'Syne Specimen & Custom Variable Glyphs'
  },
  {
    id: 'valence',
    title: 'VALENCE SYNTHETICS',
    category: 'Quantum Bio-Computing · Brand System & Narrative',
    year: '2024 – 2025',
    tagline: 'Bridging silicon computation and cellular molecular biology.',
    challenge: 'Translating complex bio-algorithmic research into an iconic, institutional identity that inspires sovereign capital and Nobel-tier researchers.',
    solution: 'Developed a dynamic identity system anchored in iridescent refraction patterns, structural grid mathematics, and bespoke generative iconography.',
    deliverables: ['Brand Manifesto', 'Visual Language Protocol', 'Executive Packaging', 'Interactive Web Presence'],
    colors: ['#0B0E17', '#6E56CF', '#00FFB2', '#E2E8F0'],
    typography: 'Space Grotesk & Monumental Display'
  },
  {
    id: 'kroma',
    title: 'KROMA HAUTE PARFUMERIE',
    category: 'Parisian Luxury Fragrance · Liquid Glass Packaging',
    year: '2024',
    tagline: 'Capturing invisible olfactory notes through sculptural glass monoliths.',
    challenge: 'Reinventing classic French luxury perfume packaging for a modern, digitally native collector audience seeking tactile timelessness.',
    solution: 'Engineered solid optical crystal bottles featuring liquid internal refractions and minimalist laser-etched typography, accompanied by blind-debossed heavyweight cotton boxes.',
    deliverables: ['Bottle Sculpture 3D Blueprint', 'Tactile Packaging Suite', 'Boutique Environmental Signage', 'Art Direction'],
    colors: ['#0A0A0C', '#E2D9C8', '#D4AF37', '#1E1E24'],
    typography: 'High-Contrast Editorial Roman & Micro Sans'
  },
  {
    id: 'nexus',
    title: 'NEXUS PROTOCOL',
    category: 'Zero-Knowledge Institutional Web3 · Brand Architecture',
    year: '2023 – 2024',
    tagline: 'Cryptographic proof meets sovereign institutional liquidity.',
    challenge: 'Building unmatched trust and clarity for a high-frequency ZK-rollup infrastructure powering billions in cross-border settlements.',
    solution: 'Constructed an uncompromising brutalist-minimalist identity system with cold monochrome surfaces, razor-sharp typographic alignments, and a kinetic glyph mark.',
    deliverables: ['Protocol Visual System', 'Developer Portal Architecture', 'Whitepaper Design Language', 'Global Event Spatial Kit'],
    colors: ['#000000', '#F4F4F5', '#38BDF8', '#18181B'],
    typography: 'JetBrains Mono & Inter Precision'
  },
  {
    id: 'syntex',
    title: 'SYNTEX NEURAL',
    category: 'Spatial Audio Hardware · Brand & Industrial Identity',
    year: '2023',
    tagline: 'Binaural soundscapes powered by neural conductance.',
    challenge: 'Positioning next-generation audio hardware against legacy audio giants with a distinct futuristic aesthetic.',
    solution: 'Engineered a sensory-first brand world combining fluid soundwave simulations, matte titanium packaging, and a whisper-quiet visual identity.',
    deliverables: ['Industrial Branding', 'Acoustic Visualizer System', 'Packaging Ecosystem', 'Retail Experience Kit'],
    colors: ['#0D0F12', '#22D3EE', '#94A3B8', '#F8FAFC'],
    typography: 'Space Grotesk & Bespoke Numerical Glyphs'
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
  const modalChallenge = document.getElementById('modal-challenge');
  const modalSolution = document.getElementById('modal-solution');
  const modalDeliverables = document.getElementById('modal-deliverables');
  const modalColors = document.getElementById('modal-colors');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      soundEngine.init();
      soundEngine.playLiquidChime();

      const id = trigger.getAttribute('data-project-id');
      const project = caseStudies.find(p => p.id === id);
      if (!project) return;

      if (modalTitle) modalTitle.textContent = project.title;
      if (modalCategory) modalCategory.textContent = project.category;
      if (modalYear) modalYear.textContent = project.year;
      if (modalTagline) modalTagline.textContent = project.tagline;
      if (modalChallenge) modalChallenge.textContent = project.challenge;
      if (modalSolution) modalSolution.textContent = project.solution;

      if (modalDeliverables) {
        modalDeliverables.innerHTML = project.deliverables
          .map(d => `<span class="glass-pill text-xs py-1 px-3 border border-white/10 text-slate-300">✦ ${d}</span>`)
          .join('');
      }

      if (modalColors) {
        modalColors.innerHTML = project.colors
          .map(c => `
            <div class="flex items-center gap-2 group cursor-pointer" onclick="navigator.clipboard.writeText('${c}')">
              <span class="w-6 h-6 rounded-full border border-white/20 shadow-inner" style="background-color: ${c}"></span>
              <span class="font-mono text-xs text-slate-400 group-hover:text-cyan-400 transition-colors">${c}</span>
            </div>
          `)
          .join('');
      }

      modal.classList.add('modal-active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    soundEngine.playTactileClick();
    modal.classList.remove('modal-active');
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
// 6. CUSTOM LIQUID CURSOR
// ==========================================================================
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  if (!dot || !ring) return;

  // Don't show on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function loop() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(loop);
  }
  loop();

  // Hover states
  const interactives = document.querySelectorAll('a, button, [data-project-id], .glass-pill, .liquid-glass-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// ==========================================================================
// 7. LIQUID GLASS LENS INTERACTIVE PLAYGROUND
// ==========================================================================
function initLiquidLens() {
  const playground = document.getElementById('liquid-playground');
  const lens = document.getElementById('liquid-lens');
  if (!playground || !lens) return;

  playground.addEventListener('mousemove', (e) => {
    const rect = playground.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;
    lens.style.opacity = '1';
  });

  playground.addEventListener('mouseleave', () => {
    lens.style.opacity = '0';
  });
}

// ==========================================================================
// 8. AUDIO TOGGLE & DOCK CONTROLS
// ==========================================================================
function initAudioToggle() {
  const toggleBtn = document.getElementById('audio-toggle-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    soundEngine.init();
    const isMuted = soundEngine.toggleMute();
    toggleBtn.classList.toggle('sound-muted', isMuted);
    const label = toggleBtn.querySelector('.audio-label');
    if (label) {
      label.textContent = isMuted ? 'AUDIO: OFF' : 'AUDIO: ON';
    }
  });
}

// ==========================================================================
// 9. FORM SUBMISSION TRANSMISSION FEEDBACK
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('transmission-form');
  const successNotice = document.getElementById('transmission-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    soundEngine.init();
    soundEngine.playLiquidChime();

    // Show simulated transmission success
    if (successNotice) {
      successNotice.classList.remove('hidden');
      form.reset();
      setTimeout(() => {
        successNotice.classList.add('hidden');
      }, 6000);
    }
  });
}

// ==========================================================================
// INITIALIZATION ON DOM READY
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  new LiquidCanvas('liquid-canvas');
  initTextPullUp();
  initContactDuds();
  initProjectModal();
  initCustomCursor();
  initLiquidLens();
  initAudioToggle();
  initContactForm();

  // First interaction unlocks AudioContext
  window.addEventListener('click', () => soundEngine.init(), { once: true });
});

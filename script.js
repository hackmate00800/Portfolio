/* ============================================================
   Cursor — Magnetic Custom Cursor
   ============================================================ */
class MagneticCursor {
  constructor() {
    this.el = document.getElementById('cursor');
    this.dot = this.el.querySelector('.cursor-dot');
    this.ring = this.el.querySelector('.cursor-ring');
    this.pos = { x: -100, y: -100 };
    this.ringPos = { x: -100, y: -100 };
    this.lerpSpeed = 0.12;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
    });
    document.addEventListener('mouseleave', () => {
      this.el.style.display = 'none';
    });
    document.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover)').matches) {
        this.el.style.display = 'block';
      }
    });
    this.bindHovers();
    this.tick();
  }

  bindHovers() {
    document.querySelectorAll('a, button, .nav-link, .social-link, .resume-btn, .btn-sm, .form-submit, .project-card, .badge').forEach(el => {
      el.addEventListener('mouseenter', () => this.el.classList.add('hover-link'));
      el.addEventListener('mouseleave', () => this.el.classList.remove('hover-link'));
    });

    const splitDivider = document.getElementById('splitDivider');
    if (splitDivider) {
      splitDivider.addEventListener('mouseenter', () => this.el.classList.add('hover-split'));
      splitDivider.addEventListener('mouseleave', () => this.el.classList.remove('hover-split'));
    }

    document.querySelectorAll('.icon-btn, .form-submit, .btn-sm.btn-primary').forEach(el => {
      el.addEventListener('mouseenter', () => this.el.classList.add('hover-btn'));
      el.addEventListener('mouseleave', () => this.el.classList.remove('hover-btn'));
    });
  }

  tick() {
    this.ringPos.x += (this.pos.x - this.ringPos.x) * this.lerpSpeed;
    this.ringPos.y += (this.pos.y - this.ringPos.y) * this.lerpSpeed;

    this.dot.style.left = this.pos.x + 'px';
    this.dot.style.top = this.pos.y + 'px';
    this.ring.style.left = this.ringPos.x + 'px';
    this.ring.style.top = this.ringPos.y + 'px';

    requestAnimationFrame(() => this.tick());
  }
}

/* ============================================================
   Split-Face — Draggable Divider + Hover Reveal
   ============================================================ */
class SplitFace {
  constructor() {
    this.faceFront = document.getElementById('faceFront');
    this.divider = document.getElementById('splitDivider');
    this.splitContainer = document.getElementById('splitContainer');
    this.textLeft = document.getElementById('textLeft');
    this.textRight = document.getElementById('textRight');

    this.targetPct = 50;
    this.currentPct = 50;
    this.isDragging = false;
    this.lerpSpeed = 0.08;

    if (!this.faceFront) return;
    this.init();
  }

  init() {
    this.initDrag();
    this.initHover();
    this.tick();
  }

  initDrag() {
    const getX = (e) => {
      if (e.touches) return e.touches[0].clientX;
      return e.clientX;
    };

    const startDrag = (e) => {
      this.isDragging = true;
      this.divider.classList.add('active');
      e.preventDefault();
    };

    const moveDrag = (e) => {
      if (!this.isDragging) return;
      const rect = this.splitContainer.getBoundingClientRect();
      const x = getX(e) - rect.left;
      this.targetPct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    };

    const endDrag = () => {
      this.isDragging = false;
      this.divider.classList.remove('active');
    };

    this.divider.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('mouseup', endDrag);

    this.divider.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', moveDrag, { passive: false });
    document.addEventListener('touchend', endDrag);
  }

  initHover() {
    if (this.textLeft) {
      this.textLeft.addEventListener('mouseenter', () => { this.targetPct = 100; });
      this.textLeft.addEventListener('mouseleave', () => { if (!this.isDragging) this.targetPct = 50; });
    }
    if (this.textRight) {
      this.textRight.addEventListener('mouseenter', () => { this.targetPct = 0; });
      this.textRight.addEventListener('mouseleave', () => { if (!this.isDragging) this.targetPct = 50; });
    }
  }

  tick() {
    this.currentPct += (this.targetPct - this.currentPct) * this.lerpSpeed;

    if (this.faceFront) {
      this.faceFront.style.width = this.currentPct + '%';
    }
    if (this.divider) {
      this.divider.style.left = this.currentPct + '%';
    }

    requestAnimationFrame(() => this.tick());
  }
}

/* ============================================================
   Theme Toggle
   ============================================================ */
class ThemeManager {
  constructor() {
    this.btn = document.getElementById('theme-toggle');
    this.html = document.documentElement;
    this.init();
  }

  init() {
    const saved = localStorage.getItem('theme');
    if (saved) this.html.setAttribute('data-theme', saved);

    this.btn.addEventListener('click', () => {
      const current = this.html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      this.html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
}

/* ============================================================
   Sound Toggle (placeholder)
   ============================================================ */
class SoundManager {
  constructor() {
    this.btn = document.getElementById('sound-toggle');
    this.on = true;
    this.init();
  }

  init() {
    const saved = localStorage.getItem('sound');
    if (saved === 'off') {
      this.on = false;
      document.body.classList.add('sound-off');
    }

    this.btn.addEventListener('click', () => {
      this.on = !this.on;
      document.body.classList.toggle('sound-off');
      localStorage.setItem('sound', this.on ? 'on' : 'off');
    });
  }
}

/* ============================================================
   Navigation — Hide/Show on Scroll
   ============================================================ */
class NavManager {
  constructor() {
    this.nav = document.getElementById('navbar');
    this.lastScroll = 0;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      if (current > this.lastScroll && current > 100) {
        this.nav.classList.add('hidden-nav');
      } else {
        this.nav.classList.remove('hidden-nav');
      }
      this.lastScroll = current;
    }, { passive: true });
  }
}

/* ============================================================
   Mobile Menu
   ============================================================ */
class MobileMenu {
  constructor() {
    this.hamburger = document.querySelector('.nav-hamburger');
    this.menu = document.getElementById('mobile-menu');
    this.links = document.querySelectorAll('.mobile-link');
    this.init();
  }

  init() {
    this.hamburger.addEventListener('click', () => {
      this.hamburger.classList.toggle('active');
      this.menu.classList.toggle('open');
    });

    this.links.forEach(link => {
      link.addEventListener('click', () => {
        this.hamburger.classList.remove('active');
        this.menu.classList.remove('open');
      });
    });
  }
}

/* ============================================================
   Typing Effect
   ============================================================ */
class TypingEffect {
  constructor() {
    this.el = document.querySelector('.typing-text');
    this.words = [
      'Creative Designer',
      'Full-Stack Developer',
      'UI/UX Enthusiast',
      'Code Mentor',
      'Problem Solver'
    ];
    this.wordIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.typeSpeed = 80;
    this.deleteSpeed = 40;
    this.pauseTime = 1800;
    if (this.el) this.type();
  }

  type() {
    const current = this.words[this.wordIndex];

    if (this.isDeleting) {
      this.el.textContent = current.substring(0, this.charIndex--);
    } else {
      this.el.textContent = current.substring(0, this.charIndex++);
    }

    if (!this.isDeleting && this.charIndex === current.length) {
      this.isDeleting = true;
      setTimeout(() => this.type(), this.pauseTime);
      return;
    }

    if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
    }

    setTimeout(() => this.type(), this.isDeleting ? this.deleteSpeed : this.typeSpeed);
  }
}

/* ============================================================
   Scroll Progress Bar
   ============================================================ */
class ScrollProgress {
  constructor() {
    this.bar = document.getElementById('scroll-progress');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      this.bar.style.width = progress + '%';
    }, { passive: true });
  }
}

/* ============================================================
   Scroll Reveal — Intersection Observer
   ============================================================ */
class ScrollReveal {
  constructor() {
    this.els = document.querySelectorAll('.reveal');
    this.init();
  }

  init() {
    if (!this.els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    this.els.forEach(el => observer.observe(el));
  }
}

/* ============================================================
   Skill Bars — Animate on Scroll
   ============================================================ */
class SkillBars {
  constructor() {
    this.bars = document.querySelectorAll('.skill-fill');
    this.init();
  }

  init() {
    if (!this.bars.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const pct = bar.dataset.pct;
          bar.style.setProperty('--target-width', pct + '%');
          bar.classList.add('animated');
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    this.bars.forEach(bar => observer.observe(bar));
  }
}

/* ============================================================
   Contact Form
   ============================================================ */
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    if (!this.form) return;
    this.name = document.getElementById('formName');
    this.email = document.getElementById('formEmail');
    this.message = document.getElementById('formMessage');
    this.submitBtn = this.form.querySelector('.form-submit');
    this.successEl = this.form.querySelector('.form-success');
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.validate()) return;

      this.submitBtn.classList.add('loading');
      this.submitBtn.disabled = true;

      setTimeout(() => {
        this.submitBtn.classList.remove('loading');
        this.submitBtn.disabled = false;
        this.form.reset();
        this.successEl.classList.add('show');
        setTimeout(() => this.successEl.classList.remove('show'), 4000);
      }, 1500);
    });

    [this.name, this.email, this.message].forEach(input => {
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  validate() {
    let valid = true;

    if (!this.name.value.trim()) {
      this.showError(this.name);
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.value.trim())) {
      this.showError(this.email);
      valid = false;
    }

    if (!this.message.value.trim()) {
      this.showError(this.message);
      valid = false;
    }

    return valid;
  }

  showError(input) {
    input.classList.add('error');
  }

  clearError(input) {
    input.classList.remove('error');
  }
}

/* ============================================================
   Particles — Canvas Background
   ============================================================ */
class Particles {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.count = 60;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    for (let i = 0; i < this.count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    this.animate();
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

/* ============================================================
   Floating Shapes — Mouse Parallax
   ============================================================ */
class FloatingShapesParallax {
  constructor() {
    this.shapes = document.querySelectorAll('.shape');
    if (!this.shapes.length) return;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      const xFactor = (e.clientX / window.innerWidth - 0.5) * 2;
      const yFactor = (e.clientY / window.innerHeight - 0.5) * 2;

      this.shapes.forEach((shape, i) => {
        const speed = (i + 1) * 5;
        const x = xFactor * speed;
        const y = yFactor * speed;
        shape.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }
}

/* ============================================================
   Loader
   ============================================================ */
class Loader {
  constructor() {
    this.el = document.getElementById('loader');
    this.init();
  }

  init() {
    window.addEventListener('load', () => {
      setTimeout(() => this.el.classList.add('loaded'), 400);
    });
  }
}

/* ============================================================
   Footer — Auto Year
   ============================================================ */
class FooterYear {
  constructor() {
    const el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
  }
}

/* ============================================================
   Init — Start Everything
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  new MagneticCursor();
  new SplitFace();
  new ThemeManager();
  new SoundManager();
  new NavManager();
  new MobileMenu();
  new TypingEffect();
  new ScrollProgress();
  new ScrollReveal();
  new SkillBars();
  new ContactForm();
  new Particles();
  new FloatingShapesParallax();
  new Loader();
  new FooterYear();
});

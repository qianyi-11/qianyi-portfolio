// ===== Projects (rendered first so reveal/tilt pick up the cards) =====
const ICONS = {
  Python: 'python', FastAPI: 'fastapi', React: 'react', 'React.js': 'react', Vite: 'vite', TypeScript: 'ts',
  'Next.js': 'nextjs', 'Tailwind CSS': 'tailwind', Prisma: 'prisma', PostgreSQL: 'postgres', 'Node.js': 'nodejs',
  'Express.js': 'express', JavaScript: 'js', HTML: 'html', CSS: 'css', Firebase: 'firebase', MongoDB: 'mongodb',
  Bootstrap: 'bootstrap', Java: 'java', Android: 'androidstudio', SQLite: 'sqlite', 'Scikit-learn': 'sklearn',
  'React Native': 'react',
};

const PROJECTS = [
  ['03', 'Trippy', ['web'], 'Web', 'Explainable group travel planning, from everyone\'s votes to one shared itinerary.',
    'Manages group preferences, activity suggestions, voting, capacity-aware recommendations, itinerary sequencing and budget estimation, while keeping every decision visible to the group.',
    ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Google Maps']],
  ['04', 'Centinel', ['web', 'ai'], 'Enterprise', 'AI governance: an AI firewall, Shadow AI monitoring and compliance.',
    'Helps organisations adopt AI securely: detects and protects sensitive information, monitors Shadow AI, enforces policy, tracks compliance and adds transparency via governance dashboards and AI nutrition labels.',
    ['JavaScript', 'HTML', 'CSS', 'Node.js', 'Express.js', 'Google Gemini']],
  ['05', 'DuitSense', ['mobile'], 'Mobile', 'A gamified personal finance app for building better money habits.',
    'Expense tracking, budgeting, AI-driven insights, savings projections and financial literacy content, with challenges, streaks, XP, rewards and leaderboards to keep users engaged.',
    ['React Native', 'Expo', 'TypeScript', 'Reanimated']],
  ['06', 'Shippeo', ['ai', 'web'], 'Document AI', 'Automated checking of shipping instructions against bills of lading.',
    'Processes emails and documents, extracts fields from Shipping Instructions and Bills of Lading, and uses deterministic comparison to flag discrepancies, with source evidence and human review for uncertain cases.',
    ['Python', 'FastAPI', 'React', 'TypeScript', 'Vite', 'Firebase', 'Google Gemini']],
  ['07', 'TreasurAI', ['ai', 'web'], 'Fintech', 'Financial decision support that blends forecasting with generative AI.',
    'Cash-flow forecasting, ROI simulations, scenario planning and supplier negotiation recommendations, surfaced through an interactive dashboard that turns financial data into actionable insight.',
    ['Python', 'FastAPI', 'React', 'Vite', 'GLM']],
  ['08', 'InsightHUB', ['web'], 'Web', 'KPI management with evidence verification and live dashboards.',
    'KPI creation and assignment, progress tracking, evidence submission and verification, role-based access, notifications, progress history and manager dashboards for overall performance.',
    ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Bootstrap']],
  ['09', 'BookCare', ['mobile'], 'Android', 'A community marketplace for exchanging and donating books.',
    'Book listings and exchange workflows with community discussions, user profiles, reviews and an eco-reward system that encourages sustainable book sharing.',
    ['Java', 'Android', 'Firebase', 'Jetpack', 'Material']],
  ['10', 'SafeCampus AI', ['web', 'ai'], 'Web', 'Scam detection and digital-safety education for students.',
    'Analyses suspicious messages, screenshots, links, emails and sender details, then explains the risk, recommends next steps and teaches users through scam education and a threat database.',
    ['React', 'TypeScript', 'Vite', 'Express.js', 'Google Gemini', 'SQLite', 'Tailwind CSS']],
  ['11', 'FraudGuard', ['ai'], 'Machine Learning', 'Explainable fraud detection from bank notification alerts.',
    'Extracts transaction details from alerts, predicts fraud probability, assigns risk levels and explains each flag, with an interactive dashboard of fraud trends, risk distribution and alerts.',
    ['Python', 'Scikit-learn', 'Streamlit', 'Pandas', 'NumPy', 'Plotly']],
];

const grid = document.getElementById('pjGrid');
grid.innerHTML = PROJECTS.map(([num, name, cats, chip, sum, desc, tech]) => {
  const withIcon = tech.filter((t) => ICONS[t]).slice(0, 5);
  const rest = tech.length - withIcon.length;
  return `
  <article class="pj-card" data-cat="${cats.join(' ')}">
    <div class="pj-meta"><span class="pj-num">${num}</span><span class="pj-chip">${chip}</span></div>
    <h3 class="pj-name">${name}</h3>
    <p class="pj-sum">${sum}</p>
    <div class="pj-more"><div><p>${desc}</p><p class="stack">${tech.join(' · ')}</p></div></div>
    <div class="pj-tech">
      ${withIcon.map((t) => `<img src="assets/icons/${ICONS[t]}.svg" alt="${t}" title="${t}">`).join('')}
      ${rest > 0 ? `<span class="more">+${rest}</span>` : ''}
    </div>
    <div class="pj-foot">
      <button class="pj-toggle" aria-expanded="false">Details <span class="chev">↓</span></button>
      <a class="pj-link" href="https://github.com/qianyi-11" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
  </article>`;
}).join('');

// Expand / collapse
grid.addEventListener('click', (e) => {
  const btn = e.target.closest('.pj-toggle');
  if (!btn) return;
  const card = btn.closest('.pj-card');
  const open = card.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
});

// Filters with a sliding pill and FLIP re-layout
const pill = document.querySelector('.pj-filter-pill');
const filters = [...document.querySelectorAll('.pj-filter')];
const cards = [...document.querySelectorAll('.pj-card')];

function movePill(btn) {
  pill.style.left = `${btn.offsetLeft}px`;
  pill.style.width = `${btn.offsetWidth}px`;
}

function applyFilter(filter) {
  const first = new Map(cards.map((c) => [c, c.getBoundingClientRect()]));
  cards.forEach((c) => c.classList.toggle('is-hidden', filter !== 'all' && !c.dataset.cat.split(' ').includes(filter)));
  document.getElementById('pjEmpty').style.display = cards.some((c) => !c.classList.contains('is-hidden')) ? 'none' : 'block';
  cards.forEach((c) => {
    if (c.classList.contains('is-hidden')) return;
    const a = first.get(c);
    const b = c.getBoundingClientRect();
    const appeared = a.width === 0;
    const dx = a.left - b.left;
    const dy = a.top - b.top;
    c.style.transition = 'none';
    c.style.transform = appeared ? 'scale(0.92)' : `translate(${dx}px, ${dy}px)`;
    c.style.opacity = appeared ? '0' : '1';
    requestAnimationFrame(() => {
      c.style.transition = 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease';
      c.style.transform = '';
      c.style.opacity = '1';
    });
  });
}

filters.forEach((btn) => btn.addEventListener('click', () => {
  filters.forEach((b) => {
    b.classList.toggle('active', b === btn);
    b.setAttribute('aria-selected', String(b === btn));
  });
  movePill(btn);
  applyFilter(btn.dataset.filter);
}));

const init = () => movePill(document.querySelector('.pj-filter.active'));
window.addEventListener('resize', init);
document.fonts.ready.then(init);
init();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Navbar background on scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((item) => item.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);

sections.forEach((section) => navObserver.observe(section));

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('.reveal');
revealEls.forEach((el, i) => el.style.setProperty('--i', i % 8));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

// Hero is always on screen at load, so animate it in immediately
requestAnimationFrame(() => {
  document.querySelectorAll('.hero .reveal').forEach((el) => el.classList.add('in-view'));
});

// ===== Typewriter =====
const roles = [
  'Software Engineer Intern',
  'CS (Information System) Student',
  'Computer Vision enthusiast',
  'Hackathon builder',
];
const typewriterEl = document.getElementById('typewriter');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typewriterEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typewriterEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 35 : 65);
}

typeLoop();

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// =====================================================
// Motion layer
// =====================================================
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

// ===== Scroll progress =====
const progressBar = document.getElementById('scrollProgress');
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ===== Tech marquee (content duplicated for a seamless loop) =====
document.querySelectorAll('[data-marquee]').forEach((row) => {
  const items = row.dataset.marquee.split(',').map((pair) => {
    const [icon, name] = pair.split(':');
    return `<span class="marquee-item"><img src="assets/icons/${icon}.svg" alt="" width="30" height="30">${name}</span>`;
  }).join('');
  row.innerHTML = `<div class="marquee-group">${items}</div><div class="marquee-group" aria-hidden="true">${items}</div>`;
});

// ===== Cursor glow =====
const cursorGlow = document.getElementById('cursorGlow');
if (finePointer && !reduceMotion) {
  let gx = window.innerWidth / 2;
  let gy = window.innerHeight / 2;
  let tx = gx;
  let ty = gy;
  window.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    cursorGlow.classList.add('active');
  }, { passive: true });
  document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
  (function followGlow() {
    gx += (tx - gx) * 0.12;
    gy += (ty - gy) * 0.12;
    cursorGlow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
    requestAnimationFrame(followGlow);
  })();
}

// ===== Project cards: 3D tilt + glow under the cursor, magnetic buttons =====
if (finePointer && !reduceMotion) {
  document.querySelectorAll('.pj-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
      card.style.transition = 'transform 0.12s ease-out, border-color 0.3s ease';
      card.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 9}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), border-color 0.3s ease';
      card.style.transform = '';
    });
  });

  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ===== Hero 3D particle wave =====
(function heroWave() {
  const canvas = document.getElementById('heroWave');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS = [[124, 92, 255], [34, 211, 200], [255, 92, 158]];
  const ROWS = 38;
  const MAX_COLS = 140;
  const Z_NEAR = 1.6;
  const Z_STEP = 0.14;
  const Z_FAR = Z_NEAR + (ROWS - 1) * Z_STEP;
  const X_SPAN = 7;
  const CAM_Y = 1.15;

  let w = 0;
  let h = 0;
  let cols = 0;
  let fx = 0;
  let fy = 0;
  let horizon = 0;
  let colColors = [];
  let lineGradient = null;
  let running = false;
  let visible = true;
  const mouse = { x: 0, z: 3.2, tx: 0, tz: 3.2, strength: 0, target: 0 };

  const ptX = new Float32Array(ROWS * MAX_COLS);
  const ptY = new Float32Array(ROWS * MAX_COLS);
  const ptS = new Float32Array(ROWS * MAX_COLS);
  const ptA = new Float32Array(ROWS * MAX_COLS);

  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const colorAt = (t) => (t < 0.5 ? mix(COLORS[0], COLORS[1], t * 2) : mix(COLORS[1], COLORS[2], (t - 0.5) * 2));

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = Math.max(44, Math.min(MAX_COLS, Math.round(w / 11)));
    horizon = h * 0.08;
    fx = ((w / 2) * Z_NEAR / X_SPAN) * 1.15;
    fy = ((h * 0.86 - horizon) * Z_NEAR) / CAM_Y;

    colColors = [];
    for (let i = 0; i < cols; i++) {
      const [r, g, b] = colorAt(i / (cols - 1));
      colColors.push(`rgb(${r},${g},${b})`);
    }
    lineGradient = ctx.createLinearGradient(0, 0, w, 0);
    lineGradient.addColorStop(0, 'rgb(124,92,255)');
    lineGradient.addColorStop(0.5, 'rgb(34,211,200)');
    lineGradient.addColorStop(1, 'rgb(255,92,158)');
    if (!running) draw(0);
  }

  // Height of the wave surface at world point (x, z); the cursor adds a ripple
  function surface(x, z, t) {
    let y = 0.26 * Math.sin(x * 0.55 + t * 1.05) * Math.cos(z * 1.1 - t * 0.75);
    y += 0.1 * Math.sin(x * 1.35 - z * 0.9 + t * 1.6);
    if (mouse.strength > 0.001) {
      const dx = x - mouse.x;
      const dz = (z - mouse.z) * 1.6;
      const d = Math.sqrt(dx * dx + dz * dz);
      y += mouse.strength * 0.32 * Math.sin(d * 3.2 - t * 4.2) * Math.exp(-d * 0.55);
    }
    return y;
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.z += (mouse.tz - mouse.z) * 0.08;
    mouse.strength += (mouse.target - mouse.strength) * 0.05;

    for (let j = 0; j < ROWS; j++) {
      const z = Z_FAR - j * Z_STEP;
      const depth = 1 - (z - Z_NEAR) / (Z_FAR - Z_NEAR);
      // every row spans the full screen width, so the far rows read as distant ocean
      const halfW = ((w / 2) * 1.08 * z) / fx;
      for (let i = 0; i < cols; i++) {
        const x = (i / (cols - 1) - 0.5) * 2 * halfW;
        const y = surface(x, z, t);
        const k = j * cols + i;
        ptX[k] = w / 2 + (x * fx) / z;
        ptY[k] = horizon + ((CAM_Y - y) * fy) / z;
        ptS[k] = (0.7 + depth * 1.9) * (1 + y * 0.9);
        ptA[k] = Math.min(1, (0.12 + depth * 0.75) * (0.75 + y * 1.4));
      }
    }

    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 1;
    for (let j = 0; j < ROWS; j += 2) {
      ctx.globalAlpha = 0.05 + (j / (ROWS - 1)) * 0.16;
      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        const k = j * cols + i;
        if (i === 0) ctx.moveTo(ptX[k], ptY[k]);
        else ctx.lineTo(ptX[k], ptY[k]);
      }
      ctx.stroke();
    }

    for (let i = 0; i < cols; i++) {
      ctx.fillStyle = colColors[i];
      for (let j = 0; j < ROWS; j++) {
        const k = j * cols + i;
        if (ptX[k] < -4 || ptX[k] > w + 4) continue;
        const s = ptS[k];
        ctx.globalAlpha = ptA[k];
        ctx.fillRect(ptX[k] - s / 2, ptY[k] - s / 2, s, s);
      }
    }
    ctx.globalAlpha = 1;
  }

  function loop(now) {
    if (!running) return;
    draw(now / 1000);
    requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduceMotion || !visible || document.hidden) return;
    running = true;
    requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
  }

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const my = e.clientY - rect.top;
    if (my < horizon || my > h || e.clientX < rect.left || e.clientX > rect.right) {
      mouse.target = 0;
      return;
    }
    const z = Math.max(Z_NEAR, Math.min(Z_FAR, (fy * CAM_Y) / Math.max(1, my - horizon)));
    mouse.tz = z;
    mouse.tx = ((e.clientX - rect.left - w / 2) * z) / fx;
    mouse.target = 1;
  }, { passive: true });

  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  resize();
  start();
})();

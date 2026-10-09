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

// ===== Typewriter =====
const roles = [
  'CS (Information System) Student',
  'Builder of AI-powered tools',
  'Hackathon enthusiast',
  'Aspiring Software Engineer',
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

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── NAVBAR ACTIVE AU SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ── TYPEWRITER ──
const phrases = [
  'développeuse mobile 📱',
  'étudiante à l\'IUC Douala 🎓',
  'passionnée de code ✨',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeTarget = document.getElementById('typewriter');

function type() {
  if (!typeTarget) return;
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typeTarget.textContent = current.substring(0, charIndex--);
  } else {
    typeTarget.textContent = current.substring(0, charIndex++);
  }
  if (!isDeleting && charIndex === current.length + 1) {
    setTimeout(() => isDeleting = true, 1800);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
  setTimeout(type, isDeleting ? 50 : 90);
}
type();
// ── ANIMATION BARRES LANGUES ──
document.querySelectorAll('.langue-bar-fill').forEach(bar => {
  const targetWidth = bar.style.width;
  bar.style.setProperty('--target-width', targetWidth);
  bar.style.width = '0%';
});

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.langue-bar-fill').forEach(bar => {
        bar.classList.add('animated');
      });
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.langue-card').forEach(card => barObserver.observe(card));
// ── ANIMATION CHIFFRES ──
const counters = [
  { id: 'count1', target: 3, suffix: '' },
  { id: 'count3', target: 5, suffix: '+' },
];

function animateCount(el, target, suffix) {
  let current = 0;
  const step = Math.ceil(target / 30);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, 40);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      counters.forEach(c => {
        const el = document.getElementById(c.id);
        if (el) animateCount(el, c.target, c.suffix);
      });
      countObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) countObserver.observe(statsSection);

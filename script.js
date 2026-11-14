// === DOM Elements ===
const loadingScreen = document.getElementById('loading-screen');
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeIcon = document.getElementById('theme-icon');
const themeIconMobile = document.getElementById('theme-icon-mobile');
const musicToggle = document.getElementById('music-toggle');
const musicToggleMobile = document.getElementById('music-toggle-mobile');
const musicIcon = document.getElementById('music-icon');
const musicIconMobile = document.getElementById('music-icon-mobile');
const bgMusic = document.getElementById('bg-music');
const backToTopBtn = document.getElementById('back-to-top');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const sections = document.querySelectorAll('.section');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

let isMenuOpen = false;
let isMusicPlaying = false;
let currentTheme = 'light';
try {
  currentTheme = localStorage.getItem('theme') || 'light';
} catch (error) {
  console.warn('Theme preference storage is unavailable:', error);
}

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme, true);
  initApp();
});

function initApp() {
  setTimeout(() => loadingScreen?.classList.add('hidden'), 1000);
  setupListeners();
  observeSections();
  handleScroll();
  addImageFadeIn();
  addRippleEffect();
  addParallax();
  if (bgMusic) {
    bgMusic.volume = 0.05; // Keep optional background music subtle
    bgMusic.addEventListener('play', () => updateMusicState(true));
    bgMusic.addEventListener('pause', () => updateMusicState(false));
  }
}

function setupListeners() {
  themeToggle?.addEventListener('click', () => switchTheme(false));
  themeToggleMobile?.addEventListener('click', () => switchTheme(false));
  musicToggle?.addEventListener('click', toggleMusic);
  musicToggleMobile?.addEventListener('click', toggleMusic);
  mobileMenuBtn?.addEventListener('click', toggleMobileMenu);
  navLinks.forEach(link => link.addEventListener('click', handleNavClick));
  mobileNavLinks.forEach(link => link.addEventListener('click', handleMobileNavClick));
  tabBtns.forEach(btn => btn.addEventListener('click', handleTabClick));
  backToTopBtn?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', debounce(handleScroll, 10));
  window.addEventListener('resize', handleResize);
  document.addEventListener('keydown', handleKeyShortcuts);
}

function switchTheme(skipSave) {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
  if (!skipSave) localStorage.setItem('theme', currentTheme);
}

function applyTheme(theme, init = false) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(`theme-${theme}`);
  const icon = theme === 'light' ? 'dark_mode' : 'light_mode';
  if (themeIcon) themeIcon.textContent = icon;
  if (themeIconMobile) themeIconMobile.textContent = icon;
  if (!init) console.log(`Theme changed to ${theme}`);
}

function toggleMusic() {
  if (!bgMusic) return;
  if (isMusicPlaying) {
    bgMusic.pause();
    return;
  }

  bgMusic.play()
    .then(() => updateMusicState(true))
    .catch(error => {
      updateMusicState(false);
      console.warn('Background music could not be played:', error);
    });
}

function updateMusicState(playing) {
  isMusicPlaying = playing;
  const icon = playing ? 'volume_off' : 'volume_up';
  if (musicIcon) musicIcon.textContent = icon;
  if (musicIconMobile) musicIconMobile.textContent = icon;
  musicToggle?.setAttribute('aria-pressed', String(playing));
  musicToggleMobile?.setAttribute('aria-pressed', String(playing));
}

function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;
  mobileMenu?.classList.toggle('active', isMenuOpen);
  mobileMenuBtn?.setAttribute('aria-expanded', String(isMenuOpen));
  const spans = mobileMenuBtn?.querySelectorAll('span');
  if (!spans) return;
  if (isMenuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  } else {
    spans.forEach(span => {
      span.style.transform = '';
      span.style.opacity = '';
    });
  }
}

function handleNavClick(e) {
  e.preventDefault();
  const id = e.currentTarget.getAttribute('href').substring(1);
  scrollToSection(id);
  setActiveNav(e.currentTarget);
}

function handleMobileNavClick(e) {
  e.preventDefault();
  const id = e.currentTarget.getAttribute('href').substring(1);
  scrollToSection(id);
  toggleMobileMenu();
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  const offset = header.offsetHeight;
  const top = section.offsetTop - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

function setActiveNav(active) {
  navLinks.forEach(link => link.classList.remove('active'));
  active.classList.add('active');
}

function handleTabClick(e) {
  const target = e.currentTarget.getAttribute('data-tab');
  tabBtns.forEach(btn => btn.classList.remove('active'));
  tabContents.forEach(content => content.classList.remove('active'));
  e.currentTarget.classList.add('active');
  document.getElementById(target)?.classList.add('active');
}

function handleScroll() {
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 100);
  if (backToTopBtn) backToTopBtn.classList.toggle('show', scrollY > 500);
  highlightSection();
}

function highlightSection() {
  const scrollY = window.scrollY + header.offsetHeight + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      const id = section.id;
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
      });
    }
  });
}

function observeSections() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        const els = entry.target.querySelectorAll('.feature, .media-item, .quote-card, .screenshot-item');
        els.forEach((el, i) => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          el.style.transitionDelay = `${i * 0.1}s`;
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

  sections.forEach(section => observer.observe(section));
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function handleKeyShortcuts(e) {
  if (e.key === 'Escape' && isMenuOpen) toggleMobileMenu();
  if (e.key === ' ' && document.activeElement === document.body) {
    e.preventDefault();
    toggleMusic();
  }
  if ((e.ctrlKey || e.metaKey) && (e.key === 't' || e.key === 'T')) {
    e.preventDefault();
    switchTheme();
  }
}

function handleResize() {
  if (window.innerWidth > 768 && isMenuOpen) toggleMobileMenu();
}

function addImageFadeIn() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.filter = 'blur(10px)';
    img.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
    const revealImage = () => {
      img.style.opacity = '1';
      img.style.filter = 'blur(0)';
    };
    img.addEventListener('load', revealImage, { once: true });
    img.addEventListener('error', revealImage, { once: true });
    if (img.complete) revealImage();
  });
}

function addRippleEffect() {
  const buttons = document.querySelectorAll('.btn, .tab-btn, .platform-btn');
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    .btn, .tab-btn, .platform-btn { position: relative; overflow: hidden; }
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      pointer-events: none;
      animation: rippleAnimation 0.6s ease-out;
    }
    @keyframes rippleAnimation {
      from { transform: scale(0); opacity: 1; }
      to { transform: scale(1); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

function addParallax() {
  const heroBg = document.querySelector('.hero-background');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
  });
}

if (bgMusic) {
  bgMusic.addEventListener('canplay', () => console.log('🎵 Music ready'));
  bgMusic.addEventListener('error', e => console.error('🎵 Music error:', e));
}

console.log('✅ JS Ready: Fully Responsive & Instant Theme Toggle');

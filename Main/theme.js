// Shared behaviour: light/dark theme (same key as the Home-page), mobile menu, reveal animation
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');
  const icon = toggle && toggle.querySelector('i');

  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved === 'light' || (!saved && matchMedia('(prefers-color-scheme: light)').matches)) {
    body.classList.add('light');
  }
  const syncIcon = () => { if (icon) icon.className = body.classList.contains('light') ? 'fas fa-sun' : 'fas fa-moon'; };
  syncIcon();
  if (toggle) toggle.addEventListener('click', () => {
    body.classList.toggle('light');
    syncIcon();
    try { localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark'); } catch (e) {}
  });

  const menu = document.getElementById('menu');
  const menuToggle = document.getElementById('menu-toggle');
  if (menu && menuToggle) menuToggle.addEventListener('click', () => menu.classList.toggle('open'));

  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('show'));
  }
});

// Dark/Light Mode Toggle
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  const isDark = body.classList.contains('dark-theme');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Apply saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  themeBtn.textContent = '☀️';
} else {
  body.classList.remove('dark-theme');
  themeBtn.textContent = '🌙';
}

// Scroll Animations
const featureCards = document.querySelectorAll('.feature-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.5 });

featureCards.forEach((card) => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});
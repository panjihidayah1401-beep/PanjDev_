/* ==========================================================================
   MAIN
   Small page-wide behaviors that don't belong to a single feature file.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Music interest card navigates to the dedicated music page.
  const musicCard = document.getElementById('music-interest-card');
  if (musicCard) {
    musicCard.addEventListener('click', () => {
      window.location.href = musicCard.dataset.href || 'pages/music.html';
    });
    musicCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = musicCard.dataset.href || 'pages/music.html';
      }
    });
  }
});

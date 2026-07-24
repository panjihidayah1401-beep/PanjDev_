/* ==========================================================================
   ANIMATION
   Scroll reveal, decorative constellation dots, and the ripple micro-
   interaction on interest pills.
   ========================================================================== */

/** Reveals .reveal elements as they scroll into view. */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

/** Draws a sparse field of twinkling dots inside a .constellation container. */
function initConstellation(selector = '.constellation') {
  const container = document.querySelector(selector);
  if (!container) return;

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.overflow = 'visible';

  const points = [];
  const count = 22;
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    points.push({ x, y });

    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('cx', `${x}%`);
    dot.setAttribute('cy', `${y}%`);
    dot.setAttribute('r', (Math.random() * 1.3 + 0.6).toFixed(2));
    dot.setAttribute('fill', '#5B6B34');
    dot.style.animation = `twinkle ${(Math.random() * 3 + 2.5).toFixed(2)}s ease-in-out infinite`;
    dot.style.animationDelay = `${(Math.random() * 3).toFixed(2)}s`;
    svg.appendChild(dot);
  }

  // Connect a few nearby points with faint lines, like a loose constellation.
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 14 && Math.random() > 0.5) {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', `${points[i].x}%`);
        line.setAttribute('y1', `${points[i].y}%`);
        line.setAttribute('x2', `${points[j].x}%`);
        line.setAttribute('y2', `${points[j].y}%`);
        line.setAttribute('stroke', '#5B6B34');
        line.setAttribute('stroke-width', '0.5');
        line.setAttribute('opacity', '0.25');
        svg.appendChild(line);
      }
    }
  }

  container.appendChild(svg);
}

/** Adds a small expanding ripple where the user clicks inside .interest-item. */
function initRipple() {
  document.querySelectorAll('.interest-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const rect = item.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      item.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initConstellation();
  initRipple();
});

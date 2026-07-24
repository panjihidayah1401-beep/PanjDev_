/* ==========================================================================
   UTILS
   Small pure helpers shared by the other scripts. No DOM side effects here.
   ========================================================================== */

/**
 * Escapes HTML special characters so untrusted strings can be safely
 * inserted via innerHTML without being interpreted as markup.
 */
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (match) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[match]));
}

/** Formats seconds as m:ss (or 0:00 while metadata is still loading). */
function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/** Clamps a number between min and max. */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/** Debounces a function so it only runs after `wait` ms of silence. */
function debounce(fn, wait = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

/** Only allow http/https URLs to be used as href targets (defense-in-depth). */
function isSafeHttpUrl(url) {
  return /^https?:\/\//i.test(url);
}

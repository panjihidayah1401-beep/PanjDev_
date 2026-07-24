/* ==========================================================================
   PROJECTS
   To add a new project, add one object to the array below — everything
   else (screenshot preview, card, modal) is generated automatically.
   ========================================================================== */

const projects = [
  {
    title: 'TikDownloader HD',
    url: 'https://tiksdownloaders.vercel.app/',
    desc: 'Unduh video tanpa watermark, foto, dan musik MP3 dari TikTok dengan kualitas terbaik.'
  }
  /* Contoh menambah proyek kedua — cukup salin blok di bawah, isi datanya,
     lalu tempel setelah koma pada proyek di atas:
  ,{
    title: 'Nama Proyek Kedua',
    url: 'https://web-kedua-kamu.com',
    desc: 'Deskripsi lengkap tentang web ini.'
  }
  */
];

function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  if (!projects.length) {
    container.innerHTML = `<div class="empty-state">Belum ada proyek yang ditambahkan.</div>`;
    return;
  }

  projects.forEach((project) => {
    const encodedUrl = encodeURIComponent(project.url);
    const screenshotUrl = `https://s0.wp.com/mshots/v1/${encodedUrl}?w=800&h=500`;

    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Lihat detail proyek ${project.title}`);

    card.innerHTML = `
      <div class="project-img-wrapper">
        <div class="skeleton-loader"></div>
        <img class="project-img" loading="lazy" alt="">
      </div>
      <div class="project-content">
        <h3 class="project-title">${escapeHTML(project.title)}</h3>
        <p class="project-desc">${escapeHTML(project.desc)}</p>
        <div class="project-footer">
          Lihat Detail
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </div>
    `;

    const openThisModal = () => window.openProjectModal(project, screenshotUrl);
    card.addEventListener('click', openThisModal);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openThisModal();
      }
    });

    const imgElement = card.querySelector('.project-img');
    imgElement.alt = `Pratinjau ${project.title}`;
    imgElement.src = screenshotUrl;
    imgElement.onload = function () {
      this.style.opacity = '1';
      card.querySelector('.skeleton-loader').style.display = 'none';
    };
    imgElement.onerror = function () {
      this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg width="800" height="500" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23F6F1E6;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23E4D9C4;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grad)"/%3E%3Ctext x="50%25" y="50%25" font-family="sans-serif" font-size="22" font-weight="bold" fill="%236B6058" text-anchor="middle" dominant-baseline="middle"%3EPratinjau tidak tersedia%3C/text%3E%3C/svg%3E';
      this.style.opacity = '1';
      card.querySelector('.skeleton-loader').style.display = 'none';
    };

    container.appendChild(card);
  });

  // Newly injected .reveal cards need the observer re-applied.
  if (typeof initScrollReveal === 'function') initScrollReveal();
}

document.addEventListener('DOMContentLoaded', renderProjects);

/* ==========================================================================
   MODAL
   Project detail popup — native <dialog> element.
   ========================================================================== */

(function () {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const btnClose = document.getElementById('close-modal');
  let lastFocused = null;

  function openProjectModal(data, imgUrl) {
    lastFocused = document.activeElement;

    const modalImg = document.getElementById('modal-img');
    modalImg.src = imgUrl;
    modalImg.alt = `Pratinjau ${data.title}`;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc').textContent = data.desc;

    const modalLink = document.getElementById('modal-link');
    if (isSafeHttpUrl(data.url)) {
      modalLink.href = data.url;
    } else {
      modalLink.removeAttribute('href');
    }

    modal.showModal();
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function closeModal() {
    modal.close();
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  btnClose.addEventListener('click', closeModal);

  // Close when clicking the backdrop (outside modal-body).
  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) closeModal();
  });

  // Expose globally so projects.js can trigger it.
  window.openProjectModal = openProjectModal;
})();

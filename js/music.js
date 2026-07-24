/* ==========================================================================
   MUSIC PLAYER
   To add or replace a song: drop the mp3 in assets/music/, the cover in
   assets/music-cover/, then add or edit an entry in the `tracks` array.
   Everything else — the card, controls, equalizer — is generated for you.
   ========================================================================== */

const tracks = [
  {
    title: 'Seventeen',
    artist: 'JKT48',
    cover: '../assets/music-cover/seventeen.jpg',
    src: '../assets/music/seventeen.mp3'
  },
  {
    title: 'Only Today',
    artist: 'JKT48',
    cover: '../assets/music-cover/only-today.jpg',
    src: '../assets/music/only-today.mp3'
  },
  {
    title: 'Jiwaru Days',
    artist: 'JKT48',
    cover: '../assets/music-cover/jiwaru-days.jpg',
    src: '../assets/music/jiwaru-days.mp3'
  },
  {
    title: 'Honest Man',
    artist: 'JKT48',
    cover: '../assets/music-cover/honest-man.jpg',
    src: '../assets/music/honest-man.mp3'
  },
  {
    title: 'Kita Usahakan Rumah Itu',
    artist: 'Sal Priadi',
    cover: '../assets/music-cover/kita-usahakan-rumah-itu.jpg',
    src: '../assets/music/kita-usahakan-rumah-itu.mp3'
  },
  {
    title: 'Fairytale',
    artist: 'Alexander Rybak',
    cover: '../assets/music-cover/fairytale.jpg',
    src: '../assets/music/fairytale.mp3'
  }
];

function buildTrackCard(track, index) {
  const card = document.createElement('article');
  card.className = 'track-card reveal';
  card.dataset.index = index;

  card.innerHTML = `
    <div class="track-cover-wrap">
      <div class="vinyl-disc" aria-hidden="true"></div>
      <div class="track-cover">
        <img src="${escapeHTML(track.cover)}" alt="Sampul album ${escapeHTML(track.title)}" loading="lazy">
      </div>
    </div>

    <div class="track-info">
      <h2 class="track-title">${escapeHTML(track.title)}</h2>
      <div class="track-artist">
        <span>${escapeHTML(track.artist)}</span>
        <span class="equalizer" aria-hidden="true">
          <span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span>
        </span>
      </div>
      <div class="track-progress-row">
        <span class="time-label current" data-role="current-time">0:00</span>
        <div class="progress-bar" data-role="progress-bar">
          <div class="progress-fill" data-role="progress-fill"></div>
          <input type="range" min="0" max="100" value="0" step="0.1"
                 data-role="seek" aria-label="Posisi lagu ${escapeHTML(track.title)}">
        </div>
        <span class="time-label" data-role="duration">0:00</span>
      </div>
    </div>

    <div class="track-controls">
      <button class="btn-play" type="button" data-role="play-btn" aria-label="Putar ${escapeHTML(track.title)}">
        <svg class="icon-play" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        <svg class="icon-pause" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>
      </button>
      <div class="volume-row">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 10v4h4l5 5V5L7 10H3z"/></svg>
        <input type="range" min="0" max="1" step="0.01" value="0.85"
               data-role="volume" aria-label="Volume ${escapeHTML(track.title)}">
      </div>
    </div>

    <audio data-role="audio" src="${escapeHTML(track.src)}" preload="metadata"></audio>
  `;

  return card;
}

function initMusicPlayer() {
  const list = document.getElementById('music-list');
  if (!list) return;

  let currentlyPlaying = null; // holds the <article.track-card> currently active

  tracks.forEach((track, index) => {
    const card = buildTrackCard(track, index);
    list.appendChild(card);

    const audio = card.querySelector('[data-role="audio"]');
    const playBtn = card.querySelector('[data-role="play-btn"]');
    const seek = card.querySelector('[data-role="seek"]');
    const progressFill = card.querySelector('[data-role="progress-fill"]');
    const currentTimeEl = card.querySelector('[data-role="current-time"]');
    const durationEl = card.querySelector('[data-role="duration"]');
    const volume = card.querySelector('[data-role="volume"]');

    audio.volume = parseFloat(volume.value);

    audio.addEventListener('loadedmetadata', () => {
      durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      seek.value = pct;
      progressFill.style.setProperty('--progress', `${pct}%`);
      card.style.setProperty('--progress', `${pct}%`);
      currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
      card.classList.remove('is-playing');
      seek.value = 0;
      progressFill.style.setProperty('--progress', '0%');
      currentTimeEl.textContent = '0:00';
      if (currentlyPlaying === card) currentlyPlaying = null;
    });

    function play() {
      // Enforce "only one song at a time".
      if (currentlyPlaying && currentlyPlaying !== card) {
        const otherAudio = currentlyPlaying.querySelector('[data-role="audio"]');
        otherAudio.pause();
        currentlyPlaying.classList.remove('is-playing');
      }
      audio.play();
      card.classList.add('is-playing');
      currentlyPlaying = card;
    }

    function pause() {
      audio.pause();
      card.classList.remove('is-playing');
      if (currentlyPlaying === card) currentlyPlaying = null;
    }

    playBtn.addEventListener('click', () => {
      if (audio.paused) play(); else pause();
    });

    seek.addEventListener('input', () => {
      if (audio.duration) {
        audio.currentTime = (seek.value / 100) * audio.duration;
      }
    });

    volume.addEventListener('input', () => {
      audio.volume = clamp(parseFloat(volume.value), 0, 1);
    });
  });

  initScrollReveal();
}

document.addEventListener('DOMContentLoaded', initMusicPlayer);

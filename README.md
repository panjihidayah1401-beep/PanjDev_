# Panjdev — Portofolio Pribadi

Website portofolio pribadi Panji Hidayah (Panjdev). Dibangun dengan HTML, CSS, dan JavaScript murni — tanpa framework, tanpa proses build, tinggal buka dan edit.

---

## 📁 Struktur Proyek

```
portfolio/
│  index.html              → Halaman utama (beranda)
│  README.md               → File ini
│
├── assets/
│   ├── favicon/            → Ikon tab browser (favicon.svg)
│   ├── images/              → Gambar umum (kosong, siap dipakai)
│   ├── icons/                → Ikon tambahan (kosong, siap dipakai)
│   ├── music-cover/         → Sampul 6 lagu favorit
│   └── music/                → File MP3 6 lagu favorit
│
├── css/
│   ├── variables.css        → Semua warna, font, radius, shadow (mulai dari sini untuk re-tema)
│   ├── style.css             → Layout utama: header, hero, interests, sosial, proyek, modal, footer
│   ├── animations.css       → Semua @keyframes dan animasi
│   ├── music.css              → Gaya khusus halaman musik (kartu lagu, vinyl, equalizer)
│   └── responsive.css        → Penyesuaian tampilan di layar kecil
│
├── js/
│   ├── utils.js               → Fungsi bantu (escape HTML, format waktu, dll)
│   ├── animation.js         → Scroll reveal, titik-titik konstelasi di hero, efek ripple
│   ├── projects.js            → Data & render kartu proyek
│   ├── modal.js                → Logika popup detail proyek
│   ├── music.js                → Data & logika pemutar musik
│   └── main.js                 → Tahun footer, menu mobile, navigasi kartu musik
│
└── pages/
    └── music.html            → Halaman "Musik Favorit" (terpisah dari beranda)
```

---

## ✏️ Cara Mengubah Profil (Nama, Judul, Kutipan)

Buka **`index.html`**, cari bagian `<!-- HERO -->`:

```html
<h1>Halo, saya <em>Panji</em>.</h1>
<p class="hero-quote">"Tak ada yang terbaik di diriku..."</p>
```

Ganti teks di dalam `<h1>` dan `<p class="hero-quote">` sesuai keinginan. Kata di dalam `<em>...</em>` akan tampil miring berwarna olive.

Status badge ("Siswa Aktif") ada tepat di atasnya — ganti teks di dalam `<div class="status-badge">`.

Untuk minat (interest pills), tambah atau hapus blok `<div class="interest-item">...</div>` di dalam `.interests-grid`. Setiap blok berisi ikon SVG + teks label.

---

## 🎨 Cara Mengubah Warna

Semua warna terpusat di **`css/variables.css`**. Tidak perlu menyentuh file CSS lain.

```css
:root {
  --cream: #F6F1E6;      /* warna latar halaman */
  --olive: #5B6B34;      /* warna aksen utama (tombol, link, hover) */
  --olive-deep: #46531F; /* warna aksen saat hover/aktif */
  --gold: #AD8A54;       /* aksen kedua, dipakai halus di halaman musik */
  --ink: #26221D;        /* warna teks utama */
  --stone: #6B6058;      /* warna teks sekunder */
}
```

Ganti nilai hex-nya saja — seluruh website (tombol, border, hover, progress bar musik) otomatis mengikuti karena semua komponen memakai variabel ini, bukan warna langsung.

---

## 🔗 Cara Menambah / Mengubah Sosial Media

Buka **`index.html`**, cari `<!-- SOCIAL MEDIA -->`. Setiap akun adalah satu blok:

```html
<a href="https://x.com/panjihdyh_f" target="_blank" rel="noopener noreferrer" class="btn-social">
  <svg viewBox="0 0 24 24">...</svg>
  X (Twitter)
</a>
```

- **Ganti link:** ubah nilai `href`.
- **Tambah akun baru:** salin satu blok `<a class="btn-social">...</a>`, ganti `href`, ikon SVG, dan teks labelnya.
- **Hapus akun:** hapus blok `<a>` yang bersangkutan.

Ikon SVG bisa diambil gratis dari [Simple Icons](https://simpleicons.org/) — tinggal salin kode `<path>`-nya.

---

## 🎵 Cara Menambah / Mengganti Musik

Semua data lagu ada di **`js/music.js`**, dalam array `tracks`:

```js
{
  title: 'Seventeen',
  artist: 'JKT48',
  cover: '../assets/music-cover/seventeen.jpg',
  src: '../assets/music/seventeen.mp3'
}
```

**Untuk mengganti lagu yang sudah ada:**
1. Ganti file MP3 di `assets/music/` (nama file boleh sama, cukup timpa).
2. Ganti file cover di `assets/music-cover/`.
3. Sesuaikan `title` dan `artist` di `js/music.js` bila perlu.

**Untuk menambah lagu baru:**
1. Taruh file MP3 baru di `assets/music/`, dan cover di `assets/music-cover/`.
2. Tambah satu objek baru ke array `tracks` di `js/music.js`, isi `title`, `artist`, `cover`, dan `src` sesuai nama file.
3. Simpan — kartu lagu baru otomatis muncul di halaman musik, lengkap dengan player, progress bar, dan equalizer.

Tidak perlu mengubah HTML atau CSS sama sekali untuk menambah lagu.

---

## 🖼️ Cara Mengganti Cover Musik

Cukup timpa (replace) file gambar di `assets/music-cover/` dengan nama file yang sama, atau ganti path `cover` di `js/music.js` jika memakai nama file baru. Rasio persegi (1:1) paling pas untuk tampilan kartu.

---

## 💼 Cara Menambah Proyek Baru

Semua proyek ada di **`js/projects.js`**, dalam array `projects`:

```js
{
  title: 'TikDownloader HD',
  url: 'https://tiksdownloaders.vercel.app/',
  desc: 'Unduh video tanpa watermark, foto, dan musik MP3 dari TikTok dengan kualitas terbaik.'
}
```

Untuk menambah proyek baru, tambahkan satu objek baru ke dalam array, hanya berisi `title`, `url`, dan `desc`. Sisanya — pratinjau screenshot otomatis (via API [WordPress mshots](https://s0.wp.com/mshots/)), kartu, animasi hover, dan popup detail — akan dibuat otomatis oleh `js/projects.js`.

```js
const projects = [
  { title: 'TikDownloader HD', url: '...', desc: '...' },
  { title: 'Nama Proyek Kedua', url: 'https://proyek-kedua.com', desc: 'Deskripsi proyek kedua.' }
];
```

---

## ✏️ Cara Mengedit Deskripsi Proyek

Cukup ubah teks `desc` pada proyek yang bersangkutan di `js/projects.js`. Tidak perlu menyentuh file lain.

---

## 🚀 Cara Deploy

Website ini murni statis (HTML/CSS/JS), jadi bisa di-deploy ke platform gratis mana pun tanpa proses build:

**Vercel**
1. Push folder ini ke repository GitHub.
2. Buka [vercel.com](https://vercel.com) → New Project → pilih repository → Deploy.

**Netlify**
1. Buka [app.netlify.com/drop](https://app.netlify.com/drop).
2. Seret (drag & drop) folder `portfolio` ke halaman tersebut. Selesai — tidak perlu akun GitHub.

**GitHub Pages**
1. Push folder ini ke repository GitHub bernama `username.github.io`, atau ke repository biasa lalu aktifkan GitHub Pages di Settings → Pages → pilih branch `main` dan folder `/root`.
2. Website akan aktif di `https://username.github.io/`.

> Catatan: karena `pages/music.html` memakai path relatif (`../css/`, `../js/`, `../assets/`), pastikan struktur folder tetap utuh persis seperti saat diunduh — jangan pindahkan file satu-satu.

---

## ✅ Aksesibilitas & Performa yang Sudah Diterapkan

- Navigasi keyboard penuh (Tab, Enter, Spasi) untuk kartu proyek, kartu musik, dan tombol menu
- Fokus terlihat jelas (outline) di semua elemen interaktif
- Label ARIA pada tombol ikon dan kontrol pemutar musik
- HTML semantik (`header`, `main`, `footer`, `section`, `dialog`)
- Menghormati preferensi `prefers-reduced-motion` — animasi otomatis dikurangi untuk pengguna yang sensitif terhadap gerakan
- Gambar proyek memakai `loading="lazy"` dan fallback otomatis jika gagal dimuat
- Content Security Policy dasar di setiap halaman untuk mencegah injeksi skrip

Selamat mengembangkan portofolionya! 🌿

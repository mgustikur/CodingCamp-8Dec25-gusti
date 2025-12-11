# 📝 Todo List Application

Aplikasi web sederhana untuk mengelola daftar tugas (to-do list) dengan fitur lengkap dan tampilan responsif.

## 🌟 Fitur Utama

- ✅ **Tambah & Hapus Tugas** - Kelola tugas dengan mudah
- 🔍 **Pencarian** - Cari tugas berdasarkan nama
- 🎯 **Filter Status** - Tampilkan semua, pending, atau completed
- 📊 **Statistik Real-time** - Lihat total, completed, dan pending tasks
- 📅 **Tanggal Jatuh Tempo** - Setiap tugas wajib memiliki tanggal
- 🗑️ **Delete All** - Hapus semua tugas sekaligus
- 📱 **Responsive Design** - Tampil sempurna di desktop dan mobile
- ♿ **Accessibility** - Semantic HTML dan ARIA labels

## 📁 Struktur File
```
project-folder/
│
├── index.html          # File HTML utama
├── css/
│   └── style.css      # File styling CSS
└── js/
    └── script.js      # File JavaScript
```

## 🚀 Cara Menggunakan

### 1. Setup Lokal

1. Clone atau download repository ini
2. Pastikan struktur folder sesuai dengan di atas
3. Buka `index.html` di browser

### 2. Menggunakan Aplikasi

#### Menambah Tugas Baru
1. Ketik nama tugas di input "Add a todo..."
2. Pilih tanggal jatuh tempo (wajib diisi)
3. Klik tombol `+` atau tekan `Enter`

#### Filter Tugas
- **ALL** - Tampilkan semua tugas
- **PENDING** - Tampilkan tugas yang belum selesai
- **COMPLETED** - Tampilkan tugas yang sudah selesai

#### Mencari Tugas
- Ketik kata kunci di kolom "Search tasks..."
- Hasil akan muncul secara real-time

#### Mengelola Tugas
- **Mark Complete** - Klik tombol `✓` untuk menandai selesai
- **Mark Pending** - Klik tombol `↩` untuk kembalikan ke pending
- **Delete** - Klik tombol `✕` untuk hapus tugas
- **Delete All** - Klik tombol "Delete All" untuk hapus semua tugas

## 📊 Statistik

Dashboard menampilkan 3 statistik utama:
- **Total Tasks** - Jumlah total semua tugas
- **Completed** - Jumlah tugas yang sudah selesai
- **Pending** - Jumlah tugas yang belum selesai

## 🎨 Teknologi yang Digunakan

- **HTML5** - Semantic markup
- **CSS3** - Styling dengan Flexbox & Grid
- **Vanilla JavaScript** - Tanpa framework/library
- **Responsive Design** - Mobile-first approach

## 📱 Kompatibilitas

Aplikasi ini kompatibel dengan:
- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Edge
- ✅ Opera

## 🔧 Validasi Form

Aplikasi memiliki validasi:
- ❌ Nama tugas tidak boleh kosong
- ❌ Tanggal jatuh tempo wajib diisi
- ⚠️ Konfirmasi sebelum delete all

## 🎯 Best Practices

### HTML
- ✅ Semantic HTML5 elements (`<main>`, `<section>`, `<article>`, `<nav>`)
- ✅ Proper use of `<label>` untuk form inputs
- ✅ ARIA attributes untuk accessibility
- ✅ `<time>` element dengan datetime attribute

### CSS
- ✅ Mobile-first responsive design
- ✅ CSS Grid & Flexbox layout
- ✅ Smooth transitions & animations
- ✅ Focus indicators untuk accessibility
- ✅ Screen reader only class (`.sr-only`)

### JavaScript
- ✅ ES6+ modern JavaScript
- ✅ Clean & readable code
- ✅ Proper event handling
- ✅ No global pollution
- ✅ Accessibility announcements

## 📤 Deploy ke GitHub Pages

1. Push code ke GitHub repository
2. Masuk ke **Settings** > **Pages**
3. Di **Source**, pilih branch `main` dan folder `root`
4. Klik **Save**
5. Website akan tersedia di `https://username.github.io/repo-name/`

## 🐛 Troubleshooting

### Todo tidak muncul?
- Pastikan JavaScript sudah aktif di browser
- Check browser console untuk error (F12)

### Styling tidak muncul?
- Pastikan path CSS benar: `css/style.css`
- Check struktur folder sesuai dokumentasi

### Tanggal tidak bisa dipilih?
- Pastikan browser support HTML5 date input
- Gunakan browser modern (Chrome, Firefox, Safari)

## 📝 Catatan Penting

- ⚠️ Data tersimpan di **memory** saja (hilang saat refresh)
- 🔄 Untuk persistent storage, perlu tambah localStorage/database
- 📱 Tampilan optimal di layar 320px ke atas

## 👨‍💻 Pengembang

Dibuat sebagai mini project untuk pembelajaran web development.

## 📄 Lisensi

Free to use untuk pembelajaran dan pengembangan pribadi.

---

**Happy Coding! 🚀**
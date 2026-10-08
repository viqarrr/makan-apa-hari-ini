# User Story

Setiap user story diberi nomor. Pakai nomor ini di prompt ("kerjakan US-01") dan di pesan commit (`US-01: katalog dari database`).

## Wajib

### US-01 Katalog dari database

Sebagai pengunjung, saya ingin melihat semua produk toko dalam satu halaman, supaya saya tahu apa saja yang dijual.

Kriteria selesai:

- Halaman `/` menampilkan semua produk dari tabel `produk` di Supabase, bukan dari `lib/data-contoh.js`.
- Data diambil di sisi server.
- Setiap kartu menampilkan foto, kategori, nama, dan harga dalam format rupiah.
- Jika belum ada produk, halaman menampilkan pesan yang jelas.

### US-02 Detail produk

Sebagai pengunjung, saya ingin melihat detail satu produk, supaya saya yakin sebelum memesan.

Kriteria selesai:

- Halaman `/produk/[id]` menampilkan foto, kategori, nama, harga, dan deskripsi dari database.
- Produk yang tidak ada menampilkan halaman "tidak ditemukan".

### US-03 Pesan via WhatsApp

Sebagai pengunjung, saya ingin menekan satu tombol untuk memesan lewat WhatsApp, supaya saya tidak perlu mengetik ulang nama produk.

Kriteria selesai:

- Tombol "Pesan via WhatsApp" membuka WhatsApp ke nomor di `lib/toko.js`.
- Pesan sudah terisi otomatis dengan nama dan harga produk.
- Berfungsi di HP dan di laptop.

### US-04 Login admin

Sebagai admin, saya ingin masuk dengan email dan password, supaya hanya saya yang bisa mengelola toko.

Kriteria selesai:

- Login memakai Supabase Auth, diproses di server.
- Login berhasil mengarah ke `/admin`; login gagal menampilkan pesan yang jelas.
- Tombol "Keluar" mengakhiri sesi dan kembali ke halaman login.

### US-05 Ganti password

Sebagai admin, saya ingin mengganti password, supaya password bawaan tidak bisa dipakai orang lain.

Kriteria selesai:

- Form di `/admin/password` mengganti password admin yang sedang login.
- Password baru minimal 8 karakter dan harus sama dengan konfirmasinya.
- Menampilkan pesan berhasil atau pesan error yang jelas.

### US-06 Proteksi halaman admin

Sebagai admin, saya ingin halaman admin tertutup untuk orang lain, supaya data toko aman.

Kriteria selesai:

- Membuka halaman `/admin` mana pun tanpa login akan dialihkan ke `/admin/login`.
- Setiap aksi yang mengubah data memeriksa login di server.

## Bonus

### US-07 List Produk
ebagai admin, saya ingin produk pada page `/admin` mengambil data dari database.

Kriteria Penerimaan:

* Halaman `/admin` me-render daftar hidangan melalui `TabelProduk.jsx` dari tabel Supabase.
* Menampilkan thumbnail gambar, nama menu, kategori hari rilis, kuota slot porsi, harga Rupiah, dan tombol aksi kelola.

### US-08 Tambah produk

Sebagai admin, saya ingin menambah produk baru dari halaman admin. Kriteria: form di `/admin/produk/baru` menyimpan produk ke database, lalu kembali ke `/admin`.

Kriteria Penerimaan:

* Form menyediakan input nama menu, kategori jadwal hari, kuota slot porsi, harga, deskripsi porsi/gizi, dan URL foto.
* Menyimpan entri baru ke tabel `produk` dan otomatis kembali ke `/admin`.
* Aksi form terlindungi dan hanya bisa dijalankan jika sesi login admin aktif.

### US-09 Ubah produk

ebagai admin, saya ingin mengubah data produk. Kriteria: form di `/admin/produk/[id]/ubah` terisi data lama dan menyimpan perubahan ke database.

Kriteria Penerimaan:

* Form di `/admin/produk/[id]/ubah` otomatis menampilkan data lama produk berdasarkan ID.
* Menyimpan perubahan data ke tabel database dan memperbarui tampilan publik.
* Aksi perubahan data terlindungi dan hanya bisa diproses jika sesi login admin aktif.

### US-10 Hapus produk

Sebagai admin, saya ingin menghapus produk. Kriteria: tombol "Hapus" meminta konfirmasi, lalu menghapus produk dari database.

Kriteria Penerimaan:

* Tombol "Hapus" pada tabel admin memunculkan dialog konfirmasi sebelum penghapusan.
* Menghapus baris produk terkait dari database dan langsung memperbarui tampilan tabel.
* Aksi penghapusan terlindungi dan hanya bisa diproses jika sesi login admin aktif.

### US-11 Filter kategori atau pencarian

Sebagai pengunjung, saya ingin menyaring produk berdasarkan kategori atau mencari nama produk.

Kriteria Penerimaan:

* Tersedia input pencarian teks dan filter chip kategori jadwal hari rilis di halaman utama.
* Tampilan kartu menu tersaring secara instan sesuai pencarian nama hidangan atau hari yang dipilih.

### US-12 Pilih jumlah atau varian

Sebagai pengunjung, saya ingin memilih jumlah atau varian sebelum memesan, dan pilihan itu ikut tertulis di pesan WhatsApp.

Kriteria Penerimaan:

* Halaman detail menu `/produk/[id]` menyediakan pemilih jumlah porsi (maksimal sesuai sisa slot unit) dan opsi varian hidangan.
* Tombol WhatsApp otomatis merangkai parameter URL `encodeURIComponent` dengan draf pesan:
> "Halo Makan Apa Hari Ini, saya ingin memesan [Nama Menu] sebanyak [Jumlah] porsi untuk hari [Hari Rilis] seharga total [Total Harga]. Alamat pengantaran: (isi alamat/shareloc)."

### US-13 PWA

Sebagai pengunjung, saya ingin memasang katalog di layar HP seperti aplikasi. Ikon tersedia di `public/icons`.

Kriteria Penerimaan:

* File `manifest.json` terdaftar pada `app/layout.jsx`.
* Menggunakan ikon dari direktori `public/icons/icon-192.png` dan `public/icons/icon-512.png`.
* Prompt instalasi aplikasi dapat muncul pada peramban seluler yang mendukung.

### US-14 Deskripsi produk dibuat AI

Sebagai admin, saya ingin membuat deskripsi produk secara otomatis dengan AI (Gemini API) dari nama dan kategori produk.

Kriteria Penerimaan:

* Tersedia tombol pemicu generator AI di samping input deskripsi pada form produk admin.
* Mengirimkan nama menu dan kategori hari ke route handler backend menggunakan Gemini API key.
* Hasil deskripsi ringkas tanpa karakter em-dash otomatis masuk mengisi input formulir deskripsi produk.

Catatan: bonus US-08, US-09, dan US-10 hanya dihitung jika aksinya terlindungi login.

### US-EXTRA-01: Migrasi Skema Database Katering Pre-Order
Sebagai sistem backend, saya ingin menambahkan kolom jadwal hari rilis, kuota porsi harian, dan instruksi logistik ke tabel `produk` tanpa merusak data yang sudah ada.

Kriteria Penerimaan:
* Eksekusi kueri SQL di SQL Editor Supabase sebelum menjalankan form admin.
* Menambahkan kolom opsional dengan nilai bawaan aman agar data yang tersimpan sebelumnya tetap valid.

```sql
ALTER TABLE produk 
ADD COLUMN IF NOT EXISTS hari_rilis VARCHAR(20) DEFAULT 'Senin',
ADD COLUMN IF NOT EXISTS slot_tersedia INT DEFAULT 15,
ADD COLUMN IF NOT EXISTS catatan_pengiriman TEXT DEFAULT 'Pengiriman via kurir instan mulai pukul 11.00 WIB.';
```

### US-EXTRA-02: Standar Desain Apple HIG dan Anti-Slop (Globals & Tokens)

Sebagai pengunjung, saya ingin antarmuka katalog menggunakan palet warna solid, tipografi proporsional, dan terbebas dari dekorasi berlebih.

Kriteria Penerimaan:

* Menggunakan palet: Canvas White `#ffffff`, Parchment `#f5f5f7`, Ink `#1d1d1f`, dan aksen tunggal Action Blue `#0066cc`.
* Tombol aksi menggunakan bentuk pill (`rounded-full`), micro-interaction klik `scale-[0.95]`, tanpa drop shadow pada teks maupun tombol.
* Bayangan hanya diterapkan pada foto produk dengan nilai `rgba(0,0,0,0.22) 3px 5px 30px 0`.
* Tidak ada karakter em-dash pada seluruh teks antarmuka, judul, maupun detail menu.
* Seluruh label tombol aksi muat dalam satu baris pada tampilan desktop tanpa terpotong.


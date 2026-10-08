-- ==============================================================================
-- SEED DATA MENU KATERING: MAKAN APA HARI INI
-- Cara eksekusi:
-- 1. Buka Supabase Dashboard > Pilih Proyek Anda.
-- 2. Masuk ke menu "SQL Editor" di bilah samping kiri.
-- 3. Buat "New query", tempel seluruh isi script ini, lalu tekan "Run".
-- ==============================================================================

-- 1. Pastikan kolom-kolom pendukung katering sudah tersedia pada tabel produk
ALTER TABLE public.produk 
ADD COLUMN IF NOT EXISTS hari_rilis VARCHAR(20) DEFAULT 'Senin',
ADD COLUMN IF NOT EXISTS slot_tersedia INT DEFAULT 15,
ADD COLUMN IF NOT EXISTS catatan_pengiriman TEXT DEFAULT 'Pengiriman via kurir instan mulai pukul 11.00 WIB.';

-- 2. Bersihkan data contoh awal yang lama (opsional: unkomentari baris di bawah jika ingin mengosongkan tabel)
-- TRUNCATE TABLE public.produk RESTART IDENTITY CASCADE;

-- 3. Masukkan Seed Data Menu Katering Terencana (Senin sampai Jumat)
INSERT INTO public.produk (nama, harga, deskripsi, foto_url, kategori, hari_rilis, slot_tersedia, catatan_pengiriman)
VALUES
  -- SENIN
  (
    'Nasi Ayam Bakar Madu Lengkap',
    35000,
    'Ayam bakar berlumur bumbu madu gurih manis, disajikan dengan nasi putih pulen, tahu tempe bacem, lalapan segar, dan sambal terasi matang. Porsi pas berenergi untuk memulai awal pekan.',
    'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80',
    'Senin',
    'Senin',
    20,
    'Pengantaran kurir terjadwal mulai pukul 11.00 WIB langsung ke lokasi Anda.'
  ),
  (
    'Beef Teriyaki Rice Bowl',
    42000,
    'Irisan daging sapi empuk dengan saus teriyaki racikan khas gurih manis, dilengkapi tumis brokoli wortel renyah dan taburan biji wijen di atas nasi hangat.',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    'Senin',
    'Senin',
    15,
    'Pengantaran kurir terjadwal mulai pukul 11.00 WIB langsung ke lokasi Anda.'
  ),

  -- SELASA
  (
    'Nasi Liwet Ayam Suwir Gurih',
    32000,
    'Nasi liwet wangi rempah dengan aroma santan dan serai, dipadukan suwiran ayam bumbu kuning, telur pindang gurih, orek tempe renyah, dan sambal bajak.',
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
    'Selasa',
    'Selasa',
    18,
    'Pengantaran kurir terjadwal mulai pukul 11.00 WIB langsung ke lokasi Anda.'
  ),
  (
    'Salmon Mentai Rice Bowl',
    48000,
    'Potongan salmon panggang segar dengan lumuran saus mentai gurih lembut dan sentuhan tobiko renyah di atas nasi berbalut rumput laut nori.',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    'Selasa',
    'Selasa',
    12,
    'Pengantaran kurir terjadwal mulai pukul 11.00 WIB langsung ke lokasi Anda.'
  ),

  -- RABU
  (
    'Nasi Rendang Daging Padang',
    40000,
    'Potongan daging sapi empuk yang dimasak perlahan dengan rempah minang dan santan kental, disajikan lengkap dengan sayur nangka muda dan sambal ijo segar.',
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
    'Rabu',
    'Rabu',
    16,
    'Pengantaran kurir terjadwal mulai pukul 11.00 WIB langsung ke lokasi Anda.'
  ),
  (
    'Ayam Geprek Sambal Korek',
    28000,
    'Ayam goreng tepung krispi dengan ulekan cabai rawit merah pedas mantap, disajikan bersama nasi hangat, timun segar, dan tahu goreng empuk.',
    'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80',
    'Rabu',
    'Rabu',
    25,
    'Pengantaran kurir terjadwal mulai pukul 11.00 WIB langsung ke lokasi Anda.'
  ),

  -- KAMIS
  (
    'Nasi Uduk Komplit Semur Daging',
    38000,
    'Nasi uduk harum bertabur bawang goreng renyah, ditemani semur daging gurih empuk, bihun goreng, telur balado, dan kerupuk renyah.',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
    'Kamis',
    'Kamis',
    15,
    'Pengantaran kurir terjadwal mulai pukul 11.00 WIB langsung ke lokasi Anda.'
  ),
  (
    'Chicken Katsu Curry Rice',
    36000,
    'Fillet dada ayam renyah keemasan berpadu dengan kuah kari jepang kaya aroma, potongan wortel dan kentang lembut di atas nasi hangat pulen.',
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80',
    'Kamis',
    'Kamis',
    20,
    'Pengantaran kurir terjadwal mulai pukul 11.00 WIB langsung ke lokasi Anda.'
  ),

  -- JUMAT
  (
    'Nasi Kuning Cakalang Suwir Manado',
    35000,
    'Nasi kuning rempah khas dengan topping ikan cakalang asap suwir berbumbu pedas harum, perkedel kentang lembut, dan irisan telur dadar tipis.',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
    'Jumat',
    'Jumat',
    20,
    'Pengantaran kurir terjadwal mulai pukul 11.00 WIB langsung ke lokasi Anda.'
  ),
  (
    'Nasi Kebuli Daging Sapi Rempah',
    45000,
    'Nasi kebuli bertabur kismis dan rempah kapulaga kayu manis yang kaya rasa, disajikan bersama irisan daging sapi empuk serta acar nanas segar penutup pekan.',
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    'Jumat',
    'Jumat',
    14,
    'Pengantaran kurir terjadwal mulai pukul 11.00 WIB langsung ke lokasi Anda.'
  );


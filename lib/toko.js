// Identitas toko. Ganti dengan data usahamu (lihat lembar kustomisasi).
export const toko = {
  nama: "makan apa hari ini?",
  tagline: "Apapun kegiatanmu, pastikan perutmu terisi hari ini.",
  // Format internasional tanpa tanda + dan tanpa angka 0 di depan. Contoh: 6281234567890
  nomorWhatsApp: process.env.WHATSAPP_NUMBER || "6281234567890",
  alamat: "Jl. Contoh No. 1, Kota Anda",
  jamBuka: "Setiap hari, 08.00 - 20.00",
};

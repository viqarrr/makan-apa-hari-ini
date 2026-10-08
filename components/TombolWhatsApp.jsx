import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

export default function TombolWhatsApp({ produk, jumlah = 1 }) {
  const hariRilis = produk.hari_rilis || produk.kategori || "Senin";
  const totalHarga = (produk.harga || 0) * jumlah;
  const pesan = `Halo Makan Apa Hari Ini, saya ingin memesan ${produk.nama} sebanyak ${jumlah} porsi untuk hari ${hariRilis} seharga total ${formatRupiah(totalHarga)}. Alamat pengantaran: (isi alamat/shareloc).`;
  const url = `https://wa.me/${toko.nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center rounded-full bg-[#0066cc] px-6 py-3.5 text-[17px] font-medium text-white transition-transform active:scale-[0.95] whitespace-nowrap"
    >
      Pesan via WhatsApp
    </a>
  );
}

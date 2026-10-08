import Link from "next/link";
import { formatRupiah } from "@/lib/format";

export default function KartuProduk({ produk }) {
  const hariRilis = produk.hari_rilis || produk.kategori || "Senin";
  const slot = produk.slot_tersedia ?? 15;

  return (
    <article className="flex flex-col rounded-[18px] border border-[#e0e0e0] bg-white p-5">
      {/* Foto hidangan 1:1 di bagian atas dengan bayangan sistem produk */}
      <Link href={`/produk/${produk.id}`} className="group block overflow-hidden rounded-[14px]">
        <img
          src={produk.foto_url}
          alt={produk.nama}
          className="food-shadow aspect-square w-full rounded-[14px] bg-[#f5f5f7] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        {/* Label hari rilis dan kuota porsi tersisa */}
        <div className="flex items-center justify-between text-[12px] text-[#7a7a7a]">
          <span>Hari {hariRilis}</span>
          <span>Sisa {slot} Porsi</span>
        </div>

        {/* Nama hidangan (font 17px tebal) */}
        <Link href={`/produk/${produk.id}`} className="mt-1">
          <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-[#1d1d1f] hover:text-[#0066cc]">
            {produk.nama}
          </h3>
        </Link>

        {/* Harga Rupiah yang jelas */}
        <p className="mt-2 text-[17px] font-medium text-[#1d1d1f]">
          {formatRupiah(produk.harga)}
        </p>

        {/* Tombol pill "Pesan Porsi" warna Action Blue */}
        <div className="mt-auto pt-4">
          <Link
            href={`/produk/${produk.id}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#0066cc] px-4 py-2.5 text-[14px] font-medium text-white transition-transform active:scale-[0.95] whitespace-nowrap"
          >
            Pesan Porsi
          </Link>
        </div>
      </div>
    </article>
  );
}

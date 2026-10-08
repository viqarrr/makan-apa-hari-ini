import Link from "next/link";
import { notFound } from "next/navigation";
import PemesananProduk from "@/components/PemesananProduk";
import { formatRupiah } from "@/lib/format";
import { buatKoneksiServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanDetailProduk({ params }) {
  const { id } = await params;
  const supabase = buatKoneksiServer();

  const { data: produk, error } = await supabase
    .from("produk")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !produk) {
    notFound();
  }

  const hariRilis = produk.hari_rilis || produk.kategori || "Senin";
  const slot = produk.slot_tersedia ?? 15;

  return (
    <article className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      {/* Tautan Kembali */}
      <nav className="mb-6">
        <Link
          href="/"
          className="text-[14px] text-[#0066cc] hover:underline"
        >
          Semua Menu
        </Link>
      </nav>

      {/* Grid Detail Hidangan: Photography-First */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        {/* Foto Hidangan Besar Berpusat di Layar dengan Bayangan Sistem Produk */}
        <div className="flex justify-center lg:col-span-7">
          <div className="w-full max-w-lg overflow-hidden rounded-[18px]">
            <img
              src={produk.foto_url}
              alt={produk.nama}
              className="food-shadow aspect-square w-full rounded-[18px] bg-[#f5f5f7] object-cover"
            />
          </div>
        </div>

        {/* Panel Informasi & Konfigurasi Ringkas */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[13px] text-[#7a7a7a]">
              <span>Hari {hariRilis}</span>
              <span>•</span>
              <span>Sisa {slot} Porsi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-[#1d1d1f] leading-tight">
              {produk.nama}
            </h1>
            <p className="text-[21px] font-semibold text-[#1d1d1f]">
              {formatRupiah(produk.harga)}{" "}
              <span className="text-[14px] font-normal text-[#7a7a7a]">/ porsi</span>
            </p>
          </div>

          <p className="text-[17px] leading-[1.47] text-[#1d1d1f]">
            {produk.deskripsi}
          </p>

          {/* Panel Konfigurasi Ringkas */}
          <PemesananProduk produk={produk} />
        </div>
      </div>
    </article>
  );
}

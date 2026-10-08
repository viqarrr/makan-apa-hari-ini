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

  return (
    <article className="grid gap-8 py-8 md:grid-cols-2 md:py-12">
      <img
        src={produk.foto_url}
        alt={produk.nama}
        className="aspect-square w-full rounded-2xl border border-garis bg-permukaan object-cover"
      />
      <div className="flex flex-col gap-4">
        <Link href="/" className="text-sm text-teks-lembut underline underline-offset-4 hover:text-utama">
          Kembali ke katalog
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-utama/10 px-3 py-0.5 text-xs font-semibold text-utama">
            Hari {hariRilis}
          </span>
          {produk.kategori && produk.kategori !== hariRilis && (
            <span className="text-xs text-teks-lembut">{produk.kategori}</span>
          )}
        </div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight">{produk.nama}</h1>
        <p className="self-start rounded-md bg-harga-latar px-3 py-1 text-xl font-bold text-harga">
          {formatRupiah(produk.harga)} <span className="text-xs font-normal text-harga/80">/ porsi</span>
        </p>
        <p className="max-w-prose leading-relaxed text-teks-lembut">{produk.deskripsi}</p>
        {produk.catatan_pengiriman && (
          <p className="rounded-lg border border-garis bg-permukaan px-3 py-2 text-xs text-teks-lembut">
            📦 {produk.catatan_pengiriman}
          </p>
        )}
        <PemesananProduk produk={produk} />
      </div>
    </article>
  );
}

import KatalogInteraktif from "@/components/KatalogInteraktif";
import { buatKoneksiServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog() {
  let daftarProduk = [];
  let pesanError = null;

  try {
    const supabase = buatKoneksiServer();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      pesanError = `Gagal mengambil data produk: ${error.message}`;
    } else {
      daftarProduk = data || [];
    }
  } catch (err) {
    pesanError = `Gagal terhubung ke database: ${err.message}`;
  }

  return (
    <div className="w-full">
      {/* Hero Section: Left-aligned minimalis, langsung mengarahkan ke etalase menu tanpa scroll berlebih */}
      <section className="mx-auto max-w-5xl px-4 pt-10 pb-6 sm:pt-14 sm:pb-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-[#1d1d1f] leading-none">
            Makan apa hari ini?
          </h1>
          <p className="text-[17px] leading-[1.47] text-[#7a7a7a] max-w-2xl">
            Katering harian terencana dengan bahan segar. Pilih menu hari ini, santap tepat waktu.
          </p>
        </div>
      </section>

      {/* Etalase Menu Section */}
      <section aria-label="Katalog Menu" className="mx-auto max-w-5xl px-4 pb-16">
        {pesanError ? (
          <div className="rounded-[18px] border border-[#e0e0e0] bg-[#f5f5f7] p-5 text-sm text-[#d70015]">
            <p className="font-semibold">{pesanError}</p>
          </div>
        ) : daftarProduk.length === 0 ? (
          <div className="rounded-[18px] border border-[#e0e0e0] bg-[#f5f5f7] p-8 text-center text-[17px] text-[#7a7a7a]">
            Belum ada menu tersedia saat ini.
          </div>
        ) : (
          <KatalogInteraktif daftarProduk={daftarProduk} />
        )}
      </section>
    </div>
  );
}

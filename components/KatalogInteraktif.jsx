"use client";

import { useState } from "react";
import KartuProduk from "@/components/KartuProduk";

const DAFTAR_HARI = ["Semua", "Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

export default function KatalogInteraktif({ daftarProduk = [] }) {
  const [kataKunci, setKataKunci] = useState("");
  const [hariTerpilih, setHariTerpilih] = useState("Semua");

  const produkTersaring = daftarProduk.filter((produk) => {
    const nama = (produk.nama || "").toLowerCase();
    const query = kataKunci.toLowerCase().trim();
    const cocokNama = !query || nama.includes(query);

    const hari = (produk.hari_rilis || produk.kategori || "").toLowerCase();
    const cocokHari =
      hariTerpilih === "Semua" || hari === hariTerpilih.toLowerCase();

    return cocokNama && cocokHari;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        {/* Input Pencarian */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            placeholder="Cari nama menu..."
            className="w-full rounded-full border border-garis bg-latar px-4 py-2.5 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
          />
          {kataKunci && (
            <button
              type="button"
              onClick={() => setKataKunci("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-teks-lembut hover:text-teks"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Filter Chip Hari Rilis */}
        <div className="flex flex-wrap gap-2">
          {DAFTAR_HARI.map((hari) => {
            const aktif = hariTerpilih === hari;
            return (
              <button
                key={hari}
                type="button"
                onClick={() => setHariTerpilih(hari)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  aktif
                    ? "bg-utama text-white"
                    : "border border-garis bg-latar text-teks-lembut hover:border-utama hover:text-utama"
                }`}
              >
                {hari}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Produk atau Pesan Kosong */}
      {produkTersaring.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-garis bg-permukaan p-8 text-center text-sm text-teks-lembut">
          Tidak ada menu yang sesuai dengan pencarian atau filter yang dipilih.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {produkTersaring.map((produk) => (
            <KartuProduk key={produk.id} produk={produk} />
          ))}
        </div>
      )}
    </div>
  );
}


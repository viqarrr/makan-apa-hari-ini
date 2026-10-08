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
    <div className="flex flex-col gap-8">
      {/* Kontrol Pencarian dan Filter Jadwal Hari */}
      <div className="flex flex-col gap-4">
        {/* Apple Style Search Input Pill */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            placeholder="Cari hidangan katering..."
            className="h-11 w-full rounded-full border border-[#e0e0e0] bg-white px-5 pr-14 text-[14px] text-[#1d1d1f] placeholder:text-[#7a7a7a] focus:border-[#0066cc] focus:outline-none"
          />
          {kataKunci && (
            <button
              type="button"
              onClick={() => setKataKunci("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-[#7a7a7a] hover:text-[#1d1d1f]"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Filter Chip Horizontal Pill Penuh */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {DAFTAR_HARI.map((hari) => {
            const aktif = hariTerpilih === hari;
            return (
              <button
                key={hari}
                type="button"
                onClick={() => setHariTerpilih(hari)}
                className={`rounded-full px-4 py-2 text-[14px] font-medium transition-transform active:scale-[0.95] whitespace-nowrap ${
                  aktif
                    ? "bg-[#0066cc] text-white"
                    : "border border-[#e0e0e0] bg-white text-[#1d1d1f] hover:border-[#0066cc]"
                }`}
              >
                {hari}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Hidangan Apple Store Utility Card atau Pesan Kosong */}
      {produkTersaring.length === 0 ? (
        <div className="rounded-[18px] border border-[#e0e0e0] bg-[#f5f5f7] p-10 text-center text-[17px] text-[#7a7a7a]">
          Tidak ada hidangan yang cocok dengan pencarian atau hari yang dipilih.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produkTersaring.map((produk) => (
            <KartuProduk key={produk.id} produk={produk} />
          ))}
        </div>
      )}
    </div>
  );
}

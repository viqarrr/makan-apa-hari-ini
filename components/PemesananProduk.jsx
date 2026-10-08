"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/format";
import TombolWhatsApp from "@/components/TombolWhatsApp";

export default function PemesananProduk({ produk }) {
  const maxSlot = Math.max(1, produk.slot_tersedia ?? 15);
  const [jumlah, setJumlah] = useState(1);

  const totalHarga = (produk.harga || 0) * jumlah;

  const handleKurang = () => {
    setJumlah((prev) => Math.max(1, prev - 1));
  };

  const handleTambah = () => {
    setJumlah((prev) => Math.min(maxSlot, prev + 1));
  };

  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      setJumlah(1);
    } else {
      setJumlah(Math.max(1, Math.min(maxSlot, val)));
    }
  };

  return (
    <div className="flex flex-col gap-5 rounded-[18px] border border-[#e0e0e0] bg-[#f5f5f7] p-6">
      {/* Pemilih Jumlah Porsi */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-[14px] font-semibold text-[#1d1d1f]">Jumlah Porsi</span>
          <p className="text-[12px] text-[#7a7a7a]">
            Tersisa {maxSlot} porsi
          </p>
        </div>

        <div className="flex items-center rounded-full border border-[#e0e0e0] bg-white px-1 py-1">
          <button
            type="button"
            onClick={handleKurang}
            disabled={jumlah <= 1}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[16px] font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] active:scale-[0.95] disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Kurangi porsi"
          >
            -
          </button>
          <input
            type="number"
            min={1}
            max={maxSlot}
            value={jumlah}
            onChange={handleChange}
            className="h-8 w-10 text-center text-[14px] font-semibold text-[#1d1d1f] focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={handleTambah}
            disabled={jumlah >= maxSlot}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[16px] font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] active:scale-[0.95] disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Tambah porsi"
          >
            +
          </button>
        </div>
      </div>

      {/* Ringkasan Porsi & Estimasi Gizi */}
      <div className="border-t border-[#e0e0e0] pt-4 text-[13px] text-[#7a7a7a] flex flex-col gap-1.5">
        <p className="text-[#1d1d1f]">
          <span className="font-semibold">{jumlah} porsi siap santap.</span> Porsi seimbang, estimasi 500 sampai 650 kkal per sajian.
        </p>
        <p>
          Jadwal pengiriman jam 11.00 WIB tiba tepat waktu untuk makan siang Anda.
        </p>
        {produk.catatan_pengiriman && (
          <p className="text-[12px] text-[#7a7a7a] pt-1">
            Catatan: {produk.catatan_pengiriman}
          </p>
        )}
      </div>

      {/* Kalkulasi Total Harga Dinamis */}
      <div className="flex items-center justify-between border-t border-[#e0e0e0] pt-4">
        <span className="text-[14px] text-[#7a7a7a]">Total Pembayaran</span>
        <span className="text-[21px] font-semibold tracking-tight text-[#1d1d1f]">
          {formatRupiah(totalHarga)}
        </span>
      </div>

      {/* Tombol WhatsApp Utama */}
      <div className="pt-2">
        <TombolWhatsApp produk={produk} jumlah={jumlah} />
      </div>
    </div>
  );
}

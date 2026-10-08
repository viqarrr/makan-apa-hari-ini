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
    <div className="mt-2 flex flex-col gap-4 rounded-2xl border border-garis bg-permukaan p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-sm font-semibold text-teks">Pilih Jumlah Porsi</span>
          <p className="text-xs text-teks-lembut">
            Sisa kuota: <span className="font-semibold text-teks">{produk.slot_tersedia ?? 15} porsi</span>
          </p>
        </div>

        {/* Kontrol Input Jumlah Porsi */}
        <div className="flex items-center rounded-lg border border-garis bg-latar">
          <button
            type="button"
            onClick={handleKurang}
            disabled={jumlah <= 1}
            className="flex h-9 w-9 items-center justify-center text-lg font-bold text-teks-lembut hover:text-teks disabled:opacity-40"
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
            className="h-9 w-12 border-x border-garis text-center text-sm font-semibold text-teks focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={handleTambah}
            disabled={jumlah >= maxSlot}
            className="flex h-9 w-9 items-center justify-center text-lg font-bold text-teks-lembut hover:text-teks disabled:opacity-40"
            aria-label="Tambah porsi"
          >
            +
          </button>
        </div>
      </div>

      {/* Total Harga Dinamis */}
      <div className="flex items-center justify-between border-t border-garis pt-3">
        <span className="text-sm font-medium text-teks-lembut">Total Harga:</span>
        <span className="text-xl font-extrabold text-harga">
          {formatRupiah(totalHarga)}
        </span>
      </div>

      {/* Tombol Pemesanan WhatsApp */}
      <TombolWhatsApp produk={produk} jumlah={jumlah} />
    </div>
  );
}


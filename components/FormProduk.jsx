"use client";

import { useState, useActionState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { tambahProduk, buatDeskripsiAI } from "@/app/admin/actions";

export default function FormProduk({
  produk = {},
  labelTombol = "Simpan produk",
  action = tambahProduk,
}) {
  const [state, formAction, isPending] = useActionState(action, null);

  const hariTerpilih =
    produk.hari_rilis ||
    (["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].includes(produk.kategori)
      ? produk.kategori
      : "Senin");

  const [nama, setNama] = useState(produk.nama || "");
  const [hariRilis, setHariRilis] = useState(hariTerpilih);
  const [deskripsi, setDeskripsi] = useState(produk.deskripsi || "");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [pesanAiError, setPesanAiError] = useState(null);

  const handleBuatDeskripsiAI = async () => {
    if (!nama.trim()) {
      alert("Silakan isi nama menu terlebih dahulu sebelum membuat deskripsi dengan AI.");
      return;
    }

    setIsGeneratingAI(true);
    setPesanAiError(null);

    try {
      const res = await buatDeskripsiAI(nama, hariRilis);
      if (res?.error) {
        setPesanAiError(res.error);
      } else if (res?.deskripsi) {
        setDeskripsi(res.deskripsi);
      }
    } catch (err) {
      setPesanAiError(err.message || "Gagal membuat deskripsi dengan AI.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      {state?.error && (
        <p className="rounded-lg border border-garis bg-permukaan px-3 py-2 text-sm text-bahaya">
          {state.error}
        </p>
      )}

      {pesanAiError && (
        <p className="rounded-lg border border-garis bg-permukaan px-3 py-2 text-sm text-bahaya">
          ⚠️ {pesanAiError}
        </p>
      )}

      {produk.id && <input type="hidden" name="id" value={produk.id} />}

      <Input
        label="Nama menu"
        name="nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        required
      />

      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Kategori hari rilis
        <select
          name="hari_rilis"
          value={hariRilis}
          onChange={(e) => setHariRilis(e.target.value)}
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2.5 text-base text-teks focus:border-utama focus:outline-none"
        >
          <option value="Senin">Senin</option>
          <option value="Selasa">Selasa</option>
          <option value="Rabu">Rabu</option>
          <option value="Kamis">Kamis</option>
          <option value="Jumat">Jumat</option>
        </select>
      </label>

      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="0"
        defaultValue={produk.harga}
        required
      />

      <Input
        label="Slot tersedia"
        name="slot_tersedia"
        type="number"
        min="0"
        defaultValue={produk.slot_tersedia ?? 15}
        required
      />

      <Input
        label="Catatan pengiriman"
        name="catatan_pengiriman"
        defaultValue={
          produk.catatan_pengiriman ??
          "Pengiriman via kurir instan mulai pukul 11.00 WIB."
        }
      />

      <div className="flex flex-col gap-1.5 text-sm font-semibold">
        <div className="flex items-center justify-between">
          <label htmlFor="input-deskripsi">Deskripsi menu / gizi</label>
          <button
            type="button"
            onClick={handleBuatDeskripsiAI}
            disabled={isGeneratingAI}
            className="inline-flex items-center gap-1.5 rounded-full border border-utama/30 bg-utama/5 px-3 py-1 text-xs font-semibold text-utama transition-colors hover:bg-utama/10 disabled:opacity-50"
          >
            {isGeneratingAI ? "Memproses AI..." : "✨ Buat Deskripsi dengan AI"}
          </button>
        </div>
        <textarea
          id="input-deskripsi"
          name="deskripsi"
          rows={4}
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Deskripsi porsi, gizi ringkas, dan saran penyajian..."
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2.5 text-base text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
        />
      </div>

      <Input
        label="URL foto"
        name="foto_url"
        placeholder="https://... atau /produk/nama-file.svg"
        defaultValue={produk.foto_url}
      />

      <div className="flex gap-3">
        <Tombol type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : labelTombol}
        </Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}

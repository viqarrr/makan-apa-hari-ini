"use client";

import { useState, useEffect, useTransition } from "react";
import { formatRupiah } from "@/lib/format";
import Tombol from "@/components/Tombol";
import { hapusProduk } from "@/app/admin/actions";

export default function TabelProduk({ daftarProduk = [] }) {
  const [items, setItems] = useState(daftarProduk);
  const [isPending, startTransition] = useTransition();
  const [produkToDelete, setProdukToDelete] = useState(null);

  useEffect(() => {
    setItems(daftarProduk);
  }, [daftarProduk]);

  const handleConfirmHapus = () => {
    if (!produkToDelete) return;
    const { id } = produkToDelete;

    startTransition(async () => {
      // Pembaruan instan pada UI
      setItems((prev) => prev.filter((item) => item.id !== id));
      const targetId = id;
      setProdukToDelete(null);

      const res = await hapusProduk(targetId);
      if (res?.error) {
        alert(res.error);
        setItems(daftarProduk); // Kembalikan data jika gagal
      }
    });
  };

  return (
    <>
      {!items || items.length === 0 ? (
        <div className="rounded-2xl border border-garis bg-permukaan p-8 text-center text-sm text-teks-lembut">
          Belum ada produk katering
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-garis">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-permukaan text-teks-lembut">
              <tr>
                <th className="px-4 py-3 font-semibold">Produk</th>
                <th className="px-4 py-3 font-semibold">Hari Rilis</th>
                <th className="px-4 py-3 font-semibold">Slot Tersedia</th>
                <th className="px-4 py-3 font-semibold">Harga</th>
                <th className="px-4 py-3 font-semibold">
                  <span className="sr-only">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((produk) => (
                <tr key={produk.id} className="border-t border-garis">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={produk.foto_url}
                        alt=""
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <span className="font-semibold">{produk.nama}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-teks-lembut">
                    {produk.hari_rilis || produk.kategori || "-"}
                  </td>
                  <td className="px-4 py-3 text-teks-lembut">
                    {produk.slot_tersedia != null ? `${produk.slot_tersedia} slot` : "-"}
                  </td>
                  <td className="px-4 py-3">{formatRupiah(produk.harga)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Tombol href={`/admin/produk/${produk.id}/ubah`} varian="garis">
                        Ubah
                      </Tombol>
                      <Tombol
                        type="button"
                        varian="bahaya"
                        onClick={() => setProdukToDelete(produk)}
                      >
                        Hapus
                      </Tombol>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Dialog UI Konfirmasi Hapus */}
      {produkToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="judul-dialog-hapus"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-garis bg-latar p-6 shadow-xl">
            <h3 id="judul-dialog-hapus" className="text-lg font-bold text-teks">
              Hapus Produk
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-teks-lembut">
              Apakah Anda yakin ingin menghapus{" "}
              <span className="font-semibold text-teks">
                &ldquo;{produkToDelete.nama}&rdquo;
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Tombol
                type="button"
                varian="garis"
                onClick={() => setProdukToDelete(null)}
                disabled={isPending}
              >
                Batal
              </Tombol>
              <Tombol
                type="button"
                varian="bahaya"
                onClick={handleConfirmHapus}
                disabled={isPending}
              >
                {isPending ? "Menghapus..." : "Hapus"}
              </Tombol>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

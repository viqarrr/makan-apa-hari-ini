import Link from "next/link";
import { toko } from "@/lib/toko";

export default function Footer() {
  return (
    <footer className="border-t border-[#e0e0e0] bg-[#f5f5f7] py-14 text-[12px] text-[#7a7a7a]">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1.5 max-w-xs">
          <p className="text-[14px] font-semibold text-[#1d1d1f]">{toko.nama}</p>
          <p>{toko.alamat}</p>
          <p>{toko.jamBuka}</p>
        </div>

        <div className="flex flex-col gap-1.5 max-w-sm">
          <p className="font-semibold text-[#1d1d1f]">Panduan Pemesanan</p>
          <p className="leading-relaxed">
            Pemesanan katering harian terencana dilakukan paling lambat H-1 pukul 20.00 WIB. Pengantaran makanan tiba mulai pukul 11.00 WIB langsung ke lokasi tujuan Anda.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="font-semibold text-[#1d1d1f]">Pengelola Toko</p>
          <Link
            href="/admin"
            className="text-[#0066cc] hover:underline"
          >
            Masuk Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

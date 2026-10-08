import Link from "next/link";
import { toko } from "@/lib/toko";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-11 sm:h-12 border-b border-[#e0e0e0] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-[#1d1d1f] transition-opacity hover:opacity-80"
        >
          {toko.nama}
        </Link>
        <nav className="flex items-center gap-6 text-[13px] sm:text-[14px]">
          <Link
            href="/"
            className="text-[#1d1d1f] transition-colors hover:text-[#0066cc]"
          >
            Menu
          </Link>
        </nav>
      </div>
    </header>
  );
}

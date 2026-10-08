import { NextResponse } from "next/server";
import { buatDeskripsiAI } from "@/app/admin/actions";

export async function POST(request) {
  try {
    const { namaMenu, kategoriHari } = await request.json();
    const result = await buatDeskripsiAI(namaMenu, kategoriHari);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ deskripsi: result.deskripsi });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Gagal memproses permintaan AI." },
      { status: 500 }
    );
  }
}


"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { buatKoneksiSesi } from "@/lib/supabase/session";

/**
 * Server Action untuk memproses login admin menggunakan email dan password.
 */
export async function login(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;
  const email = data?.get("email");
  const password = data?.get("password");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await buatKoneksiSesi();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(email).trim(),
    password: String(password),
  });

  if (error) {
    if (error.message === "Invalid login credentials") {
      return { error: "Email atau password salah." };
    }
    return { error: error.message };
  }

  redirect("/admin");
}

/**
 * Server Action untuk logout / mengakhiri sesi admin.
 */
export async function logout() {
  const supabase = await buatKoneksiSesi();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export const keluar = logout;

/**
 * Server Action untuk mengganti password admin yang sedang login.
 */
export async function gantiPassword(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;
  const passwordBaru = data?.get("password_baru");
  const konfirmasiPassword = data?.get("konfirmasi_password");

  const supabase = await buatKoneksiSesi();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Sesi telah berakhir atau Anda belum login. Silakan login kembali." };
  }

  if (!passwordBaru || !konfirmasiPassword) {
    return { error: "Semua kolom password wajib diisi." };
  }

  if (String(passwordBaru).length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Konfirmasi password tidak sama dengan password baru." };
  }

  const { error } = await supabase.auth.updateUser({
    password: String(passwordBaru),
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Password berhasil diganti." };
}

export const ubahPassword = gantiPassword;

/**
 * Server Action untuk menambah produk baru ke tabel produk di Supabase.
 * Wajib memeriksa sesi admin yang sedang login.
 */
export async function tambahProduk(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;

  const supabase = await buatKoneksiSesi();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Aksi gagal: Sesi admin tidak valid. Silakan login terlebih dahulu." };
  }

  const nama = data?.get("nama")?.toString().trim();
  const hari_rilis = data?.get("hari_rilis")?.toString().trim() || "Senin";
  const hargaRaw = data?.get("harga")?.toString().trim();
  const slotRaw = data?.get("slot_tersedia")?.toString().trim();
  const catatan_pengiriman = data?.get("catatan_pengiriman")?.toString().trim() || "Pengiriman via kurir instan mulai pukul 11.00 WIB.";
  const deskripsi = data?.get("deskripsi")?.toString().trim() || "";
  const foto_url = data?.get("foto_url")?.toString().trim() || "/produk/keripik.svg";

  if (!nama) {
    return { error: "Nama menu wajib diisi." };
  }

  const harga = parseInt(hargaRaw, 10);
  if (isNaN(harga) || harga < 0) {
    return { error: "Harga harus berupa angka valid dan minimal 0." };
  }

  const slot_tersedia = parseInt(slotRaw || "15", 10);
  if (isNaN(slot_tersedia) || slot_tersedia < 0) {
    return { error: "Slot tersedia harus berupa angka valid dan minimal 0." };
  }

  const { error: insertError } = await supabase.from("produk").insert({
    nama,
    harga,
    deskripsi,
    foto_url,
    kategori: hari_rilis,
    hari_rilis,
    slot_tersedia,
    catatan_pengiriman,
  });

  if (insertError) {
    return { error: `Gagal menyimpan produk: ${insertError.message}` };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

/**
 * Server Action untuk memperbarui produk di tabel produk Supabase.
 * Wajib memeriksa sesi admin yang sedang login.
 */
export async function ubahProduk(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;

  const supabase = await buatKoneksiSesi();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Aksi gagal: Sesi admin tidak valid. Silakan login terlebih dahulu." };
  }

  const id = data?.get("id")?.toString();
  if (!id) {
    return { error: "ID produk tidak valid." };
  }

  const nama = data?.get("nama")?.toString().trim();
  const hari_rilis = data?.get("hari_rilis")?.toString().trim() || "Senin";
  const hargaRaw = data?.get("harga")?.toString().trim();
  const slotRaw = data?.get("slot_tersedia")?.toString().trim();
  const catatan_pengiriman = data?.get("catatan_pengiriman")?.toString().trim() || "Pengiriman via kurir instan mulai pukul 11.00 WIB.";
  const deskripsi = data?.get("deskripsi")?.toString().trim() || "";
  const foto_url = data?.get("foto_url")?.toString().trim() || "/produk/keripik.svg";

  if (!nama) {
    return { error: "Nama menu wajib diisi." };
  }

  const harga = parseInt(hargaRaw, 10);
  if (isNaN(harga) || harga < 0) {
    return { error: "Harga harus berupa angka valid dan minimal 0." };
  }

  const slot_tersedia = parseInt(slotRaw || "15", 10);
  if (isNaN(slot_tersedia) || slot_tersedia < 0) {
    return { error: "Slot tersedia harus berupa angka valid dan minimal 0." };
  }

  const { error: updateError } = await supabase
    .from("produk")
    .update({
      nama,
      harga,
      deskripsi,
      foto_url,
      kategori: hari_rilis,
      hari_rilis,
      slot_tersedia,
      catatan_pengiriman,
    })
    .eq("id", id);

  if (updateError) {
    return { error: `Gagal memperbarui produk: ${updateError.message}` };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/produk/${id}`);
  redirect("/admin");
}

/**
 * Server Action untuk menghapus produk dari tabel produk Supabase.
 * Wajib memeriksa sesi admin yang sedang login.
 */
export async function hapusProduk(idOrFormData) {
  const id =
    idOrFormData instanceof FormData
      ? idOrFormData.get("id")
      : idOrFormData;

  if (!id) {
    return { error: "ID produk tidak valid." };
  }

  const supabase = await buatKoneksiSesi();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Aksi gagal: Sesi admin tidak valid. Silakan login terlebih dahulu." };
  }

  const { error: deleteError } = await supabase
    .from("produk")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return { error: `Gagal menghapus produk: ${deleteError.message}` };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

/**
 * Server Action untuk membuat deskripsi produk menggunakan Google Gemini API.
 * Wajib memeriksa sesi admin yang sedang login.
 */
export async function buatDeskripsiAI(namaMenu, kategoriHari) {
  const supabase = await buatKoneksiSesi();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Aksi gagal: Sesi admin tidak valid. Silakan login terlebih dahulu." };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { error: "GEMINI_API_KEY belum diatur di environment variable." };
  }

  if (!namaMenu || !namaMenu.trim()) {
    return { error: "Nama menu wajib diisi terlebih dahulu." };
  }

  const promptText = `Anda adalah asisten kuliner profesional untuk katering harian pre-order.
Tolong buatkan deskripsi menu yang menggugah selera untuk hidangan berikut:
Nama menu: ${namaMenu}
Kategori hari rilis: ${kategoriHari || "Senin"}

Syarat format:
1. Cantumkan deskripsi porsi, estimasi gizi ringkas, dan saran penyajian.
2. Maksimal 3 kalimat saja.
3. Bernada profesional dan menarik.
4. JANGAN gunakan karakter em-dash (—) maupun en-dash (–), ganti dengan tanda hubung biasa (-) atau koma jika perlu.
5. Berikan langsung hasil deskripsi tanpa tanda kutip pembuka/penutup atau kalimat pengantar.`;

  const requestBody = {
    contents: [{ parts: [{ text: promptText }] }],
  };

  // 1. Cari model yang tersedia secara dinamis melalui ListModels
  const candidateModels = [];
  try {
    const listRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    if (listRes.ok) {
      const listData = await listRes.json();
      const validModels = (listData.models || []).filter((m) =>
        m.supportedGenerationMethods?.includes("generateContent")
      );

      // Urutkan model: flash, 2.0, 1.5, pro
      validModels.sort((a, b) => {
        const aName = a.name || "";
        const bName = b.name || "";
        if (aName.includes("flash") && !bName.includes("flash")) return -1;
        if (!aName.includes("flash") && bName.includes("flash")) return 1;
        return 0;
      });

      for (const m of validModels) {
        const cleanName = m.name.replace(/^models\//, "");
        candidateModels.push({
          url: `https://generativelanguage.googleapis.com/v1beta/models/${cleanName}:generateContent?key=${apiKey}`,
        });
      }
    }
  } catch {
    // Lanjutkan dengan fallback statis jika ListModels gagal
  }

  // Tambahkan fallback statis jika candidateModels kosong
  if (candidateModels.length === 0) {
    candidateModels.push(
      { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}` },
      { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}` },
      { url: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}` },
      { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}` }
    );
  }

  let lastErrorMessage = "Semua model Gemini tidak dapat diakses.";

  // 2. Coba kirim prompt ke model yang tersedia
  for (const candidate of candidateModels) {
    try {
      const response = await fetch(candidate.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        let deskripsi =
          data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        deskripsi = deskripsi.replace(/[""]/g, "").replace(/[—–]/g, "-").trim();
        if (deskripsi) {
          return { deskripsi };
        }
      } else {
        const errJson = await response.json().catch(() => ({}));
        lastErrorMessage = errJson.error?.message || response.statusText;
      }
    } catch (err) {
      lastErrorMessage = err.message;
    }
  }

  return { error: `Gagal memanggil Gemini API: ${lastErrorMessage}` };
}

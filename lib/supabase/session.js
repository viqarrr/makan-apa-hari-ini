import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Koneksi Supabase berbasis sesi admin menggunakan @supabase/ssr dan cookies.
 * Menggunakan SUPABASE_PUBLISHABLE_KEY agar tunduk pada aturan Row Level Security (RLS).
 * Digunakan untuk login, logout, ganti password, dan kelola produk admin.
 */
export async function buatKoneksiSesi() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY belum diatur di environment variable."
    );
  }

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Abaikan jika dipanggil dari Server Component saat render
        }
      },
    },
  });
}

export const createSessionClient = buatKoneksiSesi;
export default buatKoneksiSesi;


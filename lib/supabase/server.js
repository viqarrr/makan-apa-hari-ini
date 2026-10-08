import { createClient } from "@supabase/supabase-js";

/**
 * Koneksi Supabase di sisi server untuk membaca data publik (katalog & detail produk).
 * Menggunakan SUPABASE_SECRET_KEY sehingga dapat membaca data dari tabel dengan RLS aktif.
 * Hanya boleh dipanggil di Server Component, Server Action, atau Route Handler.
 */
export function buatKoneksiServer() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_SECRET_KEY belum diatur di environment variable."
    );
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const createServerClient = buatKoneksiServer;
export default buatKoneksiServer;


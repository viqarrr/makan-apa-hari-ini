"use server";

import { redirect } from "next/navigation";
import { buatKoneksiSesi } from "@/lib/supabase/session";

/**
 * Server Action untuk memproses login admin menggunakan email dan password.
 */
export async function login(prevState, formData) {
  // Mendukung pemanggilan via useActionState (prevState, formData) maupun action langsung (formData)
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


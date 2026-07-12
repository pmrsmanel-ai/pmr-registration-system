import { supabase } from "./supabase";

/* ===========================
   GET SEMUA PENDAFTAR
=========================== */

export async function getApplicants() {

  const { data, error } = await supabase
    .from("applicants")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;

}

/* ===========================
   GET SATU PENDAFTAR
=========================== */

export async function getApplicant(id) {

  const { data, error } = await supabase
    .from("applicants")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;

}

/* ===========================
   UPDATE STATUS
=========================== */

export async function updateApplicantStatus(
  id,
  status,
  note = ""
) {

  const { data, error } = await supabase

    .from("applicants")

    .update({

      status,

      admin_note: note,

      updated_at: new Date(),

    })

    .eq("id", id)

    .select()

    .single();

  if (error) throw error;

  return data;

}

/* ===========================
   HAPUS PENDAFTAR
=========================== */

export async function deleteApplicant(id) {

  const { error } = await supabase

    .from("applicants")

    .delete()

    .eq("id", id);

  if (error) throw error;

}

/* ===========================
   DASHBOARD
=========================== */

export async function getDashboardStats() {

  const { data, error } = await supabase

    .from("applicants")

    .select("status");

  if (error) throw error;

  return {

    total:
      data.length,

    pending:
      data.filter(

        item =>
          item.status ===
          "Menunggu Verifikasi"

      ).length,

    accepted:
      data.filter(

        item =>
          item.status ===
          "Diterima"

      ).length,

    rejected:
      data.filter(

        item =>
          item.status ===
          "Ditolak"

      ).length,

  };

}
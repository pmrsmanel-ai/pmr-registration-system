import { supabase } from "./supabase";

/* ==========================================
   CEK KELULUSAN
========================================== */

export async function checkGraduation(
  registrationNumber,
) {

  const { data, error } =
    await supabase

      .from("applicants")

      .select("*")

      .eq(
        "registration_number",
        registrationNumber
      )

      .single();

  if (error) throw error;

  return data;

}

/* ==========================================
   LOGIN PESERTA
========================================== */

export async function loginGraduation(

  registrationNumber,

  birthDate,

) {

  const { data, error } =

    await supabase

      .from("applicants")

      .select("*")

      .eq(
        "registration_number",
        registrationNumber
      )

      .eq(
        "birth_date",
        birthDate
      )

      .single();

  if (error) throw error;

  return data;

}

/* ==========================================
   GET SETTINGS
========================================== */

export async function getGraduationSettings() {

  const { data, error } =
    await supabase

      .from("settings")

      .select("*");

  if (error) throw error;

  const settings = {};

  data.forEach(item => {

    settings[item.setting_key] =
      item.setting_value;

  });

  return settings;

}

/* ==========================================
   UPDATE STATUS
========================================== */

export async function publishGraduation(

  id,

  status,

  admin_note = ""

) {

  const { data, error } =
    await supabase

      .from("applicants")

      .update({

        status,

        admin_note,

        updated_at:
          new Date().toISOString(),

      })

      .eq("id", id)

      .select()

      .single();

  if (error) throw error;

  return data;

}

/* ==========================================
   GET ALL APPLICANTS
========================================== */

export async function getGraduationApplicants() {

  const { data, error } =
    await supabase

      .from("applicants")

      .select("*")

      .order(
        "registration_number",
        {
          ascending: true,
        }
      );

  if (error) throw error;

  return data;

}

/* ==========================================
   STATUS HELPER
========================================== */

export function isAccepted(applicant) {

  return applicant?.status === "Diterima";

}

export function isRejected(applicant) {

  return applicant?.status === "Ditolak";

}

export function isPending(applicant) {

  return applicant?.status === "Menunggu Verifikasi";

}
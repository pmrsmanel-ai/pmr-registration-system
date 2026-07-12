import { supabase } from "./supabase";

function generateRegistrationNumber() {
  const now = new Date();

  const year = now.getFullYear();

  const random = Math.floor(
    100000 + Math.random() * 900000
  );

  return `PMRSMANEL-${year}-${random}`;
}

export async function registerApplicant(formData) {

  const registrationNumber =
    generateRegistrationNumber();

  let photoUrl = "";

  // ============================
  // Upload Foto
  // ============================

  if (formData.foto) {

    const ext =
      formData.foto.name.split(".").pop();

    const fileName =
      `${registrationNumber}.${ext}`;

    const { error: uploadError } =
      await supabase.storage
        .from("photos")
        .upload(fileName, formData.foto, {
          cacheControl: "3600",
          upsert: true,
        });

    if (uploadError)
      throw uploadError;

    const { data } =
      supabase.storage
        .from("photos")
        .getPublicUrl(fileName);

    photoUrl =
      data.publicUrl;

  }

  // ============================
  // Simpan Database
  // ============================

  const payload = {

    registration_number:
      registrationNumber,

    full_name:
      formData.namaLengkap,

    nickname:
      formData.namaPanggilan,

    gender:
      formData.jenisKelamin,

    birth_place:
      formData.tempatLahir,

    birth_date:
      formData.tanggalLahir,

    religion:
      formData.agama,

    phone:
      formData.noHp,

    email:
      formData.email,

    address:
      formData.alamat,

    class:
      formData.kelas,

    height:
      Number(formData.tinggiBadan),

    weight:
      Number(formData.beratBadan),

    medical_history:
      formData.riwayatPenyakit,

    father_name:
      formData.namaAyah,

    mother_name:
      formData.namaIbu,

    parent_phone:
      formData.noHpOrtu,

    photo_url:
      photoUrl,

    status:
      "Menunggu Verifikasi",

    admin_note:
      "",

    qr_code:
      registrationNumber,

  };

  const {
    data,
    error,
  } = await supabase

    .from("applicants")

    .insert(payload)

    .select()

    .single();

  if (error)
    throw error;

  return {

    registrationNumber:
      data.registration_number,

    fullName:
      data.full_name,

    class:
      data.class,

    status:
      data.status,

    createdAt:
      data.created_at,

    photoUrl:
      data.photo_url,

    qrCode:
      data.qr_code,

  };

}

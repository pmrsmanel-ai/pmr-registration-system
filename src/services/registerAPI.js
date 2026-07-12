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

    // Upload foto dinonaktifkan sementara
    photo_url: null,

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

  if (error) {

    console.error(error);

    throw error;

  }

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
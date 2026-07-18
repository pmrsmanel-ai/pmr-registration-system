import { supabase } from "./supabase";

function generateRegistrationNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);

  return `PMRSMANEL-${year}-${random}`;
}

// ============================================
// Mengambil data peserta yang sudah terdaftar
// ============================================

async function getExistingApplicant(fullName, email, phone) {

  const { data, error } = await supabase
    .from("applicants")
    .select("*")
    .eq("full_name", fullName)
    .eq("email", email)
    .eq("phone", phone)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

// ============================================
// Register Peserta
// ============================================

export async function registerApplicant(formData) {

  const registrationNumber = generateRegistrationNumber();

  const payload = {

    registration_number: registrationNumber,

    full_name: formData.namaLengkap,

    nickname: formData.namaPanggilan,

    gender: formData.jenisKelamin,

    birth_place: formData.tempatLahir,

    birth_date: formData.tanggalLahir,

    religion: formData.agama,

    phone: formData.noHp,

    email: formData.email,

    address: formData.alamat,

    class: formData.kelas,

    height: Number(formData.tinggiBadan),

    weight: Number(formData.beratBadan),

    medical_history: formData.riwayatPenyakit,

    father_name: formData.namaAyah,

    mother_name: formData.namaIbu,

    parent_phone: formData.noHpOrtu,

    // upload foto sementara dimatikan
    photo_url: null,

    status: "Menunggu Verifikasi",

    admin_note: "",

    qr_code: registrationNumber,

  };

  // ============================================
  // CEK DUPLIKAT
  // ============================================

  const existingApplicant = await getExistingApplicant(
    payload.full_name,
    payload.email,
    payload.phone
  );

  if (existingApplicant) {

    return {

      success: false,

      duplicate: true,

      registrationNumber:
        existingApplicant.registration_number,

      fullName:
        existingApplicant.full_name,

      class:
        existingApplicant.class,

      status:
        existingApplicant.status,

      createdAt:
        existingApplicant.created_at,

      photoUrl:
        existingApplicant.photo_url,

      qrCode:
        existingApplicant.qr_code,

    };

  }

  // ============================================
  // INSERT DATA BARU
  // ============================================

  const { data, error } = await supabase
    .from("applicants")
    .insert(payload)
    .select()
    .single();

  // ============================================
  // HANDLE RACE CONDITION
  // ============================================

  if (error) {

    // PostgreSQL UNIQUE Constraint
    if (error.code === "23505") {

      const duplicate = await getExistingApplicant(
        payload.full_name,
        payload.email,
        payload.phone
      );

      if (duplicate) {

        return {

          success: false,

          duplicate: true,

          registrationNumber:
            duplicate.registration_number,

          fullName:
            duplicate.full_name,

          class:
            duplicate.class,

          status:
            duplicate.status,

          createdAt:
            duplicate.created_at,

          photoUrl:
            duplicate.photo_url,

          qrCode:
            duplicate.qr_code,

        };

      }

    }

    console.error(error);

    throw error;

  }

  // ============================================
  // BERHASIL
  // ============================================

  return {

    success: true,

    duplicate: false,

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
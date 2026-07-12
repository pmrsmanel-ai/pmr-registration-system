import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportApplicants(
  applicants,
  filename = "Pendaftar-PMR"
) {

  const data = applicants.map((item, index) => ({

    No: index + 1,

    "Nomor Pendaftaran":
      item.registration_number,

    "Nama Lengkap":
      item.full_name,

    "Nama Panggilan":
      item.nickname,

    "Jenis Kelamin":
      item.gender,

    "Tempat Lahir":
      item.birth_place,

    "Tanggal Lahir":
      item.birth_date,

    Agama:
      item.religion,

    "Nomor HP":
      item.phone,

    Email:
      item.email,

    Alamat:
      item.address,

    Kelas:
      item.class,

    "Tinggi Badan":
      item.height,

    "Berat Badan":
      item.weight,

    "Riwayat Penyakit":
      item.medical_history,

    Ayah:
      item.father_name,

    Ibu:
      item.mother_name,

    "HP Orang Tua":
      item.parent_phone,

    Status:
      item.status,

    "Catatan Admin":
      item.admin_note,

    "Tanggal Daftar":
      item.created_at,

  }));

  const worksheet =
    XLSX.utils.json_to_sheet(data);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Pendaftar"

  );

  const excelBuffer =
    XLSX.write(workbook, {

      bookType: "xlsx",

      type: "array",

    });

  const file = new Blob(

    [excelBuffer],

    {

      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    }

  );

  saveAs(

    file,

    `${filename}.xlsx`

  );

}
import { useState } from "react";
import QRCode from "react-qr-code";

import {
  X,
  Check,
  Ban,
  Copy,
  Phone,
  Mail,
  MapPin,
  User,
} from "lucide-react";

import {
  updateApplicantStatus,
} from "../../services/adminApi";

function ApplicantModal({

  applicant,

  onClose,

  onRefresh,

}) {

  const [loading, setLoading] =
    useState(false);

  const [note, setNote] =
    useState(applicant.admin_note || "");

  async function save(status) {

    try {

      setLoading(true);

      await updateApplicantStatus(

        applicant.id,

        status,

        note

      );

      await onRefresh();

      onClose();

    }

    catch (err) {

      console.error(err);

      alert(err.message);

    }

    finally {

      setLoading(false);

    }

  }

  async function copyRegistration() {

    await navigator.clipboard.writeText(
      applicant.registration_number
    );

    alert("Nomor pendaftaran berhasil disalin.");

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-8 py-6">

          <div>

            <h2 className="text-3xl font-black">

              Detail Pendaftar

            </h2>

            <p className="mt-1 text-gray-500">

              {applicant.registration_number}

            </p>

          </div>

          <button

            onClick={onClose}

            className="rounded-xl p-2 hover:bg-gray-100"

          >

            <X size={28} />

          </button>

        </div>

        <div className="grid gap-10 p-8 lg:grid-cols-[320px,1fr]">
                    {/* FOTO */}

          <div>

            <div className="overflow-hidden rounded-3xl border bg-white shadow">

              <img
                src={
                  applicant.photo_url ||
                  "/images/avatar-placeholder.png"
                }
                alt={applicant.full_name}
                className="h-[420px] w-full object-cover"
              />

            </div>

            <div className="mt-6 rounded-3xl border bg-red-50 p-6">

              <h3 className="text-lg font-bold text-red-700">

                Nomor Pendaftaran

              </h3>

              <div className="mt-3 flex items-center justify-between gap-3">

                <p className="text-xl font-black break-all">

                  {applicant.registration_number}

                </p>

                <button

                  onClick={copyRegistration}

                  className="rounded-xl bg-white p-3 shadow hover:bg-gray-100"

                >

                  <Copy size={18} />

                </button>

              </div>

            </div>

            <div className="mt-6 rounded-3xl border bg-white p-6 shadow">

              <h3 className="mb-4 text-lg font-bold">

                QR Code

              </h3>

              <div className="flex justify-center">

                <QRCode

                  value={applicant.registration_number}

                  size={180}

                />

              </div>

            </div>

          </div>

          {/* BIODATA */}

          <div>

            <h3 className="mb-6 text-2xl font-black">

              Biodata Peserta

            </h3>

            <div className="grid gap-5 md:grid-cols-2">

              <Item
                icon={<User size={18} />}
                label="Nama Lengkap"
                value={applicant.full_name}
              />

              <Item
                icon={<User size={18} />}
                label="Nama Panggilan"
                value={applicant.nickname}
              />

              <Item
                label="Jenis Kelamin"
                value={applicant.gender}
              />

              <Item
                label="Tempat Lahir"
                value={applicant.birth_place}
              />

              <Item
                label="Tanggal Lahir"
                value={applicant.birth_date}
              />

              <Item
                label="Agama"
                value={applicant.religion}
              />

              <Item
                icon={<Phone size={18} />}
                label="Nomor HP"
                value={applicant.phone}
              />

              <Item
                icon={<Mail size={18} />}
                label="Email"
                value={applicant.email}
              />

              <Item
                icon={<MapPin size={18} />}
                label="Alamat"
                value={applicant.address}
              />

              <Item
                label="Kelas"
                value={applicant.class}
              />

              <Item
                label="Tinggi Badan"
                value={`${applicant.height || "-"} cm`}
              />

              <Item
                label="Berat Badan"
                value={`${applicant.weight || "-"} kg`}
              />

              <Item
                label="Riwayat Penyakit"
                value={applicant.medical_history}
              />

              <Item
                label="Nama Ayah"
                value={applicant.father_name}
              />

              <Item
                label="Nama Ibu"
                value={applicant.mother_name}
              />

              <Item
                label="No HP Orang Tua"
                value={applicant.parent_phone}
              />
                            <div className="rounded-2xl border bg-gray-50 p-4">

                <p className="mb-2 text-sm text-gray-500">

                  Status Seleksi

                </p>

                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold

                  ${
                    applicant.status === "Diterima"
                      ? "bg-green-100 text-green-700"

                      : applicant.status === "Ditolak"
                      ? "bg-red-100 text-red-700"

                      : "bg-yellow-100 text-yellow-700"
                  }

                  `}
                >

                  {applicant.status}

                </span>

              </div>

            </div>

            {/* CATATAN */}

            <div className="mt-8">

              <label className="mb-3 block text-lg font-bold">

                Catatan Admin

              </label>

              <textarea

                rows={5}

                value={note}

                onChange={(e) =>
                  setNote(e.target.value)
                }

                placeholder="Tulis catatan untuk peserta..."

                className="w-full rounded-2xl border p-4 outline-none transition focus:border-red-600"

              />

            </div>

            {/* ACTION */}

            <div className="mt-10 flex flex-wrap gap-4">

              <button

                disabled={loading}

                onClick={() =>
                  save("Diterima")
                }

                className="flex items-center gap-2 rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"

              >

                <Check size={20} />

                Terima

              </button>

              <button

                disabled={loading}

                onClick={() =>
                  save("Ditolak")
                }

                className="flex items-center gap-2 rounded-2xl bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"

              >

                <Ban size={20} />

                Tolak

              </button>

              <button

                disabled={loading}

                onClick={onClose}

                className="rounded-2xl border px-8 py-4 font-semibold transition hover:bg-gray-100"

              >

                Tutup

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
function Item({

  icon,

  label,

  value,

}) {

  return (

    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:border-red-200 hover:bg-red-50">

      <div className="flex items-center gap-2">

        {icon && (

          <span className="text-red-600">

            {icon}

          </span>

        )}

        <p className="text-sm font-medium text-gray-500">

          {label}

        </p>

      </div>

      <p className="mt-2 break-words text-base font-semibold text-gray-900">

        {

          value === null ||

          value === undefined ||

          value === ""

            ? "-"

            : value

        }

      </p>

    </div>

  );

}

export default ApplicantModal;
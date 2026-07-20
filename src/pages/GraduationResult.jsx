import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

import {
  CheckCircle2,
  XCircle,
  Clock3,
  User,
  BadgeCheck,
} from "lucide-react";

import Layout from "../components/layout/Layout";

import {
  getGraduationSettings,
} from "../services/graduationApi";

import TrainingInformation from "../components/graduation/TrainingInformation";
import DownloadButton from "../components/graduation/DownloadButton";

function GraduationResult() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState({});

  const [applicant, setApplicant] = useState(null);

  useEffect(() => {

    async function loadData() {

      try {

        const session = sessionStorage.getItem("graduation");

        if (!session) {

          navigate("/graduation");

          return;

        }

        const applicantData = JSON.parse(session);

        setApplicant(applicantData);

        const graduationSettings =
          await getGraduationSettings();

        setSettings(graduationSettings);

      }

      catch (err) {

        console.error(err);

      }

      finally {

        setLoading(false);

      }

    }

    loadData();

  }, [navigate]);

    if (loading) {

    return (

      <Layout>

        <div className="flex h-[70vh] items-center justify-center">

          <div className="h-16 w-16 animate-spin rounded-full border-4 border-red-200 border-t-red-700"/>

        </div>

      </Layout>

    );

  }

  if (!applicant) {

    return null;

  }

  const accepted =
    applicant.status === "Diterima";

  const rejected =
    applicant.status === "Ditolak";

  const pending =
    applicant.status === "Menunggu Verifikasi";

    return (

  <Layout>

    <section className="min-h-screen bg-gray-100 pt-32 pb-12">

      <div className="mx-auto max-w-7xl px-5">

        {/* ===========================
            HERO
        =========================== */}

        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-red-800 via-red-700 to-red-600 text-white shadow-2xl">

          {/* Background */}

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10"/>

          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/5"/>

          <div className="relative z-10 flex flex-col gap-8 p-10 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <span className="rounded-full bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur">

                PMR SMAN 1 AIKMEL

              </span>

              <h1 className="mt-5 text-5xl font-black">

                Hasil Seleksi

              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-red-100">

                Terima kasih telah mengikuti seluruh

                rangkaian seleksi Anggota Baru

                PMR SMAN 1 AIKMEL.

                Berikut merupakan hasil seleksi

                berdasarkan keputusan panitia.

              </p>

            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur">

              <p className="text-sm uppercase tracking-widest text-red-100">

                Nomor Pendaftaran

              </p>

              <h2 className="mt-3 text-4xl font-black">

                {applicant.registration_number}

              </h2>

            </div>

          </div>

        </div>

        {/* ===========================
            MAIN GRID
        =========================== */}

        <div className="mt-10 grid gap-8 lg:grid-cols-[340px,1fr]">

{/* ==========================================
    LEFT SIDEBAR
========================================== */}

<div className="space-y-6">

  {/* FOTO PESERTA */}

  <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

    <div className="bg-gradient-to-r from-red-700 to-red-600 px-6 py-4">

      <h3 className="text-lg font-black text-white">

        Foto Peserta

      </h3>

    </div>

    <div className="p-5">

      <img
        src={
          applicant.photo_url ||
          `${import.meta.env.BASE_URL}images/avatar-placeholder.png`
        }
        alt={applicant.full_name}
        className="aspect-[3/4] w-full rounded-2xl border border-gray-200 object-cover"
      />

    </div>

  </div>

  {/* QR CODE */}

  <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

    <div className="border-b bg-gray-50 px-6 py-4">

      <h3 className="text-lg font-black text-gray-800">

        QR Verifikasi

      </h3>

    </div>

    <div className="flex flex-col items-center p-6">

      <div className="rounded-2xl border bg-white p-4 shadow-sm">

        <QRCode
          value={JSON.stringify({
            registration_number:
              applicant.registration_number,
            full_name:
              applicant.full_name,
            status:
              applicant.status,
          })}
          size={180}
        />

      </div>

      <p className="mt-5 text-center text-sm text-gray-500">

        Scan QR Code ini untuk verifikasi
        data peserta.

      </p>

    </div>

  </div>

  {/* BIODATA */}

  <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

    <div className="border-b bg-gray-50 px-6 py-4">

      <h3 className="text-lg font-black text-gray-800">

        Biodata Peserta

      </h3>

    </div>

    <div className="space-y-4 p-6">

      <Info
        icon={<User size={18} />}
        label="Nama Lengkap"
        value={applicant.full_name}
      />

      <Info
        icon={<BadgeCheck size={18} />}
        label="Nomor Pendaftaran"
        value={applicant.registration_number}
      />

      <Info
        label="Kelas"
        value={applicant.class}
      />

      <Info
        label="Jenis Kelamin"
        value={applicant.gender}
      />

      <Info
        label="Nomor HP"
        value={applicant.phone}
      />

    </div>

  </div>

</div>

{/* ==========================================
    RIGHT CONTENT
========================================== */}

<div className="space-y-8">

  {/* ==========================================
    STATUS KELULUSAN
========================================== */}

<div className="overflow-hidden rounded-3xl bg-white shadow-xl">

  <div
    className={`px-8 py-5 text-white ${
      accepted
        ? "bg-green-600"
        : rejected
        ? "bg-red-600"
        : "bg-yellow-500"
    }`}
  >

    <h2 className="text-2xl font-black">

      Status Kelulusan

    </h2>

  </div>

  <div className="p-8">

    {accepted && (

      <div className="text-center">

        <CheckCircle2
          size={90}
          className="mx-auto text-green-600"
        />

        <h2 className="mt-6 text-4xl font-black text-green-700">

          SELAMAT!

        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">

          Anda dinyatakan

          <span className="font-bold text-green-700">

            {" "}LOLOS{" "}

          </span>

          sebagai Calon Anggota Baru

          PMR SMAN 1 AIKMEL.

        </p>

      </div>

    )}

    {pending && (

      <div className="text-center">

        <Clock3
          size={90}
          className="mx-auto text-yellow-500"
        />

        <h2 className="mt-6 text-4xl font-black text-yellow-600">

          MENUNGGU VERIFIKASI

        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">

          Panitia masih melakukan proses

          verifikasi dan penilaian.

          Silakan menunggu pengumuman resmi.

        </p>

      </div>

    )}

    {rejected && (

      <div className="text-center">

        <XCircle
          size={90}
          className="mx-auto text-red-600"
        />

        <h2 className="mt-6 text-4xl font-black text-red-600">

          MOHON MAAF

        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">

          Anda belum dinyatakan lolos

          pada seleksi tahun ini.

          Terima kasih atas partisipasi Anda.

        </p>

      </div>

    )}

  </div>

</div>

{/* ==========================================
    CATATAN PANITIA
========================================== */}

{applicant.admin_note && (

  <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-6">

    <h3 className="text-xl font-black text-yellow-700">

      Catatan Panitia

    </h3>

    <p className="mt-3 whitespace-pre-line leading-8 text-gray-700">

      {applicant.admin_note}

    </p>

  </div>

)}

{/* ==========================================
    KHUSUS PESERTA LOLOS
========================================== */}

{accepted && (

  <>

    <TrainingInformation
      settings={settings}
    />

    <div className="rounded-3xl bg-red-50 p-8">

      <h2 className="text-2xl font-black text-red-700">

        Langkah Selanjutnya

      </h2>

      <ul className="mt-6 space-y-4 text-gray-700">

        <li>
          ✅ Download kartu peserta.
        </li>

        <li>
          ✅ Bergabung ke grup WhatsApp.
        </li>

        <li>
          ✅ Hadir sesuai jadwal yang telah ditentukan.
        </li>

        <li>
          ✅ Membawa perlengkapan yang diperlukan.
        </li>

      </ul>

      <div className="mt-8 flex flex-wrap gap-4">

        <DownloadButton
          applicant={applicant}
        />

        {settings.whatsapp_group && (

          <a
            href={settings.whatsapp_group}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
          >

            Gabung Grup WhatsApp

          </a>

        )}

      </div>

    </div>

  </>

)}

</div> {/* RIGHT CONTENT */}

</div> {/* GRID */}

</div> {/* CONTAINER */}

</section>

</Layout>

);
}

function Info({ icon, label, value }) {

  return (

    <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">

      {icon && (
        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700">
          {icon}
        </div>
      )}

      <div className="flex-1">

        <p className="text-sm font-medium text-gray-500">
          {label}
        </p>

        <p className="mt-1 text-base font-semibold text-gray-900 break-words">
          {value || "-"}
        </p>

      </div>

    </div>

  );

}
export default GraduationResult;
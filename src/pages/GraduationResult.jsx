import { useEffect, useState } from "react";

import {

  CheckCircle2,
  XCircle,
  Clock3,
  Download,
  MessageCircle,
  CalendarDays,
  MapPin,
  User,
  BadgeCheck,

} from "lucide-react";

import QRCode from "react-qr-code";

import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

import {

  getGraduationSettings,

} from "../services/graduationApi";
import AnnouncementCard from "../components/graduation/AnnouncementCard";
import DownloadButton from "../components/graduation/DownloadButton";

function GraduationResult() {

  const navigate = useNavigate();

  const [applicant, setApplicant] =
    useState(null);

  const [settings, setSettings] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      try {

        const session =
          sessionStorage.getItem(
            "graduation"
          );

        if (!session) {

          navigate("/graduation");

          return;

        }

        setApplicant(
          JSON.parse(session)
        );

        const data =
          await getGraduationSettings();

        setSettings(data);

      }

      catch (err) {

        console.error(err);

      }

      finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  if (loading) {

    return (

      <Layout>

        <div className="flex h-[70vh] items-center justify-center">

          <div className="h-14 w-14 animate-spin rounded-full border-4 border-red-200 border-t-red-700"/>

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
    applicant.status ===
    "Menunggu Verifikasi";

  return (

    <Layout>

      <section className="bg-gray-50 py-16">

        <div className="mx-auto max-w-6xl px-6">

          <div className="overflow-hidden rounded-[36px] bg-white shadow-2xl">

            <div className="bg-gradient-to-r from-red-700 to-red-500 px-10 py-10 text-white">

              <h1 className="text-4xl font-black">

                Hasil Seleksi

              </h1>

              <p className="mt-3 text-red-100">

                Penerimaan Anggota Baru

                PMR SMAN 1 AIKMEL

              </p>

            </div>

            <div className="grid gap-10 p-10 lg:grid-cols-[340px,1fr]">
                              {/* ==========================
                  LEFT PANEL
              ========================== */}

              <div className="space-y-6">

                <div className="overflow-hidden rounded-3xl border bg-white shadow">

                  <img

                    src={
                      applicant.photo_url ||
                      `${import.meta.env.BASE_URL}images/avatar-placeholder.png`
                    }

                    alt={applicant.full_name}

                    className="h-[420px] w-full object-cover"

                  />

                </div>

                <div className="rounded-3xl border bg-white p-6 shadow">

                  <div className="flex justify-center">

                    <QRCode

                      value={applicant.registration_number}

                      size={180}

                    />

                  </div>

                  <div className="mt-5 text-center">

                    <p className="text-sm text-gray-500">

                      Nomor Pendaftaran

                    </p>

                    <h2 className="mt-2 text-xl font-black">

                      {applicant.registration_number}

                    </h2>

                  </div>

                </div>

                <div className="rounded-3xl border bg-white p-6 shadow">

                  <h3 className="mb-5 text-xl font-black">

                    Biodata Singkat

                  </h3>

                  <div className="space-y-4">

                    <Info

                      icon={<User size={18}/>}

                      label="Nama"

                      value={applicant.full_name}

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

                      label="No. HP"

                      value={applicant.phone}

                    />

                  </div>

                </div>

              </div>

              {/* ==========================
                  RIGHT PANEL
              ========================== */}

              <div className="space-y-8">

                <div className="rounded-3xl border p-8">

                  {

                    pending && (

                      <div className="text-center">

                        <Clock3

                          size={80}

                          className="mx-auto text-yellow-500"

                        />

                        <h2 className="mt-6 text-4xl font-black text-yellow-600">

                          MENUNGGU VERIFIKASI

                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">

                          Terima kasih telah mendaftar.

                          Panitia masih melakukan proses

                          verifikasi dan penilaian.

                          Silakan menunggu hingga

                          pengumuman resmi diterbitkan.

                        </p>

                      </div>

                    )

                  }

                  {

                    rejected && (

                      <div className="text-center">

                        <XCircle

                          size={80}

                          className="mx-auto text-red-600"

                        />

                        <h2 className="mt-6 text-4xl font-black text-red-600">

                          MOHON MAAF

                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">

                          Anda belum dinyatakan lolos

                          pada seleksi Anggota Baru

                          PMR SMAN 1 AIKMEL.

                        </p>

                      </div>

                    )

                  }

                  {

                    accepted && (

                      <div className="text-center">

                        <CheckCircle2

                          size={80}

                          className="mx-auto text-green-600"

                        />

                        <h2 className="mt-6 text-4xl font-black text-green-600">

                          SELAMAT

                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">

                          Anda dinyatakan

                          <span className="font-bold">

                            {" "}LOLOS{" "}

                          </span>

                          seleksi Anggota Baru

                          PMR SMAN 1 AIKMEL.

                        </p>

                      </div>

                    )

                  }

                </div>
                                {/* ==========================
                    CATATAN ADMIN
                ========================== */}

                {

                  applicant.admin_note && (

                    <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-6">

                      <h3 className="text-xl font-black text-yellow-700">

                        Catatan Panitia

                      </h3>

                      <p className="mt-3 leading-8 text-gray-700">

                        {applicant.admin_note}

                      </p>

                    </div>

                  )

                }

                {/* ==========================
                    KHUSUS PESERTA LOLOS
                ========================== */}

                {

                  accepted && (

                    <>

                      <div className="grid gap-6 md:grid-cols-2">

                        <div className="rounded-3xl border bg-white p-6 shadow">

                          <div className="mb-4 flex items-center gap-3">

                            <CalendarDays

                              className="text-red-600"

                              size={24}

                            />

                            <h3 className="text-xl font-black">

                              Jadwal Diklat

                            </h3>

                          </div>

                          <p className="leading-8 text-gray-700">

                            {

                              settings.training_date ||

                              "-"

                            }

                          </p>

                        </div>

                        <div className="rounded-3xl border bg-white p-6 shadow">

                          <div className="mb-4 flex items-center gap-3">

                            <MapPin

                              className="text-red-600"

                              size={24}

                            />

                            <h3 className="text-xl font-black">

                              Lokasi Diklat

                            </h3>

                          </div>

                          <p className="leading-8 text-gray-700">

                            {

                              settings.training_location ||

                              "-"

                            }

                          </p>

                        </div>

                      </div>

                      <div className="rounded-3xl border bg-red-50 p-8">

                        <h3 className="text-2xl font-black text-red-700">

                          Langkah Selanjutnya

                        </h3>

                        <ul className="mt-5 space-y-4 text-gray-700">

                          <li>

                            ✅ Download kartu peserta.

                          </li>

                          <li>

                            ✅ Bergabung ke Grup WhatsApp.

                          </li>

                          <li>

                            ✅ Hadir tepat waktu pada kegiatan Pertemuan Pertama.

                          </li>

                          <li>

                            ✅ Membawa perlengkapan yang telah ditentukan panitia.

                          </li>

                        </ul>

                        <div className="mt-8 flex flex-wrap gap-4">

                          <button

                            className="flex items-center gap-2 rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"

                          >

                            <Download size={20}/>

                            Download Kartu Peserta

                          </button>

                          <a

                            href={

                              settings.whatsapp_group ||

                              "#"

                            }

                            target="_blank"

                            rel="noreferrer"

                            className="flex items-center gap-2 rounded-2xl bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800"

                          >

                            <MessageCircle size={20}/>

                            Gabung Grup WhatsApp

                          </a>

                        </div>

                      </div>

                    </>

                  )

                }
                            </div>

          </div>

        </div>
        </div>

      </section>

    </Layout>

  );

}

/* ==========================================
   INFO ITEM
========================================== */

function Info({

  icon,

  label,

  value,

}) {

  return (

    <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">

      {

        icon && (

          <div className="mt-1 text-red-600">

            {icon}

          </div>

        )

      }

      <div>

        <p className="text-sm text-gray-500">

          {label}

        </p>

        <p className="mt-1 font-semibold text-gray-900 break-words">

          {

            value === null ||

            value === undefined ||

            value === ""

              ? "-"

              : value

          }

        </p>

      </div>

    </div>

  );

}

export default GraduationResult;
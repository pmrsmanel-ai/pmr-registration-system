import { useState } from "react";

import {
  Search,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { checkResult } from "../services/resultApi";

function CheckResult() {

  const [keyword, setKeyword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  async function handleSearch() {

    if (!keyword.trim()) {

      alert("Masukkan Nomor Pendaftaran atau Nama.");

      return;

    }

    try {

      setLoading(true);

      const data =
        await checkResult(keyword);

      setResult(data);

    }

    catch (err) {

      console.error(err);

      alert(err.message);

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <section className="bg-gray-50 py-20">

      <div className="mx-auto max-w-3xl">

        <div className="rounded-3xl bg-white p-10 shadow-xl">

          <h1 className="text-center text-4xl font-black">

            Cek Hasil Seleksi

          </h1>

          <p className="mt-3 text-center text-gray-500">

            Masukkan Nomor Pendaftaran
            atau Nama Lengkap.

          </p>

          <div className="mt-10 flex gap-3">

            <input

              value={keyword}

              onChange={(e)=>

                setKeyword(e.target.value)

              }

              placeholder="Nomor Pendaftaran"

              className="flex-1 rounded-2xl border px-5 py-4 outline-none focus:border-red-600"

            />

            <button

              onClick={handleSearch}

              disabled={loading}

              className="flex items-center gap-2 rounded-2xl bg-red-700 px-8 py-4 font-semibold text-white hover:bg-red-800 disabled:opacity-60"

            >

              <Search size={18}/>

              {

                loading

                  ? "Mencari..."

                  : "Cari"

              }

            </button>

          </div>
                    {

            result && (

              <div className="mt-10">

                {

                  result.status === "Menunggu Verifikasi" && (

                    <div className="rounded-3xl border border-yellow-300 bg-yellow-50 p-8 text-center">

                      <Clock3

                        size={60}

                        className="mx-auto text-yellow-600"

                      />

                      <h2 className="mt-5 text-3xl font-black text-yellow-700">

                        Menunggu Verifikasi

                      </h2>

                      <p className="mt-4 text-gray-600">

                        Pendaftaran Anda sudah diterima.

                        <br />

                        Silakan menunggu pengumuman resmi dari PMR.

                      </p>

                    </div>

                  )

                }

                {

                  result.status === "Ditolak" && (

                    <div className="rounded-3xl border border-red-300 bg-red-50 p-8 text-center">

                      <XCircle

                        size={60}

                        className="mx-auto text-red-600"

                      />

                      <h2 className="mt-5 text-3xl font-black text-red-700">

                        Belum Lolos Seleksi

                      </h2>

                      <p className="mt-4 text-gray-600">

                        Terima kasih telah mengikuti proses seleksi

                        Anggota PMR SMAN 1 AIKMEL.

                      </p>

                      <p className="mt-2 text-gray-600">

                        Tetap semangat dan terus berkarya.

                      </p>

                    </div>

                  )

                }

                {

                  result.status === "Diterima" && (

                    <div className="rounded-3xl border border-green-300 bg-green-50 p-8">

                      <div className="text-center">

                        <CheckCircle2

                          size={64}

                          className="mx-auto text-green-600"

                        />

                        <h2 className="mt-5 text-3xl font-black text-green-700">

                          Selamat!

                        </h2>

                        <p className="mt-3 text-gray-600">

                          Anda dinyatakan

                          <span className="font-bold">

                            {" "}LULUS{" "}

                          </span>

                          seleksi Anggota PMR.

                        </p>

                      </div>

                      <div className="mt-8 grid gap-5 md:grid-cols-2">

                                            <InfoItem
                          label="Nomor Pendaftaran"
                          value={result.registration_number}
                        />

                        <InfoItem
                          label="Nama Lengkap"
                          value={result.full_name}
                        />

                        <InfoItem
                          label="Kelas"
                          value={result.class}
                        />

                        <InfoItem
                          label="Jenis Kelamin"
                          value={result.gender}
                        />

                        <InfoItem
                          label="Nomor HP"
                          value={result.phone}
                        />

                        <InfoItem
                          label="Status"
                          value={result.status}
                        />

                      </div>

                      <div className="mt-10 text-center">

                        <a

                          href={
                            import.meta.env.VITE_WHATSAPP_GROUP ||
                            "#"
                          }

                          target="_blank"

                          rel="noopener noreferrer"

                          className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-10 py-4 text-lg font-bold text-white transition hover:bg-green-700"

                        >

                          Gabung Grup WhatsApp

                        </a>

                        <p className="mt-3 text-sm text-gray-500">

                          Klik tombol di atas untuk bergabung ke grup resmi
                          Anggota PMR SMAN 1 AIKMEL.

                        </p>

                      </div>

                    </div>

                  )

                }

              </div>

            )

          }

          {

            result === null && !loading && (

              <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">

                Silakan masukkan Nomor Pendaftaran untuk melihat hasil seleksi.

              </div>

            )

          }
                  </div>

      </div>

    </section>

  );

}

/* ==========================================
   INFO ITEM
========================================== */

function InfoItem({

  label,

  value,

}) {

  return (

    <div className="rounded-2xl border border-gray-200 bg-white p-5">

      <p className="text-sm text-gray-500">

        {label}

      </p>

      <p className="mt-2 break-words text-lg font-bold text-gray-800">

        {value || "-"}

      </p>

    </div>

  );

}

export default CheckResult;
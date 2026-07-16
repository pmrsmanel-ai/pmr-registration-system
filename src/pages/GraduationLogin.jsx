import { useState } from "react";

import {

  Search,

  ShieldCheck,

  ArrowRight,

} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

import {

  loginGraduation,

} from "../services/graduationApi";

function GraduationLogin() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [registrationNumber, setRegistrationNumber] =
    useState("");

  const [birthDate, setBirthDate] =
    useState("");

  const [error, setError] =
    useState("");

  async function login() {

    try {

      setLoading(true);

      setError("");

      const applicant =
        await loginGraduation(

          registrationNumber,

          birthDate,

        );

      sessionStorage.setItem(

        "graduation",

        JSON.stringify(applicant)

      );

      navigate("/graduation/result");

    }

    catch (err) {

      console.error(err);

      setError(

        "Nomor pendaftaran atau tanggal lahir tidak sesuai."

      );

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <Layout>

      <section className="flex min-h-[85vh] items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-6 py-16">

        <div className="w-full max-w-xl rounded-[32px] bg-white p-10 shadow-2xl">

          <div className="mb-10 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

              <ShieldCheck

                size={42}

                className="text-red-700"

              />

            </div>

            <h1 className="mt-6 text-4xl font-black text-gray-900">

              Cek Hasil Seleksi Administrasi

            </h1>

            <p className="mt-3 text-gray-500">

              PMR SMAN 1 AIKMEL

            </p>

          </div>

          {error && (

            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">

              {error}

            </div>

          )}

          <div className="space-y-6">
                      <div>

            <label className="mb-2 block font-semibold text-gray-700">

              Nomor Pendaftaran

            </label>

            <div className="relative">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input

                type="text"

                value={registrationNumber}

                onChange={(e)=>

                  setRegistrationNumber(

                    e.target.value

                  )

                }

                placeholder="Contoh : PMR2026001"

                className="w-full rounded-2xl border border-gray-300 py-4 pl-12 pr-4 outline-none transition focus:border-red-600"

              />

            </div>

          </div>

          <div>

            <label className="mb-2 block font-semibold text-gray-700">

              Tanggal Lahir

            </label>

            <input

              type="date"

              value={birthDate}

              onChange={(e)=>

                setBirthDate(

                  e.target.value

                )

              }

              className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-red-600"

            />

          </div>

          <button

            onClick={login}

            disabled={

              loading ||

              !registrationNumber ||

              !birthDate

            }

            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-700 py-4 text-lg font-bold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"

          >

            <ArrowRight size={20}/>

            {

              loading

                ? "Memeriksa..."

                : "Cek Kelulusan"

            }

          </button>

          <div className="rounded-2xl bg-gray-50 p-5">

            <p className="text-center text-sm leading-7 text-gray-500">

              Masukkan

              <span className="font-semibold text-gray-700">

                {" "}Nomor Pendaftaran{" "}

              </span>

              dan

              <span className="font-semibold text-gray-700">

                {" "}Tanggal Lahir{" "}

              </span>

              untuk melihat hasil seleksi anggota baru PMR SMAN 1 AIKMEL.

            </p>

          </div>
                    </div>

        </div>

      </section>

    </Layout>

  );

}

export default GraduationLogin;
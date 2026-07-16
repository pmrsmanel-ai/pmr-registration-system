import { Link } from "react-router-dom";

import {
  Trophy,
  ArrowRight,
} from "lucide-react";

function GraduationBanner({

  settings,

}) {

  if (

    settings?.graduation_open !== "true"

  ) {

    return null;

  }

  return (

    <section className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 py-20">

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-8 text-center text-white lg:flex-row lg:justify-between lg:text-left">

        <div>

          <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-white/20 px-5 py-3 backdrop-blur">

            <Trophy size={22} />

            <span className="font-bold">

              PENGUMUMAN RESMI

            </span>

          </div>

          <h2 className="text-5xl font-black">

            {

              settings.graduation_title ||

              "Pengumuman Kelulusan"

            }

          </h2>

          <p className="mt-6 max-w-2xl text-xl leading-9 text-red-100">

            Hasil seleksi Anggota Baru

            PMR SMAN 1 AIKMEL

            telah diumumkan.

            Klik tombol di samping

            untuk melihat hasil kelulusan.

          </p>

        </div>

        <Link

          to="/graduation"

          className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-5 text-lg font-bold text-red-700 shadow-xl transition hover:-translate-y-1"

        >

          Cek Kelulusan

          <ArrowRight size={22} />

        </Link>

      </div>

    </section>

  );

}

export default GraduationBanner;
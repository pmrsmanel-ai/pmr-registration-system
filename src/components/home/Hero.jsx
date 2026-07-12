import { Link } from "react-router-dom";
import {
  ArrowRight,
  PlayCircle,
  ShieldPlus,
} from "lucide-react";

import Container from "../layout/Container";
import BackgroundDecoration from "./BackgroundDecoration";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";

function Hero({

  settings,

  stats,

}) {

  return (

    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-white pt-40 pb-24">

      <BackgroundDecoration />

      <Container>

        <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-100 px-5 py-2 text-sm font-semibold text-red-700">

              <ShieldPlus size={18} />

              {

                settings.hero_badge ||

                "Pendaftaran Anggota PMR Tahun 2026"

              }

            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight text-gray-900 lg:text-7xl">

              {

                settings.hero_title ||

                "Jadilah Generasi Peduli, Sigap & Berkarakter"

              }

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-9 text-gray-600">

              {

                settings.hero_subtitle ||

                "Bergabung bersama PMR SMAN 1 AIKMEL."

              }

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link

                to={

                  settings.hero_button_link ||

                  "/register"

                }

                className="flex items-center gap-2 rounded-2xl bg-red-700 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-red-800 hover:shadow-2xl"

              >

                {

                  settings.hero_button_text ||

                  "Daftar Sekarang"

                }

                <ArrowRight size={20} />

              </Link>

              <a

                href={

                  settings.learn_more_link ||

                  "#tentang"

                }

                className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 transition duration-300 hover:border-red-700 hover:text-red-700"

              >

                <PlayCircle size={20} />

                Pelajari PMR

              </a>

            </div>

            <div className="mt-8">

              {

                settings.registration_status === "OPEN"

                  ? (

                    <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">

                      🟢 Pendaftaran Dibuka

                    </span>

                  )

                  : (

                    <span className="rounded-full bg-red-100 px-5 py-2 font-semibold text-red-700">

                      🔴 Pendaftaran Ditutup

                    </span>

                  )

              }

            </div>

          </div>

          {/* RIGHT */}

          <HeroImage

  settings={settings}

/>

        </div>

        <div className="mt-24">

          <HeroStats

            stats={stats}

          />

        </div>

      </Container>

    </section>

  );

}

export default Hero;
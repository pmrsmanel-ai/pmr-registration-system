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

 const isRegistrationOpen =
  String(settings.registration_open).toLowerCase() === "true";

const isGraduationOpen =
  String(settings.graduation_open).toLowerCase() === "true";

  function scrollToSection(id) {
  const section = document.querySelector(id);

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

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

            <h1 className="
mt-8
max-w-3xl
whitespace-pre-line
text-5xl
font-black
tracking-tight
leading-[1.1]
text-gray-900
lg:text-7xl
">
  {settings.hero_title || "Jadilah Generasi Peduli, Sigap & Berkarakter"}
</h1>

            <p className="mt-8 max-w-xl whitespace-pre-line max-w-2xl
text-xl
leading-9
text-gray-600 text-gray-600">

              {

                settings.hero_subtitle ||

                "Bergabung bersama PMR SMAN 1 AIKMEL."

              }

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
  to={
    isRegistrationOpen
      ? "/register"
      : isGraduationOpen
      ? "/graduation"
      : "#"
  }

                className="flex items-center gap-2 rounded-2xl bg-red-700 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-red-800 hover:shadow-2xl"

              >

                {
  isRegistrationOpen
    ? "Gabung PMR"
    : isGraduationOpen
    ? "Hasil Seleksi"
    : "Pendaftaran Ditutup"
}

                <ArrowRight size={20} />

              </Link>

              <a

                href={

                  settings.learn_more_link ||

                  "#tentang"

                }

                className={`flex items-center gap-2 rounded-2xl px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300

${
  isRegistrationOpen
    ? "bg-red-700 hover:bg-red-800 hover:-translate-y-1 hover:shadow-2xl"

    : isGraduationOpen
    ? "bg-blue-700 hover:bg-blue-800 hover:-translate-y-1 hover:shadow-2xl"

    : "cursor-not-allowed bg-gray-400"
}`}

              >

                <PlayCircle size={20} />

                Pelajari PMR

              </a>

            </div>

            <div className="mt-8">

  {isRegistrationOpen ? (

    <div className="rounded-2xl border border-green-200 bg-green-50 p-5">

      <h3 className="font-bold text-green-700">

        🟢 Pendaftaran Dibuka

      </h3>

      <p className="mt-2 text-sm text-green-700">

        Bergabunglah bersama PMR SMAN 1 AIKMEL.

      </p>

    </div>

  ) : isGraduationOpen ? (

    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">

      <h3 className="font-bold text-blue-700">

        🎓 Hasil Seleksi Telah Dibuka

      </h3>

      <p className="mt-2 text-sm text-blue-700">

        Silakan cek hasil seleksi Anda.

      </p>

    </div>

  ) : (

    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

      <h3 className="font-bold text-gray-700">

        🔴 Pendaftaran Ditutup

      </h3>

      <p className="mt-2 text-sm text-gray-600">

        Sampai bertemu pada rekrutmen berikutnya.

      </p>

    </div>

  )}

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
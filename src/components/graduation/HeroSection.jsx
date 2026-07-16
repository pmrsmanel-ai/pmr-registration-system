import {
  Sparkles,
  Trophy,
} from "lucide-react";

function HeroSection({ applicant }) {

  return (

    <section className="relative overflow-hidden px-10 pt-10">

      {/* Background */}

      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-red-700 via-red-600 to-red-500"></div>

      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

      <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl"></div>

      {/* Content */}

      <div className="relative z-10 px-8 py-12 text-center text-white">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur">

          <Trophy
            size={52}
          />

        </div>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-yellow-300 px-6 py-3 text-red-700 shadow-xl">

          <Sparkles size={20} />

          <span className="font-bold">

            PENGUMUMAN RESMI

          </span>

        </div>

        <h2 className="mt-8 text-6xl font-black uppercase">

          Selamat & Sukses

        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-2xl leading-10 text-red-100">

          Anda dinyatakan

          <span className="mx-2 rounded-lg bg-white px-3 py-1 font-black text-red-700">

            LOLOS

          </span>

          sebagai Anggota Baru

          PMR SMAN 1 AIKMEL.

        </p>

        <div className="mx-auto mt-10 h-1 w-48 rounded-full bg-white/30"></div>

        <h3 className="mt-10 text-5xl font-black">

          {applicant.full_name}

        </h3>

        <p className="mt-4 text-2xl text-red-100">

          {applicant.class}

        </p>

      </div>

    </section>

  );

}

export default HeroSection;
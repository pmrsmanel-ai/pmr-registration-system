import { Pencil } from "lucide-react";

function HomepageHeroSection() {

  return (

    <section className="rounded-3xl bg-white p-8 shadow">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-black">

            Hero Section

          </h2>

          <p className="mt-2 text-gray-500">

            Kelola tampilan Hero yang muncul pertama kali pada Homepage.

          </p>

        </div>

        <button

          className="flex items-center gap-3 rounded-2xl bg-red-700 px-6 py-4 font-bold text-white transition hover:bg-red-800"

        >

          <Pencil size={18} />

          Edit Hero

        </button>

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <div className="space-y-4">

          <PreviewItem

            label="Badge"

            value="Pendaftaran PMR Tahun 2026"

          />

          <PreviewItem

            label="Judul"

            value="Jadilah Generasi Peduli, Sigap & Berkarakter"

          />

          <PreviewItem

            label="Sub Judul"

            value="Bergabung bersama PMR SMAN 1 AIKMEL."

          />

          <PreviewItem

            label="Status"

            value="OPEN"

          />

        </div>

        <div className="space-y-4">

          <PreviewItem

            label="Tombol Utama"

            value="Gabung PMR →"

          />

          <PreviewItem

            label="Link Tombol"

            value="/register"

          />

          <PreviewItem

            label="Tombol Kedua"

            value="Pelajari PMR"

          />

          <PreviewItem

            label="Hero Image"

            value="/images/hero.png"

          />

        </div>

      </div>

    </section>

  );

}

function PreviewItem({

  label,

  value,

}) {

  return (

    <div className="rounded-2xl border border-gray-200 p-4">

      <p className="text-sm font-semibold text-gray-500">

        {label}

      </p>

      <p className="mt-2 font-bold text-gray-900">

        {value || "-"}

      </p>

    </div>

  );

}

export default HomepageHeroSection;
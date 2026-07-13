import {
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";

import Container from "../layout/Container";

function About() {
  return (
    <section
      id="tentang"
      className="bg-white py-24"
    >
      <Container>

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Kiri */}

          <div className="relative">

            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-red-100"></div>

            <img
              src={`${import.meta.env.BASE_URL}images/about-pmr.jpg`}
              alt="PMR SMANEL"
              className="relative rounded-[32px] shadow-2xl"
            />

          </div>

          {/* Kanan */}

          <div>

            <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
              Tentang PMR
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight text-gray-900">
              Membangun Generasi
              <span className="block text-red-700">
                Peduli & Siap Menolong
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Palang Merah Remaja (PMR) merupakan wadah pembinaan anggota muda
              PMI yang membentuk karakter kepemimpinan, kepedulian sosial,
              kedisiplinan, dan keterampilan pertolongan pertama melalui
              berbagai kegiatan kemanusiaan.
            </p>

            <div className="mt-10 space-y-6">

              <div className="flex gap-5">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                  <HeartHandshake size={30} />
                </div>

                <div>

                  <h3 className="text-xl font-bold">
                    Peduli Sesama
                  </h3>

                  <p className="mt-2 text-gray-600 leading-7">
                    Menanamkan rasa empati dan semangat kemanusiaan kepada setiap anggota.
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                  <ShieldCheck size={30} />
                </div>

                <div>

                  <h3 className="text-xl font-bold">
                    Pertolongan Pertama
                  </h3>

                  <p className="mt-2 text-gray-600 leading-7">
                    Belajar keterampilan dasar pertolongan pertama dan kesiapsiagaan bencana.
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                  <Users size={30} />
                </div>

                <div>

                  <h3 className="text-xl font-bold">
                    Kepemimpinan
                  </h3>

                  <p className="mt-2 text-gray-600 leading-7">
                    Melatih tanggung jawab, kerja sama tim, komunikasi, dan jiwa kepemimpinan.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}

export default About;
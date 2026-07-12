import {
  CheckCircle2,
  FileText,
  HeartHandshake,
  UserCheck,
} from "lucide-react";

import Container from "../layout/Container";

const requirements = [
  {
    icon: UserCheck,
    title: "Siswa Aktif",
    description:
      "Merupakan siswa aktif SMAN 1 AIKMEL kelas X atau XI.",
  },
  {
    icon: HeartHandshake,
    title: "Sehat Jasmani & Rohani",
    description:
      "Memiliki kondisi fisik dan mental yang baik untuk mengikuti kegiatan PMR.",
  },
  {
    icon: FileText,
    title: "Mengisi Formulir",
    description:
      "Mengisi formulir pendaftaran secara lengkap dan benar.",
  },
  {
    icon: CheckCircle2,
    title: "Siap Berkomitmen",
    description:
      "Bersedia mengikuti seluruh proses seleksi dan kegiatan PMR secara aktif.",
  },
];

function Requirements() {
  return (
    <section
      id="persyaratan"
      className="bg-gray-50 py-24"
    >
      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
            Persyaratan
          </span>

          <h2 className="mt-5 text-4xl font-black text-gray-900">
            Persyaratan Pendaftaran
          </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-red-700"></div>

          <p className="mt-6 text-lg text-gray-500">
            Pastikan kamu memenuhi seluruh persyaratan berikut sebelum
            melakukan pendaftaran.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">

          {requirements.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="flex gap-6 rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                  <Icon size={30} />
                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-8 text-gray-500">
                    {item.description}
                  </p>

                </div>

              </div>

            );

          })}

        </div>

      </Container>
    </section>
  );
}

export default Requirements;
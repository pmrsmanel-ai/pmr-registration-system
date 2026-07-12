import Container from "../layout/Container";
import {
  GraduationCap,
  HeartHandshake,
  Award,
  Users,
} from "lucide-react";

const benefits = [
  {
    icon: GraduationCap,
    title: "Belajar & Berkembang",
    description:
      "Kembangkan kemampuan kepemimpinan, komunikasi, kerja sama tim, dan rasa tanggung jawab.",
  },
  {
    icon: HeartHandshake,
    title: "Aksi Kemanusiaan",
    description:
      "Terlibat langsung dalam kegiatan sosial, donor darah, pertolongan pertama, dan aksi kemanusiaan.",
  },
  {
    icon: Award,
    title: "Pengalaman Berharga",
    description:
      "Ikuti pelatihan, perlombaan, dan berbagai kegiatan yang bermanfaat untuk masa depanmu.",
  },
  {
    icon: Users,
    title: "Teman Baru",
    description:
      "Bergabung dengan komunitas yang memiliki semangat, tujuan, dan kepedulian yang sama.",
  },
];

function WhyJoin() {
  return (
    <section id="tentang" className="bg-white py-24">
      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
            Kenapa PMR?
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
            Mengapa Bergabung dengan PMR?
          </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-red-700" />

          <p className="mt-6 text-lg leading-8 text-gray-500">
            PMR bukan hanya organisasi sekolah, tetapi tempat belajar,
            berkembang, dan mengabdi kepada sesama.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {benefits.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-700 transition-all duration-300 group-hover:bg-red-700 group-hover:text-white">

                  <Icon size={36} />

                </div>

                <h3 className="mt-8 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-500">
                  {item.description}
                </p>

              </div>

            );

          })}

        </div>

      </Container>
    </section>
  );
}

export default WhyJoin;
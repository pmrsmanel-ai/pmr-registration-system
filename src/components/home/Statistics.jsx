import {
  Users,
  Trophy,
  HeartHandshake,
  CalendarDays,
} from "lucide-react";

import StatCard from "./StatCard";

export default function Statistics() {
  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span
            className="
              bg-red-100
              text-red-600
              px-5
              py-2
              rounded-full
              font-semibold
            "
          >
            PMR SMANEL
          </span>

          <h2 className="mt-6 text-5xl font-black">

            PMR Dalam
            <span className="text-red-600">
              {" "}Angka
            </span>

          </h2>

          <p className="mt-5 text-gray-500 max-w-3xl mx-auto leading-8">

            Kami terus berkembang menjadi organisasi
            yang aktif dalam bidang kemanusiaan,
            kepemimpinan, dan pengabdian masyarakat.

          </p>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

          <StatCard
            icon={Users}
            value="350+"
            title="Anggota Aktif"
          />

          <StatCard
            icon={Trophy}
            value="28"
            title="Prestasi"
          />

          <StatCard
            icon={HeartHandshake}
            value="120+"
            title="Aksi Kemanusiaan"
          />

          <StatCard
            icon={CalendarDays}
            value="15"
            title="Tahun Berdiri"
          />

        </div>

      </div>

    </section>
  );
}
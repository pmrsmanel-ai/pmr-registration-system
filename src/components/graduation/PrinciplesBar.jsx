import {
  HeartHandshake,
  Users,
  Scale,
  Shield,
  HandHeart,
  Globe2,
  Building2,
} from "lucide-react";

const principles = [
  {
    icon: HeartHandshake,
    title: "Kemanusiaan",
  },
  {
    icon: Users,
    title: "Kesamaan",
  },
  {
    icon: Scale,
    title: "Kenetralan",
  },
  {
    icon: Shield,
    title: "Kemandirian",
  },
  {
    icon: HandHeart,
    title: "Kesukarelaan",
  },
  {
    icon: Building2,
    title: "Kesatuan",
  },
  {
    icon: Globe2,
    title: "Kesemestaan",
  },
];

function PrinciplesBar() {

  return (

    <section className="bg-white px-10 py-10">

      <div className="overflow-hidden rounded-[36px] border border-red-100 bg-gradient-to-br from-red-50 via-white to-red-50 shadow-lg">

        <div className="px-10 py-10">

          <div className="text-center">

            <h2 className="text-3xl font-black text-red-700">

              7 Prinsip Dasar Gerakan

            </h2>

            <p className="mt-3 text-gray-600">

              Palang Merah dan Bulan Sabit Merah Internasional

            </p>

          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 xl:grid-cols-7">

            {principles.map((item) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.title}
                  className="group rounded-3xl bg-white p-6 text-center shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-700 transition group-hover:bg-red-700 group-hover:text-white">

                    <Icon size={30} />

                  </div>

                  <h3 className="mt-5 text-sm font-bold leading-6 text-gray-800">

                    {item.title}

                  </h3>

                </div>

              );

            })}

          </div>

        </div>

      </div>

    </section>

  );

}

export default PrinciplesBar;
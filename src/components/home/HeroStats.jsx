import {
  Users,
  CalendarDays,
  Trophy,
  HeartHandshake,
} from "lucide-react";

const iconMap = {
  Users,
  CalendarDays,
  Trophy,
  HeartHandshake,
};

function HeroStats({

  stats = [],

}) {

  return (

    <section className="-mt-6 relative z-20">

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {

          const Icon =

            iconMap[item.icon] ||

            Users;

          return (

            <div

              key={item.id}

              className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"

            >

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-700 transition group-hover:bg-red-700 group-hover:text-white">

                <Icon size={30} />

              </div>

              <h2 className="mt-6 text-4xl font-black text-gray-900">

                {item.value}

              </h2>

              <p className="mt-2 text-gray-500">

                {item.title}

              </p>

              {

                item.subtitle && (

                  <p className="mt-1 text-sm text-gray-400">

                    {item.subtitle}

                  </p>

                )

              }

            </div>

          );

        })}

      </div>

    </section>

  );

}

export default HeroStats;
import {
  Users,
  CalendarDays,
  Trophy,
  HeartHandshake,
  ChevronRight,
} from "lucide-react";

const iconMap = {
  Users,
  CalendarDays,
  Trophy,
  HeartHandshake,
};

function HeroStatCard({

  item,

  onClick,

}) {

  const Icon =
    iconMap[item.icon] || Users;

  return (

    <button
      onClick={() => onClick(item)}
      className="group w-full rounded-3xl border border-gray-100 bg-white p-8 text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >

      <div className="flex items-start justify-between">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-700 transition-all duration-300 group-hover:bg-red-700 group-hover:text-white">

          <Icon size={30} />

        </div>

        <ChevronRight
          size={20}
          className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1"
        />

      </div>

      <h2 className="mt-6 text-4xl font-black text-gray-900">

        {item.value}

      </h2>

      <p className="mt-2 font-medium text-gray-700">

        {item.title}

      </p>

      {

        item.subtitle && (

          <p className="mt-1 text-sm text-gray-400">

            {item.subtitle}

          </p>

        )

      }

      <p className="mt-5 text-sm font-medium text-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100">

        Klik untuk melihat detail

      </p>

    </button>

  );

}

export default HeroStatCard;
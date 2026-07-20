import {
  CalendarDays,
  Clock3,
  MapPin,
  Shirt,
  Backpack,
} from "lucide-react";

function TrainingInformation({
  settings = {},
}) {
  const items = [
    {
      icon: <CalendarDays size={22} />,
      title: "Tanggal Diklat",
      value: settings.training_date,
    },
    {
      icon: <Clock3 size={22} />,
      title: "Jam Diklat",
      value: settings.training_time,
    },
    {
      icon: <MapPin size={22} />,
      title: "Lokasi Diklat",
      value: settings.training_location,
    },
    {
      icon: <Shirt size={22} />,
      title: "Dresscode",
      value: settings.training_dresscode,
    },
    {
      icon: <Backpack size={22} />,
      title: "Perlengkapan",
      value: settings.training_equipment,
      full: true,
    },
  ];

  return (
    <section className="overflow-hidden rounded-3xl border bg-white shadow">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-red-700 to-red-600 px-8 py-6 text-white">

        <h2 className="text-2xl font-black">

          Informasi Pertemuan Pertama

        </h2>

        <p className="mt-2 text-red-100">

          Harap memperhatikan seluruh informasi berikut sebelum hadir.

        </p>

      </div>

      {/* CONTENT */}

      <div className="grid gap-5 p-8 md:grid-cols-2">

        {items.map((item) => (

          <div
            key={item.title}
            className={`rounded-2xl border bg-gray-50 p-5 transition hover:border-red-200 hover:bg-red-50 ${
              item.full ? "md:col-span-2" : ""
            }`}
          >

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-red-100 p-3 text-red-700">

                {item.icon}

              </div>

              <div>

                <p className="text-sm text-gray-500">

                  {item.title}

                </p>

                <h3 className="mt-1 text-lg font-bold text-gray-900 whitespace-pre-line">

                  {item.value || "-"}

                </h3>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default TrainingInformation;
import Container from "../layout/Container";

import {
  CalendarDays,
  ClipboardCheck,
  ShieldCheck,
  Users,
  Trophy,
  Award,
  HeartHandshake,
} from "lucide-react";

const iconMap = {

  CalendarDays,

  ClipboardCheck,

  ShieldCheck,

  Users,

  Trophy,

  Award,

  HeartHandshake,

};

function formatDate(date) {

  if (!date) return "";

  return new Date(date).toLocaleDateString("id-ID", {

    day: "2-digit",

    month: "long",

    year: "numeric",

  });

}

function Timeline({

  timeline = [],

}) {

  return (

    <section

      id="timeline"

      className="bg-white py-20"

    >

      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">

            Jadwal Pendaftaran

          </span>

          <h2 className="mt-5 text-4xl font-extrabold text-gray-900">

            Timeline Pendaftaran

          </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-red-700"></div>

          <p className="mt-6 text-lg text-gray-500">

            Pastikan mengikuti seluruh tahapan sesuai jadwal.

          </p>

        </div>

        <div className="mt-14 rounded-[32px] bg-gradient-to-r from-red-50 to-red-100 p-8 shadow-lg">

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

            {

              timeline.map((item) => {

                const Icon =

                  iconMap[item.icon] ||

                  CalendarDays;

                const colorClass = {

                  red: "bg-red-100 text-red-700",

                  green: "bg-green-100 text-green-700",

                  blue: "bg-blue-100 text-blue-700",

                  yellow: "bg-yellow-100 text-yellow-700",

                }[item.color] ||

                "bg-red-100 text-red-700";

                return (

                  <div

                    key={item.id}

                    className="flex items-start gap-5 rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"

                  >

                    <div

                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colorClass}`}

                    >

                      <Icon size={30} />

                    </div>

                    <div className="flex-1">

                      <p className="font-bold text-red-700">

                        {

                          item.start_date && item.end_date

                            ? `${formatDate(item.start_date)} - ${formatDate(item.end_date)}`

                            : formatDate(item.start_date)

                        }

                      </p>

                      <h3 className="mt-2 text-lg font-bold text-gray-900">

                        {item.title}

                      </h3>

                      {

                        item.description && (

                          <p className="mt-2 text-gray-500">

                            {item.description}

                          </p>

                        )

                      }

                    </div>

                  </div>

                );

              })

            }

          </div>

        </div>

      </Container>

    </section>

  );

}

export default Timeline;
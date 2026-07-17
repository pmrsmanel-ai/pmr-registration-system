import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Container from "../layout/Container";

function Cta({

  settings,

}) {

  return (

    <section className="py-24">

      <Container>

        <div className="overflow-hidden rounded-[32px] bg-red-700 p-12 text-center text-white lg:p-16">

          {(settings.cta_badge || "").trim() !== "" && (

            <div className="mb-5 inline-flex rounded-full bg-white/20 px-5 py-2 text-sm font-semibold">

              {settings.cta_badge}

            </div>

          )}

          <h2 className="text-4xl font-bold whitespace-pre-line">

            {

              settings.cta_title ||

              "Siap Menjadi Bagian dari PMR?"

            }

          </h2>

          <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-red-100">

            {

              settings.cta_subtitle ||

              "Jangan lewatkan kesempatan untuk belajar, berkembang, dan berkontribusi dalam kegiatan kemanusiaan."

            }

          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link

              to={

                settings.cta_button_link ||

                "/register"

              }

              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-red-700 transition hover:scale-105"

            >

              {

                settings.cta_button_text ||

                "Daftar Sekarang"

              }

              <ArrowRight size={18} />

            </Link>

            {(settings.cta_secondary_text || "").trim() !== "" && (

              <Link

                to={

                  settings.cta_secondary_link ||

                  "#tentang"

                }

                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/20"

              >

                {settings.cta_secondary_text}

              </Link>

            )}

          </div>

        </div>

      </Container>

    </section>

  );

}

export default Cta;
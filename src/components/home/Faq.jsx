import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "../layout/Container";

function Item({

  item,

  active,

  onClick,

}) {

  return (

    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

      <button

        onClick={onClick}

        className="flex w-full items-center justify-between px-8 py-6 text-left transition hover:bg-gray-50"

      >

        <h3 className="text-lg font-bold text-gray-900">

          {item.question}

        </h3>

        <ChevronDown

          size={22}

          className={`transition duration-300 ${

            active

              ? "rotate-180 text-red-700"

              : ""

          }`}

        />

      </button>

      <div

        className={`grid transition-all duration-300 ${

          active

            ? "grid-rows-[1fr]"

            : "grid-rows-[0fr]"

        }`}

      >

        <div className="overflow-hidden">

          <p className="px-8 pb-8 leading-8 text-gray-600">

            {item.answer}

          </p>

        </div>

      </div>

    </div>

  );

}

function Faq({

  faq = [],

}) {

  const [open, setOpen] = useState(0);

  return (

    <section

      id="faq"

      className="bg-white py-24"

    >

      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">

            FAQ

          </span>

          <h2 className="mt-5 text-4xl font-black text-gray-900">

            Pertanyaan yang Sering Ditanyakan

          </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-red-700"></div>

          <p className="mt-6 text-lg text-gray-500">

            Jika masih ada pertanyaan,

            silakan hubungi pengurus PMR

            SMAN 1 AIKMEL.

          </p>

        </div>

        <div className="mx-auto mt-16 max-w-4xl space-y-5">

          {

            faq.length === 0 ? (

              <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-500">

                Belum ada FAQ.

              </div>

            ) : (

              faq.map((item, index) => (

                <Item

                  key={item.id}

                  item={item}

                  active={open === index}

                  onClick={() =>

                    setOpen(

                      open === index

                        ? -1

                        : index

                    )

                  }

                />

              ))

            )

          }

        </div>

      </Container>

    </section>

  );

}

export default Faq;
import {
  X,
  ArrowRight,
} from "lucide-react";

function HeroStatModal({

  item,

  onClose,

}) {

  if (!item) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm">

      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-8 py-6">

          <div>

            <h2 className="text-3xl font-black text-gray-900">

              {item.detail_title || item.title}

            </h2>

            <p className="mt-2 text-gray-500">

              {item.subtitle}

            </p>

          </div>

          <button

            onClick={onClose}

            className="rounded-xl p-2 transition hover:bg-gray-100"

          >

            <X size={24} />

          </button>

        </div>

        {/* Body */}

        <div className="space-y-8 p-8">

          {/* Statistik */}

          <div className="rounded-3xl bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">

            <p className="text-sm uppercase tracking-widest opacity-80">

              Statistik

            </p>

            <h3 className="mt-3 text-6xl font-black">

              {item.value}

            </h3>

            {

              item.subtitle && (

                <p className="mt-3 text-red-100">

                  {item.subtitle}

                </p>

              )

            }

          </div>

          {/* Gambar */}

          {

            item.image_url && (

              <img

                src={item.image_url}

                alt={item.title}

                className="w-full rounded-3xl object-cover shadow"

              />

            )

          }

          {/* Isi */}

          {

            item.description && (

              <div>

                <h3 className="mb-3 text-xl font-bold">

                  Ringkasan

                </h3>

                <p className="leading-8 text-gray-600">

                  {item.description}

                </p>

              </div>

            )

          }

          {

            item.detail_content && (

              <div>

                <h3 className="mb-3 text-xl font-bold">

                  Informasi Lengkap

                </h3>

                <p className="whitespace-pre-line leading-8 text-gray-600">

                  {item.detail_content}

                </p>

              </div>

            )

          }

        </div>

        {/* Footer */}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t px-8 py-6">

          {

            item.button_text &&

            item.button_link && (

              <a

                href={item.button_link}

                className="inline-flex items-center gap-2 rounded-2xl bg-red-700 px-7 py-3 font-semibold text-white transition hover:bg-red-800"

              >

                {item.button_text}

                <ArrowRight size={18} />

              </a>

            )

          }

          <button

            onClick={onClose}

            className="rounded-2xl border border-gray-300 px-7 py-3 font-semibold transition hover:bg-gray-100"

          >

            Tutup

          </button>

        </div>

      </div>

    </div>

  );

}

export default HeroStatModal;
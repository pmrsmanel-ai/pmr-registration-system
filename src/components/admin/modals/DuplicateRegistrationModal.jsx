import { X, FileText, User, BadgeCheck } from "lucide-react";

function DuplicateRegistrationModal({

  open,

  data,

  onClose,

  onViewCard,

}) {

  if (!open || !data) return null;

  return (

    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="bg-gradient-to-r from-red-700 to-red-600 px-8 py-7 text-white">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">

                Data Pendaftaran Ditemukan

              </h2>

              <p className="mt-1 text-red-100">

                Peserta sudah pernah melakukan pendaftaran.

              </p>

            </div>

            <button

              onClick={onClose}

              className="rounded-full bg-white/20 p-2 transition hover:bg-white/30"

            >

              <X size={20} />

            </button>

          </div>

        </div>

        {/* Body */}

        <div className="space-y-5 p-8">

          <div className="rounded-2xl border border-red-100 bg-red-50 p-5">

            <div className="mb-4 flex items-center gap-3">

              <User className="text-red-700" />

              <span className="font-semibold">

                Informasi Peserta

              </span>

            </div>

            <div className="space-y-4">

              <Row
                label="Nama Lengkap"
                value={data.fullName}
              />

              <Row
                label="Nomor Pendaftaran"
                value={data.registrationNumber}
              />

              <Row
                label="Kelas"
                value={data.class}
              />

              <Row
                label="Status"
                value={data.status}
                badge
              />

            </div>

          </div>

          <div className="rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">

            Data dengan nama, email, dan nomor HP yang sama sudah terdaftar.
            Silakan gunakan kartu pendaftaran yang sudah dimiliki.

          </div>

        </div>

        {/* Footer */}

        <div className="flex gap-3 border-t bg-gray-50 p-6">

          <button

            onClick={onClose}

            className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold transition hover:bg-gray-100"

          >

            Tutup

          </button>

          <button

            onClick={onViewCard}

            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-700 py-3 font-semibold text-white transition hover:bg-red-800"

          >

            <FileText size={18} />

            Lihat Kartu

          </button>

        </div>

      </div>

    </div>

  );

}

function Row({

  label,

  value,

  badge = false,

}) {

  return (

    <div className="flex items-center justify-between gap-4">

      <span className="text-gray-500">

        {label}

      </span>

      {

        badge

        ?

        (

          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

            <BadgeCheck size={15} />

            {value}

          </span>

        )

        :

        (

          <span className="text-right font-semibold">

            {value}

          </span>

        )

      }

    </div>

  );

}

export default DuplicateRegistrationModal;
import { ArrowRight, Clock3, FileText, Camera } from "lucide-react";

function RegisterIntro({ onStart }) {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">

      <div className="text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
          🩸
        </div>

        <h1 className="mt-6 text-4xl font-extrabold">
          Pendaftaran Anggota PMR
        </h1>

        <p className="mt-3 text-gray-500">
          SMAN 1 AIKMEL
        </p>

      </div>

      <div className="mt-10 space-y-4">

        <div className="flex items-center gap-4 rounded-2xl border p-5">
          <Clock3 className="text-red-700" />
          <div>
            <h3 className="font-semibold">Estimasi Waktu</h3>
            <p className="text-sm text-gray-500">± 5 Menit</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border p-5">
          <FileText className="text-red-700" />
          <div>
            <h3 className="font-semibold">5 Tahapan</h3>
            <p className="text-sm text-gray-500">Isi data hingga selesai.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border p-5">
          <Camera className="text-red-700" />
          <div>
            <h3 className="font-semibold">Siapkan Pas Foto</h3>
            <p className="text-sm text-gray-500">
              JPG / PNG maksimal 2 MB.
            </p>
          </div>
        </div>

      </div>

      <button
        onClick={onStart}
        className="mt-10 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-700 py-4 font-semibold text-white hover:bg-red-800"
      >
        Mulai Pendaftaran
        <ArrowRight size={20} />
      </button>

    </div>
  );
}

export default RegisterIntro;
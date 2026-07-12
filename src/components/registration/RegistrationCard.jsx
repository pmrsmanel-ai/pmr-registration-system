import { forwardRef } from "react";
import QRCode from "react-qr-code";

const RegistrationCard = forwardRef(({ data }, ref) => {
  return (
    <div
      ref={ref}
      className="mx-auto w-[900px] overflow-hidden rounded-[36px] bg-white shadow-2xl"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 px-12 py-10 text-center text-white">

        <img
          src="/images/logo-pmr.png"
          alt="PMR"
          className="mx-auto h-28 w-28 object-contain"
        />

        <h1 className="mt-6 text-4xl font-black">
          BUKTI PENDAFTARAN
        </h1>

        <p className="mt-2 text-xl">
          Calon Anggota PMR SMAN 1 AIKMEL
        </p>

        <p className="mt-1">
          Tahun 2026
        </p>

      </div>

      {/* Body */}
      <div className="p-12">

        <div className="flex justify-center">

          <img
            src={
              data.photoUrl ||
              "/images/avatar-placeholder.png"
            }
            alt="Foto Peserta"
            className="h-52 w-52 rounded-3xl border-4 border-red-100 object-cover"
          />

        </div>

        <div className="mt-10 space-y-6">

          <Item
            title="Nama Lengkap"
            value={
              data.fullName ||
              data.namaLengkap ||
              "-"
            }
          />

          <Item
            title="Kelas"
            value={
              data.class ||
              data.kelas ||
              "-"
            }
          />

          <Item
            title="Nomor Pendaftaran"
            value={
              data.registrationNumber ||
              "-"
            }
          />

          <Item
            title="Status"
            value={
              data.status ||
              "-"
            }
          />

          <Item
            title="Tanggal Daftar"
            value={
              data.createdAt ||
              "-"
            }
          />

        </div>

        <div className="mt-12 flex justify-center">

          <div className="rounded-3xl border p-6">

            <QRCode
              value={
                data.qrCode ||
                data.registrationNumber ||
                "-"
              }
              size={180}
            />

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="bg-gray-100 px-12 py-8 text-center">

        <p className="text-lg font-semibold text-gray-700">
          Portal Pendaftaran ANGGOTA BARU PMR SMAN 1 AIKMEL
        </p>

        <p className="mt-2 text-gray-500">
          Simpan bukti ini dan tunjukkan kepada panitia saat registrasi ulang.
        </p>

      </div>

    </div>
  );
});

function Item({ title, value }) {
  return (
    <div className="flex justify-between border-b border-gray-200 pb-4">

      <span className="font-semibold text-gray-500">
        {title}
      </span>

      <span className="font-bold text-gray-900">
        {value}
      </span>

    </div>
  );
}

export default RegistrationCard;
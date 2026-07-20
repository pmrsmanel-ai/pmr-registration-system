import QRCode from "react-qr-code";

function ParticipantCard({ applicant }) {

  return (

    <div
    id="participant-card"
    className="flex flex-col overflow-hidden rounded-[36px] bg-white shadow-2xl"
    style={{
        width: "1080px",
        height: "1350px",
    }}
>

      {/* ================= HEADER ================= */}

<div className="relative h-64 overflow-hidden bg-gradient-to-r from-red-800 via-red-700 to-red-600">

  <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-white/10"/>

  <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-white/10"/>

  <div className="flex h-full items-center justify-between px-16">

    <div>

      <h1 className="text-7xl font-black text-white">

        PMR SMANEL

      </h1>

      <p className="mt-3 text-3xl text-red-100">

        Official Registration System

      </p>

    </div>

    <div className="rounded-3xl border border-white/20 bg-white/10 px-10 py-8 text-center backdrop-blur">

      <p className="text-2xl uppercase tracking-widest text-white">

        Tahun

      </p>

      <h2 className="mt-2 text-6xl font-black text-white">

        2026

      </h2>

    </div>

  </div>

</div>

{/* ================= CONTENT ================= */}

<div className="flex-1 px-14 py-10">

    <div className="grid h-full grid-cols-[340px_1fr] gap-12">

        {/* LEFT */}

        <div className="flex h-full flex-col">

    {/* FOTO */}

    <div className="overflow-hidden rounded-[30px] border-[6px] border-red-100 shadow-lg">

        <img
            src={
                applicant.photo_url ||
                `${import.meta.env.BASE_URL}images/avatar-placeholder.png`
            }
            alt={applicant.full_name}
            className="aspect-[3/4] w-full object-cover"
        />

    </div>

    {/* QR */}

    <div className="mt-8 rounded-3xl border bg-gray-50 p-6">

        <div className="flex justify-center">

<QRCode
    value={`${window.location.origin}/verify/${applicant.registration_number}`}
    size={190}
/>

        </div>

        <p className="mt-4 text-center text-lg text-gray-500">

            Scan untuk verifikasi peserta

        </p>

    </div>

</div>

        {/* RIGHT */}

        <div className="flex h-full flex-col">

    {/* Nama */}

    <div>

        <p className="text-lg font-semibold uppercase tracking-[4px] text-gray-500">
            Nama Lengkap
        </p>

        <h2 className="mt-2 text-5xl font-black leading-tight text-gray-900">
            {applicant.full_name}
        </h2>

    </div>

    {/* Nomor */}

    <div className="mt-8">

        <p className="text-lg font-semibold uppercase tracking-[4px] text-gray-500">
            Nomor Pendaftaran
        </p>

        <div className="mt-2 rounded-2xl bg-red-50 px-6 py-4">

            <p
                className="font-black text-red-700 whitespace-nowrap"
                style={{ fontSize: "38px" }}
            >
                {applicant.registration_number}
            </p>

        </div>

    </div>

    {/* Status */}

    <div className="mt-8">

        <p className="text-lg font-semibold uppercase tracking-[4px] text-gray-500">
            Status Kelulusan
        </p>

        <div className="mt-3 inline-flex rounded-full bg-green-100 px-8 py-4">

            <span className="text-2xl font-black text-green-700">
                {applicant.status}
            </span>

        </div>

    </div>

    <div className="my-8 h-px bg-gray-200" />

    {/* Informasi */}

    <div>

        <h3 className="text-2xl font-bold text-gray-900">
            Informasi Penting
        </h3>

        <ul className="mt-5 space-y-4 text-xl leading-9 text-gray-700">

            <li>
                • Kartu ini merupakan bukti resmi peserta PMR SMANEL.
            </li>

            <li>
                • Tunjukkan kartu ini saat registrasi ulang.
            </li>

            <li>
                • Simpan kartu hingga seluruh proses seleksi selesai.
            </li>

        </ul>

    </div>

    {/* Catatan */}

    <div className="mt-auto rounded-3xl bg-red-700 p-6">

        <h3 className="text-2xl font-bold text-white">
            Catatan
        </h3>

        <p className="mt-3 text-xl leading-8 text-red-100">
            Mohon hadir sesuai jadwal yang telah ditentukan dan membawa kartu ini saat kegiatan registrasi maupun latihan perdana PMR SMANEL.
        </p>

    </div>

</div>

    </div>
    </div>

   {/* ================= FOOTER ================= */}

<div className="flex h-[90px] shrink-0 items-center justify-between bg-gradient-to-r from-red-800 via-red-700 to-red-600 px-14">

  <div>

    <h3 className="text-2xl font-black text-white">

      PMR SMANEL

    </h3>

    <p className="text-lg text-red-100">

      Together We Can We Are Not Alone

    </p>

  </div>

  <div className="text-right">

    <p className="text-lg text-red-100">

      Official Registration System

    </p>

    <p className="text-xl font-bold text-white">

      © 2026 PMR SMAN 1 AIKMEL

    </p>

  </div>

</div>

    </div>

  );

}

export default ParticipantCard;
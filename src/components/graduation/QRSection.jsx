import QRCode from "react-qr-code";

import {
  ShieldCheck,
  BadgeCheck,
  Hash,
} from "lucide-react";

function QRSection({

  applicant,

}) {

  const verifyUrl =

    `${window.location.origin}/verify/${applicant.registration_number}`;

  return (

    <section className="bg-white px-10 py-10">

      <div className="overflow-hidden rounded-[36px] bg-gradient-to-br from-red-700 via-red-600 to-red-500 shadow-2xl">

        <div className="grid items-center gap-10 p-10 lg:grid-cols-[1fr_260px]">

          {/* LEFT */}

          <div className="text-white">

            <div className="inline-flex items-center gap-3 rounded-full bg-white/15 px-5 py-3 backdrop-blur">

              <ShieldCheck size={22} />

              <span className="font-bold">

                Official Digital Verification

              </span>

            </div>

            <h2 className="mt-8 text-4xl font-black">

              Scan QR Code

            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-red-100">

              QR Code ini digunakan untuk

              memverifikasi keaslian kartu

              pengumuman kelulusan peserta.

            </p>

            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-4">

                <Hash size={22} />

                <span className="font-semibold">

                  {applicant.registration_number}

                </span>

              </div>

              <div className="flex items-center gap-4">

                <BadgeCheck size={22} />

                <span className="font-semibold">

                  VERIFIED DIGITAL CARD

                </span>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex justify-center">

            <div className="rounded-[28px] bg-white p-6 shadow-2xl">

              <QRCode

                value={verifyUrl}

                size={200}

              />

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}

export default QRSection;
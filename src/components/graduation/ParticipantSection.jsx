import {
  User,
  Phone,
  School,
  Hash,
} from "lucide-react";

function Item({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-5 transition hover:bg-red-50">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-700">

          {icon}

        </div>

        <div>

          <p className="text-sm text-gray-500">

            {label}

          </p>

          <h3 className="font-bold text-gray-900">

            {value || "-"}

          </h3>

        </div>

      </div>

    </div>
  );
}

function ParticipantSection({

  applicant,

}) {

  return (

    <section className="bg-white px-10 py-12">

      <div className="grid gap-10 lg:grid-cols-[340px,1fr]">

        {/* FOTO */}

        <div className="flex justify-center">

          <div className="relative">

            <div className="absolute -inset-3 rounded-[36px] bg-gradient-to-br from-red-600 to-red-400 blur-xl opacity-20"></div>

            <div className="relative overflow-hidden rounded-[36px] border-[8px] border-white shadow-2xl">

              <img

                src={
                  applicant.photo_url ||

                  `${import.meta.env.BASE_URL}images/avatar-placeholder.png`
                }

                alt={applicant.full_name}

                className="h-[430px] w-[320px] object-cover"

              />

            </div>

          </div>

        </div>

        {/* BIODATA */}

        <div>

          <h2 className="text-4xl font-black text-gray-900">

            Identitas Peserta

          </h2>

          <p className="mt-3 text-lg text-gray-500">

            Data berikut merupakan identitas resmi peserta yang dinyatakan lolos seleksi.

          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">

            <Item

              icon={<User size={20}/>}

              label="Nama Lengkap"

              value={applicant.full_name}

            />

            <Item

              icon={<School size={20}/>}

              label="Kelas"

              value={applicant.class}

            />

            <Item

              icon={<Hash size={20}/>}

              label="Nomor Pendaftaran"

              value={applicant.registration_number}

            />

            <Item

              icon={<Phone size={20}/>}

              label="Nomor HP"

              value={applicant.phone}

            />

          </div>

          <div className="mt-10 rounded-3xl border border-green-200 bg-green-50 p-8">

            <h3 className="text-2xl font-black text-green-700">

              Status Kelulusan

            </h3>

            <p className="mt-4 text-lg leading-8 text-gray-700">

              Selamat!

              Anda telah berhasil melewati seluruh tahapan seleksi dan resmi diterima sebagai Anggota Baru PMR SMAN 1 AIKMEL.

            </p>

          </div>

        </div>

      </div>

    </section>

  );

}

export default ParticipantSection;
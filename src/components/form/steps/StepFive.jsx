import { useFormContext } from "react-hook-form";
import {
  CheckCircle2,
  User,
  Phone,
  School,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

function Item({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-gray-200 p-5">

      <div className="rounded-xl bg-red-100 p-3 text-red-700">
        <Icon size={20} />
      </div>

      <div>
        <p className="text-sm text-gray-500">
          {label}
        </p>

        <p className="mt-1 font-semibold text-gray-900">
          {value || "-"}
        </p>
      </div>

    </div>
  );
}

function StepFive() {
  const { getValues, register } = useFormContext();

  const data = getValues();

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Konfirmasi Data
        </h2>

        <p className="mt-2 text-gray-500">
          Periksa kembali data sebelum dikirim.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <Item
          icon={User}
          label="Nama Lengkap"
          value={data.namaLengkap}
        />

        <Item
          icon={User}
          label="Nama Panggilan"
          value={data.namaPanggilan}
        />

        <Item
          icon={School}
          label="Kelas"
          value={data.kelas}
        />

        <Item
          icon={Phone}
          label="Nomor HP"
          value={data.noHp}
        />

        <Item
          icon={HeartPulse}
          label="Golongan Darah"
          value={data.golonganDarah}
        />

        <Item
          icon={ShieldCheck}
          label="Status Kesehatan"
          value={
            data.riwayatPenyakit
              ? data.riwayatPenyakit
              : "Tidak Ada"
          }
        />

      </div>

      {data.foto && (
        <div className="mt-8">

          <h3 className="mb-4 font-semibold">
            Preview Foto
          </h3>

          <img
            src={URL.createObjectURL(data.foto)}
            alt="Foto"
            className="h-60 w-48 rounded-2xl border object-cover shadow-lg"
          />

        </div>
      )}

      <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-5">

        <label className="flex items-start gap-3">

          <input
            type="checkbox"
            {...register("persetujuan", {
              required: true,
            })}
            className="mt-1 h-5 w-5"
          />

          <span className="text-sm leading-7">
            Saya menyatakan bahwa seluruh data yang saya isi adalah benar.
            Apabila terdapat data yang tidak sesuai, saya bersedia menerima
            keputusan panitia.
          </span>

        </label>

      </div>

      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-blue-50 p-5">

        <CheckCircle2
          className="text-blue-700"
          size={24}
        />

        <p className="text-sm text-blue-800">
          Setelah menekan tombol <b>Kirim Pendaftaran</b>,
          data tidak dapat diubah kembali.
        </p>

      </div>
    </>
  );
}

export default StepFive;
import { useFormContext } from "react-hook-form";
import {
  UserRound,
  Phone,
  Users,
} from "lucide-react";

import Input from "../Input";

function StepThree() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Data Orang Tua / Wali
        </h2>

        <p className="mt-2 text-gray-500">
          Data ini digunakan apabila terjadi keadaan darurat atau keperluan administrasi.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          label="Nama Ayah / Wali"
          name="namaAyah"
          register={register}
          required
          error={errors.namaAyah}
          placeholder="Masukkan nama ayah / wali"
          icon={UserRound}
        />

        <Input
          label="Nama Ibu / Wali"
          name="namaIbu"
          register={register}
          required
          error={errors.namaIbu}
          placeholder="Masukkan nama ibu / wali"
          icon={UserRound}
        />

        <div className="md:col-span-2">
          <Input
            label="Nomor HP Orang Tua / Wali"
            name="noHpOrtu"
            register={register}
            required
            error={errors.noHpOrtu}
            placeholder="08xxxxxxxxxx"
            icon={Phone}
          />
        </div>

        <div className="md:col-span-2 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <Users className="mt-1 text-blue-600" size={22} />

            <div>
              <h4 className="font-semibold text-blue-800">
                Informasi
              </h4>

              <p className="mt-1 text-sm leading-6 text-blue-700">
                Pastikan nomor yang dimasukkan aktif agar panitia dapat
                menghubungi orang tua atau wali apabila diperlukan.
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default StepThree;
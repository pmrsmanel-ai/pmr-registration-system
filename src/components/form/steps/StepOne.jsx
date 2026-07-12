import { Home, Mail, Phone, User, Calendar, MapPin } from "lucide-react";
import { useFormContext } from "react-hook-form";

import Input from "../Input";
import Select from "../Select";

function StepOne() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="mb-10">
        <h2 className="text-3xl font-black text-gray-900">
          Data Diri
        </h2>

        <p className="mt-2 text-gray-500">
          Lengkapi informasi pribadi calon anggota PMR.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          label="Nama Lengkap"
          name="namaLengkap"
          placeholder="Masukkan nama lengkap"
          register={register}
          error={errors.namaLengkap}
          required
          icon={User}
        />

        <Input
          label="Nama Panggilan"
          name="namaPanggilan"
          placeholder="Masukkan nama panggilan"
          register={register}
          error={errors.namaPanggilan}
          required
          icon={User}
        />

        <Input
          label="Tempat Lahir"
          name="tempatLahir"
          placeholder="Contoh : Selong"
          register={register}
          error={errors.tempatLahir}
          required
          icon={MapPin}
        />

        <Input
          label="Tanggal Lahir"
          name="tanggalLahir"
          type="date"
          register={register}
          error={errors.tanggalLahir}
          required
          icon={Calendar}
        />

        <Select
          label="Jenis Kelamin"
          name="jenisKelamin"
          register={register}
          error={errors.jenisKelamin}
          required
          options={[
            "Laki-laki",
            "Perempuan",
          ]}
        />

        <Select
          label="Agama"
          name="agama"
          register={register}
          error={errors.agama}
          required
          options={[
            "Islam",
            "Kristen",
            "Katolik",
            "Hindu",
            "Buddha",
            "Konghucu",
          ]}
        />

        <Input
          label="Nomor HP"
          name="noHp"
          placeholder="08xxxxxxxxxx"
          register={register}
          error={errors.noHp}
          required
          icon={Phone}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="email@gmail.com"
          register={register}
          error={errors.email}
          icon={Mail}
        />

        <div className="md:col-span-2">

          <Input
            label="Alamat"
            name="alamat"
            placeholder="Masukkan alamat lengkap"
            register={register}
            error={errors.alamat}
            required
            icon={Home}
          />

        </div>

        {/* Kelas */}

        <div className="md:col-span-2">

          <label className="mb-4 block text-sm font-semibold text-gray-700">
            Kelas
            <span className="ml-1 text-red-600">*</span>
          </label>

          <div className="grid grid-cols-2 gap-5">

            <label className="cursor-pointer">

              <input
                type="radio"
                value="X"
                {...register("kelas", {
                  required: "Silakan pilih kelas",
                })}
                className="peer hidden"
              />

              <div className="rounded-2xl border-2 border-gray-200 bg-white py-5 text-center text-lg font-bold transition-all duration-200 hover:border-red-600 peer-checked:border-red-700 peer-checked:bg-red-700 peer-checked:text-white">
                Kelas X
              </div>

            </label>

            <label className="cursor-pointer">

              <input
                type="radio"
                value="XI"
                {...register("kelas", {
                  required: "Silakan pilih kelas",
                })}
                className="peer hidden"
              />

              <div className="rounded-2xl border-2 border-gray-200 bg-white py-5 text-center text-lg font-bold transition-all duration-200 hover:border-red-600 peer-checked:border-red-700 peer-checked:bg-red-700 peer-checked:text-white">
                Kelas XI
              </div>

            </label>

          </div>

          {errors.kelas && (
            <p className="mt-2 text-sm text-red-600">
              {errors.kelas.message}
            </p>
          )}

        </div>

      </div>
    </>
  );
}

export default StepOne;
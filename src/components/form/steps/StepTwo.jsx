import { useFormContext } from "react-hook-form";
import {
  HeartPulse,
  Ruler,
  Weight,
  ShieldPlus,
  Shirt,
} from "lucide-react";

import Input from "../Input";
import Select from "../Select";

function StepTwo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Data Kesehatan
        </h2>

        <p className="mt-2 text-gray-500">
          Informasi ini digunakan untuk kegiatan PMR dan keadaan darurat.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Select
          label="Golongan Darah"
          name="golonganDarah"
          register={register}
          required
          error={errors.golonganDarah}
          icon={HeartPulse}
          options={[
            "A",
            "B",
            "AB",
            "O",
            "Belum Tahu",
          ]}
        />

        <Select
          label="Ukuran Seragam"
          name="ukuranSeragam"
          register={register}
          required
          error={errors.ukuranSeragam}
          icon={Shirt}
          options={[
            "S",
            "M",
            "L",
            "XL",
            "XXL",
          ]}
        />

        <Input
          label="Tinggi Badan (cm)"
          name="tinggiBadan"
          type="number"
          register={register}
          required
          error={errors.tinggiBadan}
          placeholder="170"
          icon={Ruler}
        />

        <Input
          label="Berat Badan (kg)"
          name="beratBadan"
          type="number"
          register={register}
          required
          error={errors.beratBadan}
          placeholder="60"
          icon={Weight}
        />

        <div className="md:col-span-2">
          <Input
            label="Riwayat Penyakit / Alergi"
            name="riwayatPenyakit"
            register={register}
            error={errors.riwayatPenyakit}
            placeholder="Kosongkan jika tidak ada"
            icon={ShieldPlus}
          />
        </div>

      </div>
    </>
  );
}

export default StepTwo;
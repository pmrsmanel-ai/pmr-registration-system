import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Camera, ImagePlus, CheckCircle2 } from "lucide-react";

function StepFour() {
  const { setValue } = useFormContext();

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setError("Format harus JPG atau PNG.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran maksimal 2 MB.");
      return;
    }

    setError("");
    setValue("foto", file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Upload Foto Diri
        </h2>

        <p className="mt-2 text-gray-500">
          Upload foto Diri terbaru dengan wajah terlihat jelas..
        </p>
      </div>

      <label className="flex cursor-pointer flex-col items-center rounded-3xl border-2 border-dashed border-red-200 bg-red-50 p-10 transition hover:border-red-500 hover:bg-red-100">

        {!preview ? (
          <>
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow">
              <ImagePlus
                size={42}
                className="text-red-600"
              />
            </div>

            <h3 className="mt-6 text-xl font-bold">
              Klik untuk memilih foto
            </h3>

            <p className="mt-2 text-center text-gray-500">
              JPG atau PNG <br />
              Maksimal 2 MB
            </p>
          </>
        ) : (
          <>
            <img
              src={preview}
              alt="Preview"
              className="h-64 w-52 rounded-2xl border object-cover shadow-lg"
            />

            <div className="mt-5 flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">
              <CheckCircle2 size={18} />
              Foto berhasil dipilih
            </div>
          </>
        )}

        <input
          type="file"
          hidden
          accept=".jpg,.jpeg,.png"
          onChange={handleImage}
        />

      </label>

      {error && (
        <p className="mt-4 text-center font-medium text-red-600">
          {error}
        </p>
      )}

      <div className="mt-8 rounded-2xl bg-blue-50 p-6">

        <div className="flex items-center gap-3">

          <Camera
            size={22}
            className="text-blue-700"
          />

          <div>

            <h4 className="font-semibold text-blue-800">
              Tips Foto
            </h4>

            <ul className="mt-2 list-disc pl-5 text-sm leading-7 text-blue-700">
              <li>Wajah terlihat jelas.</li>
              <li>Tidak memakai filter.</li>
              <li>Foto terbaru.</li>
              <li>Pencahayaan cukup.</li>
              <li>Foto selfie hanya digunakan untuk proses verifikasi data calon anggota PMR dan tidak akan dipublikasikan.</li>
            </ul>

          </div>

        </div>

      </div>
    </>
  );
}

export default StepFour;
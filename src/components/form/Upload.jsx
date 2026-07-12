import { UploadCloud } from "lucide-react";

function Upload({
  preview,
  onChange,
  error,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold">
        Pas Foto
      </label>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 transition hover:border-red-600 hover:bg-red-50">

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-52 w-52 rounded-xl object-cover"
          />
        ) : (
          <>
            <UploadCloud
              size={60}
              className="text-red-700"
            />

            <p className="mt-4 font-semibold">
              Klik untuk upload foto
            </p>

            <p className="mt-2 text-sm text-gray-500">
              JPG / PNG (Maksimal 2 MB)
            </p>
          </>
        )}

        <input
          type="file"
          hidden
          accept="image/png,image/jpeg,image/jpg"
          onChange={onChange}
        />

      </label>

      {error && (
        <p className="mt-3 text-red-600">
          {error}
        </p>
      )}

    </div>
  );
}

export default Upload;
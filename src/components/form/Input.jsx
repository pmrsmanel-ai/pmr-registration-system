import { AlertCircle } from "lucide-react";

function Input({
  label,
  name,
  register,
  required = false,
  type = "text",
  placeholder = "",
  error,
  icon: Icon,
  helperText = "",
}) {
  const validation = {
    required: required ? `${label} wajib diisi` : false,
  };

  // Validasi Email
  if (name === "email") {
    validation.pattern = {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Format email tidak valid",
    };
  }

  // Validasi Nomor HP
  if (name === "noHp" || name === "noHpOrtu") {
    validation.pattern = {
      value: /^08[0-9]{8,11}$/,
      message: "Nomor HP tidak valid",
    };
  }

  // Validasi Tinggi & Berat
  if (name === "tinggiBadan") {
    validation.min = {
      value: 50,
      message: "Minimal 50 cm",
    };

    validation.max = {
      value: 250,
      message: "Maksimal 250 cm",
    };
  }

  if (name === "beratBadan") {
    validation.min = {
      value: 20,
      message: "Minimal 20 kg",
    };

    validation.max = {
      value: 250,
      message: "Maksimal 250 kg",
    };
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}

        {required && (
          <span className="ml-1 text-red-600">*</span>
        )}
      </label>

      <div
        className={`flex items-center rounded-2xl border bg-white transition-all duration-200

        ${
          error
            ? "border-red-500 ring-2 ring-red-100"
            : "border-gray-300 focus-within:border-red-600 focus-within:ring-4 focus-within:ring-red-100"
        }
        `}
      >
        {Icon && (
          <div className="pl-4 text-gray-400">
            <Icon size={20} />
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          {...register(name, validation)}
          className="w-full rounded-2xl bg-transparent px-4 py-4 text-gray-800 placeholder:text-gray-400 focus:outline-none"
        />
      </div>

      {!error && helperText && (
        <p className="text-xs text-gray-500">
          {helperText}
        </p>
      )}

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={16} />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
}

export default Input;
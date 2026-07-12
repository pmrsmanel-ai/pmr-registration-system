import { AlertCircle } from "lucide-react";

function Select({
  label,
  name,
  register,
  options,
  required = false,
  error,
  icon: Icon,
}) {
  return (
    <div className="space-y-2">

      <label className="text-sm font-semibold">
        {label}
        {required && (
          <span className="ml-1 text-red-600">*</span>
        )}
      </label>

      <div
        className={`flex items-center rounded-2xl border bg-white transition
        ${
          error
            ? "border-red-500"
            : "border-gray-300 focus-within:border-red-600 focus-within:ring-4 focus-within:ring-red-100"
        }`}
      >

        {Icon && (
          <div className="pl-4 text-gray-400">
            <Icon size={20} />
          </div>
        )}

        <select
          {...register(name, {
            required: required
              ? `${label} wajib dipilih`
              : false,
          })}
          className="w-full rounded-2xl bg-transparent px-4 py-4 outline-none"
        >
          <option value="">Pilih...</option>

          {options.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}

        </select>

      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={16} />
          <span>{error.message}</span>
        </div>
      )}

    </div>
  );
}

export default Select;
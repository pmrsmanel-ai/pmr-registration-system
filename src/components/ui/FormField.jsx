import clsx from "clsx";

function FormField({

  label,

  type = "text",

  value,

  onChange,

  placeholder = "",

  options = [],

  rows = 4,

  required = false,

  helper,

  error,

  disabled = false,

  className = "",

}) {

  const inputClass = clsx(

    "mt-2 w-full rounded-2xl border bg-white px-4 py-3 outline-none transition",

    error

      ? "border-red-500 focus:border-red-600"

      : "border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100",

    disabled && "cursor-not-allowed bg-gray-100",

    className

  );

  return (

    <div>

      {label && (

        <label className="text-sm font-semibold text-gray-700">

          {label}

          {required && (

            <span className="ml-1 text-red-500">

              *

            </span>

          )}

        </label>

      )}

      {type === "textarea" ? (

        <textarea

          rows={rows}

          value={value ?? ""}

          disabled={disabled}

          placeholder={placeholder}

          onChange={(e) =>

            onChange(e.target.value)

          }

          className={inputClass}

        />

      ) : type === "select" ? (

        <select

          value={value}

          disabled={disabled}

          onChange={(e) =>

            onChange(e.target.value)

          }

          className={inputClass}

        >

          {options.map((option) => (

            <option

              key={option.value}

              value={option.value}

            >

              {option.label}

            </option>

          ))}

        </select>

      ) : (

        <input

          type={type}

          value={value ?? ""}

          disabled={disabled}

          placeholder={placeholder}

          onChange={(e) =>

            onChange(e.target.value)

          }

          className={inputClass}

        />

      )}

      {helper && (

        <p className="mt-2 text-xs text-gray-500">

          {helper}

        </p>

      )}

      {error && (

        <p className="mt-2 text-xs font-medium text-red-600">

          {error}

        </p>

      )}

    </div>

  );

}

export default FormField;
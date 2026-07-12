import { LoaderCircle } from "lucide-react";

function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  onClick,
  className = "",
}) {
  const baseClass =
    "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-red-700 text-white hover:bg-red-800",

    secondary:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",

    success:
      "bg-green-600 text-white hover:bg-green-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {loading && (
        <LoaderCircle
          size={18}
          className="animate-spin"
        />
      )}

      {children}
    </button>
  );
}

export default Button;
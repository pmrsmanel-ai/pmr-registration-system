import clsx from "clsx";

const variants = {

  primary:
    "bg-red-700 hover:bg-red-800 text-white",

  secondary:
    "bg-gray-100 hover:bg-gray-200 text-gray-800",

  success:
    "bg-green-600 hover:bg-green-700 text-white",

  danger:
    "bg-red-600 hover:bg-red-700 text-white",

  warning:
    "bg-yellow-500 hover:bg-yellow-600 text-white",

  info:
    "bg-blue-600 hover:bg-blue-700 text-white",

  outline:
    "border border-gray-300 bg-white hover:bg-gray-100 text-gray-700",

};

const sizes = {

  sm: "px-3 py-2 text-sm",

  md: "px-5 py-3",

  lg: "px-6 py-4 text-lg",

};

function Button({

  children,

  variant = "primary",

  size = "md",

  icon,

  loading = false,

  fullWidth = false,

  disabled = false,

  className = "",

  ...props

}) {

  return (

    <button

      disabled={disabled || loading}

      className={clsx(

        "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",

        variants[variant],

        sizes[size],

        fullWidth && "w-full",

        className

      )}

      {...props}

    >

      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        icon
      )}

      {children}

    </button>

  );

}

export default Button;
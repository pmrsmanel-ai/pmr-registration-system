import clsx from "clsx";

const variants = {

  primary:
    "bg-red-100 text-red-700",

  success:
    "bg-green-100 text-green-700",

  warning:
    "bg-yellow-100 text-yellow-700",

  danger:
    "bg-red-100 text-red-700",

  info:
    "bg-blue-100 text-blue-700",

  secondary:
    "bg-gray-100 text-gray-700",

};

const sizes = {

  sm: "px-2 py-1 text-xs",

  md: "px-3 py-1.5 text-sm",

  lg: "px-4 py-2 text-base",

};

function Badge({

  children,

  variant = "secondary",

  size = "md",

  rounded = "full",

  className = "",

}) {

  return (

    <span

      className={clsx(

        "inline-flex items-center justify-center font-semibold",

        rounded === "full"

          ? "rounded-full"

          : "rounded-xl",

        variants[variant],

        sizes[size],

        className

      )}

    >

      {children}

    </span>

  );

}

export default Badge;
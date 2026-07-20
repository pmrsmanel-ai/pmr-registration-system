import clsx from "clsx";

function Card({

  children,

  title,

  subtitle,

  headerAction,

  padding = "md",

  className = "",

}) {

  const paddings = {

    none: "",

    sm: "p-4",

    md: "p-6",

    lg: "p-8",

  };

  return (

    <div

      className={clsx(

        "overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm",

        className

      )}

    >

      {(title || subtitle || headerAction) && (

        <div className="flex flex-col gap-4 border-b border-gray-100 p-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            {title && (

              <h2 className="text-xl font-bold text-gray-900">

                {title}

              </h2>

            )}

            {subtitle && (

              <p className="mt-1 text-sm text-gray-500">

                {subtitle}

              </p>

            )}

          </div>

          {headerAction && (

            <div>

              {headerAction}

            </div>

          )}

        </div>

      )}

      <div className={paddings[padding]}>

        {children}

      </div>

    </div>

  );

}

export default Card;
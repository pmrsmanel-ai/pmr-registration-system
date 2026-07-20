import clsx from "clsx";

function PageHeader({

  title,

  subtitle,

  breadcrumb,

  action,

  className = "",

}) {

  return (

    <div
      className={clsx(
        "mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
        className
      )}
    >

      <div>

        {breadcrumb && (

          <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">

            {breadcrumb}

          </div>

        )}

        <h1 className="text-3xl font-bold text-gray-900">

          {title}

        </h1>

        {subtitle && (

          <p className="mt-2 text-gray-500">

            {subtitle}

          </p>

        )}

      </div>

      {action && (

        <div>

          {action}

        </div>

      )}

    </div>

  );

}

export default PageHeader;
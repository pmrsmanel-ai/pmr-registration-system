import { Inbox } from "lucide-react";
import clsx from "clsx";

function EmptyState({

  icon,

  title = "Belum ada data",

  description = "Data akan muncul di sini setelah ditambahkan.",

  action,

  className = "",

}) {

  const Icon = icon || Inbox;

  return (

    <div
      className={clsx(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-8 py-16 text-center",
        className
      )}
    >

      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

        <Icon
          size={30}
          className="text-red-600"
        />

      </div>

      <h3 className="text-xl font-bold text-gray-800">

        {title}

      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">

        {description}

      </p>

      {action && (

        <div className="mt-6">

          {action}

        </div>

      )}

    </div>

  );

}

export default EmptyState;
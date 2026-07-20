import { Search } from "lucide-react";
import clsx from "clsx";

function SearchToolbar({

  search,

  onSearch,

  placeholder = "Cari data...",

  filter,

  action,

  stats,

  className = "",

}) {

  return (

    <div
      className={clsx(
        "mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
        className
      )}
    >

      <div className="flex flex-1 flex-col gap-4 md:flex-row">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-2xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
          />

        </div>

        {filter}

      </div>

      <div className="flex items-center gap-3">

        {stats}

        {action}

      </div>

    </div>

  );

}

export default SearchToolbar;
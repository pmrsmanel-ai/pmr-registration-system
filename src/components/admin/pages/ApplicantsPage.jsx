import { Search, User, School } from "lucide-react";
import StatusBadge from "../StatusBadge";

function ApplicantsPage({
  applicants,
  search,
  setSearch,
  onDetail,
  onExport,
}) {
  return (
    <>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-black lg:text-4xl">
          Data Pendaftar
        </h1>

        <p className="mt-2 text-sm text-gray-500 lg:text-base">
          Kelola seluruh data peserta.
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-xl">
          <Search
            size={20}
            className="absolute left-5 top-5 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau nomor pendaftaran..."
            className="w-full rounded-2xl border bg-white py-4 pl-14 pr-4 outline-none focus:border-red-600"
          />
        </div>

        <button
          onClick={onExport}
          className="w-full rounded-2xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700 lg:w-auto"
        >
          Export Excel
        </button>
      </div>

      {/* ================= MOBILE ================= */}

      <div className="space-y-4 lg:hidden">
        {applicants.length === 0 ? (
          <EmptyState />
        ) : (
          applicants.map((item) => (
            <ApplicantCard
              key={item.id}
              item={item}
              onDetail={onDetail}
            />
          ))
        )}
      </div>

      {/* ================= DESKTOP ================= */}

      <div className="hidden lg:block">
        <div className="overflow-x-auto rounded-3xl bg-white shadow-xl">
          <table className="min-w-[760px] w-full">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="w-16 px-5 py-4 text-left">
                  No
                </th>

                <th className="px-5 py-4 text-left">
                  Nomor
                </th>

                <th className="px-5 py-4 text-left">
                  Nama
                </th>

                <th className="px-5 py-4 text-left">
                  Kelas
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>

                <th className="w-28 px-5 py-4 text-center">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {applicants.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-16"
                  >
                    <EmptyState />
                  </td>
                </tr>
              ) : (
                applicants.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {item.registration_number}
                    </td>

                    <td className="px-5 py-4">
                      {item.full_name}
                    </td>

                    <td className="px-5 py-4">
                      {item.class}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge
                        status={item.status}
                      />
                    </td>

                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() =>
                          onDetail(item)
                        }
                        className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ===============================
   MOBILE CARD
================================ */

function ApplicantCard({
  item,
  onDetail,
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Nomor Pendaftaran
          </p>

          <h3 className="font-bold text-red-700">
            {item.registration_number}
          </h3>
        </div>

        <StatusBadge
          status={item.status}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <User
            size={18}
            className="text-gray-400"
          />

          <span className="font-semibold">
            {item.full_name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <School
            size={18}
            className="text-gray-400"
          />

          <span>{item.class}</span>
        </div>
      </div>

      <button
        onClick={() => onDetail(item)}
        className="mt-5 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        Lihat Detail
      </button>
    </div>
  );
}

/* ===============================
   EMPTY
================================ */

function EmptyState() {
  return (
    <div className="flex flex-col items-center py-16">
      <img
        src={`${import.meta.env.BASE_URL}images/empty-data.svg`}
        alt="Empty"
        className="mb-6 h-28 lg:h-40"
      />

      <h2 className="text-xl font-bold lg:text-2xl">
        Belum Ada Data
      </h2>

      <p className="mt-2 text-center text-gray-500">
        Belum ada peserta yang mendaftar.
      </p>
    </div>
  );
}

export default ApplicantsPage;
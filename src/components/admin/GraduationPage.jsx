import { useMemo, useState } from "react";
import {
  Search,
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
  GraduationCap,
} from "lucide-react";

import {
  publishGraduation,
} from "../../services/graduationApi";

function GraduationPage({
  applicants = [],
  onRefresh,
}) {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [loading, setLoading] = useState(false);

  /* ==========================================
     STATISTICS
  ========================================== */

  const stats = useMemo(() => {

    return {

      total: applicants.length,

      pending: applicants.filter(
        item => item.status === "Menunggu Verifikasi"
      ).length,

      accepted: applicants.filter(
        item => item.status === "Diterima"
      ).length,

      rejected: applicants.filter(
        item => item.status === "Ditolak"
      ).length,

    };

  }, [applicants]);

  /* ==========================================
     FILTER
  ========================================== */

  const filteredApplicants = useMemo(() => {

    return applicants.filter(item => {

      const keyword = search.toLowerCase();

      const matchSearch =

        item.full_name
          ?.toLowerCase()
          .includes(keyword)

        ||

        item.registration_number
          ?.toLowerCase()
          .includes(keyword)

        ||

        item.class
          ?.toLowerCase()
          .includes(keyword);

      const matchFilter =

        filter === "Semua"

        ||

        item.status === filter;

      return (
        matchSearch &&
        matchFilter
      );

    });

  }, [
    applicants,
    search,
    filter,
  ]);

  /* ==========================================
     CHANGE STATUS
  ========================================== */

  async function changeStatus(
    id,
    status,
  ) {

    try {

      setLoading(true);

      await publishGraduation(
        id,
        status,
      );

      await onRefresh();

    }

    catch (err) {

      console.error(err);

      alert(err.message);

    }

    finally {

      setLoading(false);

    }

  }

  return (
        <div className="space-y-8">

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 shadow-xl">

        <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT */}

          <div className="text-white">

            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur">

              <GraduationCap size={18} />

              <span className="text-sm font-medium">
                Dashboard Kelulusan
              </span>

            </div>

            <h1 className="mt-5 text-4xl font-black lg:text-5xl">

              Kelulusan Peserta

            </h1>

            <p className="mt-4 max-w-2xl text-red-100 leading-7">

              Kelola hasil seleksi anggota baru PMR
              SMAN 1 AIKMEL.
              Publikasikan hasil kelulusan peserta
              secara cepat, aman dan terstruktur.

            </p>

          </div>

          {/* RIGHT */}

          <div className="rounded-3xl bg-white/10 p-8 text-white backdrop-blur">

            <p className="text-sm uppercase tracking-widest text-red-100">

              Total Peserta

            </p>

            <h2 className="mt-3 text-6xl font-black">

              {stats.total}

            </h2>

            <div className="mt-6 grid grid-cols-3 gap-5">

              <div>

                <p className="text-xs text-red-100">

                  Menunggu

                </p>

                <h3 className="mt-1 text-2xl font-bold">

                  {stats.pending}

                </h3>

              </div>

              <div>

                <p className="text-xs text-red-100">

                  Diterima

                </p>

                <h3 className="mt-1 text-2xl font-bold">

                  {stats.accepted}

                </h3>

              </div>

              <div>

                <p className="text-xs text-red-100">

                  Ditolak

                </p>

                <h3 className="mt-1 text-2xl font-bold">

                  {stats.rejected}

                </h3>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          STATISTIC
      ========================================================== */}

      <section className="grid grid-cols-2 gap-5 xl:grid-cols-4">

        <StatCard
          title="Total Peserta"
          value={stats.total}
          icon={<Users size={28} />}
          color="red"
        />

        <StatCard
          title="Menunggu"
          value={stats.pending}
          icon={<Clock3 size={28} />}
          color="yellow"
        />

        <StatCard
          title="Diterima"
          value={stats.accepted}
          icon={<CheckCircle2 size={28} />}
          color="green"
        />

        <StatCard
          title="Ditolak"
          value={stats.rejected}
          icon={<XCircle size={28} />}
          color="gray"
        />

      </section>

      {/* =========================================================
          SEARCH & FILTER
      ========================================================== */}

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row">

          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, nomor pendaftaran atau kelas..."
              className="
                w-full
                rounded-2xl
                border
                border-gray-300
                py-3.5
                pl-14
                pr-4
                outline-none
                transition
                focus:border-red-500
                focus:ring-4
                focus:ring-red-100
              "
            />

          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="
              rounded-2xl
              border
              border-gray-300
              px-5
              py-3.5
              outline-none
              transition
              focus:border-red-500
              focus:ring-4
              focus:ring-red-100
            "
          >

            <option value="Semua">
              Semua Status
            </option>

            <option value="Menunggu Verifikasi">
              Menunggu Verifikasi
            </option>

            <option value="Diterima">
              Diterima
            </option>

            <option value="Ditolak">
              Ditolak
            </option>

          </select>

        </div>

        <div className="mt-5 flex flex-wrap gap-3">

          <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
            Total : {filteredApplicants.length}
          </span>

          <span className="rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700">
            Pending : {stats.pending}
          </span>

          <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            Diterima : {stats.accepted}
          </span>

          <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
            Ditolak : {stats.rejected}
          </span>

        </div>

      </section>

      {/* =========================================================
          DESKTOP TABLE
      ========================================================== */}
      <section className="hidden overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl lg:block">

  <div className="border-b border-gray-200 bg-gray-50 px-6 py-5">

    <div className="flex items-center justify-between">

      <div>

        <h2 className="text-lg font-bold text-gray-800">
          Daftar Peserta
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Kelola status kelulusan peserta PMR.
        </p>

      </div>

      <div className="rounded-2xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">

        {filteredApplicants.length} Peserta

      </div>

    </div>

  </div>

  <div className="overflow-x-auto">

    <table className="min-w-full">

      <thead className="bg-gradient-to-r from-red-700 to-red-600 text-white">

        <tr>

          <th className="px-6 py-4 text-left text-sm font-semibold">
            No
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold">
            Peserta
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold">
            Nomor
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold">
            Kelas
          </th>

          <th className="px-6 py-4 text-center text-sm font-semibold">
            Status
          </th>

          <th className="px-6 py-4 text-center text-sm font-semibold">
            Aksi
          </th>

        </tr>

      </thead>

      <tbody>

        {filteredApplicants.length === 0 ? (

          <tr>

            <td
              colSpan={6}
              className="py-20 text-center"
            >

              <Users
                size={48}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-5 text-lg font-bold text-gray-700">

                Tidak ada peserta

              </h3>

              <p className="mt-2 text-sm text-gray-500">

                Tidak ditemukan data yang sesuai.

              </p>

            </td>

          </tr>

        ) : (

          filteredApplicants.map((item, index) => (

            <tr
              key={item.id}
              className="border-b border-gray-100 transition hover:bg-red-50"
            >

              <td className="px-6 py-5 font-semibold text-gray-700">

                {index + 1}

              </td>

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 font-bold text-red-700">

                    {item.full_name?.charAt(0)}

                  </div>

                  <div>

                    <h3 className="font-semibold text-gray-800">

                      {item.full_name}

                    </h3>

                    <p className="text-sm text-gray-500">

                      Calon Anggota PMR

                    </p>

                  </div>

                </div>

              </td>

              <td className="px-6 py-5 font-semibold text-red-700">

                {item.registration_number}

              </td>

              <td className="px-6 py-5">

                {item.class}

              </td>

              <td className="px-6 py-5 text-center">

                <StatusBadge
                  status={item.status}
                />

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-2">
                                    <button
                    disabled={
                      loading ||
                      item.status === "Diterima"
                    }
                    onClick={() =>
                      changeStatus(
                        item.id,
                        "Diterima"
                      )
                    }
                    className="
                      rounded-xl
                      bg-green-600
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-green-700
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    ✓ Terima
                  </button>

                  <button
                    disabled={
                      loading ||
                      item.status === "Ditolak"
                    }
                    onClick={() =>
                      changeStatus(
                        item.id,
                        "Ditolak"
                      )
                    }
                    className="
                      rounded-xl
                      bg-red-600
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-red-700
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    ✕ Tolak
                  </button>

                </div>

              </td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

</section>

{/* =========================================================
    MOBILE CARD
========================================================= */}
<section className="space-y-4 lg:hidden">

  {filteredApplicants.length === 0 ? (

    <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-14 text-center shadow-sm">

      <Users
        size={48}
        className="mx-auto text-gray-300"
      />

      <h3 className="mt-5 text-lg font-bold text-gray-700">
        Tidak ada peserta
      </h3>

      <p className="mt-2 px-6 text-sm text-gray-500">
        Tidak ditemukan peserta yang sesuai
        dengan pencarian atau filter.
      </p>

    </div>

  ) : (

    filteredApplicants.map((item, index) => (

      <article
        key={item.id}
        className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:shadow-lg"
      >

        {/* HEADER */}

        <div className="bg-gradient-to-r from-red-700 to-red-600 p-5 text-white">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs uppercase tracking-widest text-red-100">

                Peserta #{index + 1}

              </p>

              <h2 className="mt-2 text-lg font-bold">

                {item.registration_number}

              </h2>

            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-xl font-bold">

              {item.full_name?.charAt(0)}

            </div>

          </div>

        </div>

        {/* BODY */}

        <div className="space-y-5 p-5">

          <div>

            <p className="text-xs uppercase tracking-wide text-gray-400">

              Nama Peserta

            </p>

            <h3 className="mt-1 text-lg font-bold text-gray-800">

              {item.full_name}

            </h3>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <p className="text-xs uppercase tracking-wide text-gray-400">

                Kelas

              </p>

              <p className="mt-1 font-semibold text-gray-700">

                {item.class}

              </p>

            </div>

            <div>

              <p className="text-xs uppercase tracking-wide text-gray-400">

                Status

              </p>

              <div className="mt-2">

                <StatusBadge
                  status={item.status}
                />

              </div>

            </div>

          </div>

          {/* ACTION */}

          <div className="grid grid-cols-2 gap-3">

            <button
              disabled={
                loading ||
                item.status === "Diterima"
              }
              onClick={() =>
                changeStatus(
                  item.id,
                  "Diterima"
                )
              }
              className="
                rounded-2xl
                bg-green-600
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-green-700
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              ✓ Terima
            </button>

            <button
              disabled={
                loading ||
                item.status === "Ditolak"
              }
              onClick={() =>
                changeStatus(
                  item.id,
                  "Ditolak"
                )
              }
              className="
                rounded-2xl
                bg-red-600
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-red-700
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              ✕ Tolak
            </button>

          </div>

        </div>

      </article>

    ))

  )}

</section>

    </div>

  );

}
/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  title,
  value,
  color,
}) {

  const colors = {

    red: {
      bg: "bg-red-50",
      icon: "bg-red-100 text-red-600",
      text: "text-red-700",
    },

    yellow: {
      bg: "bg-yellow-50",
      icon: "bg-yellow-100 text-yellow-600",
      text: "text-yellow-700",
    },

    green: {
      bg: "bg-green-50",
      icon: "bg-green-100 text-green-600",
      text: "text-green-700",
    },

    gray: {
      bg: "bg-gray-50",
      icon: "bg-gray-200 text-gray-700",
      text: "text-gray-700",
    },

  };

  const style = colors[color];

  return (

    <div
      className={`
        ${style.bg}
        rounded-3xl
        border
        border-gray-100
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      `}
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">

            {title}

          </p>

          <h2
            className={`mt-3 text-4xl font-black ${style.text}`}
          >

            {value}

          </h2>

        </div>

        <div
          className={`
            ${style.icon}
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
          `}
        >

          {icon}

        </div>

      </div>

    </div>

  );

}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}) {

  let bg =
    "bg-yellow-100";

  let text =
    "text-yellow-700";

  let dot =
    "bg-yellow-500";

  if (
    status === "Diterima"
  ) {

    bg =
      "bg-green-100";

    text =
      "text-green-700";

    dot =
      "bg-green-500";

  }

  if (
    status === "Ditolak"
  ) {

    bg =
      "bg-red-100";

    text =
      "text-red-700";

    dot =
      "bg-red-500";

  }

  return (

    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        ${bg}
        px-4
        py-2
        text-sm
        font-semibold
        ${text}
      `}
    >

      <span
        className={`
          h-2.5
          w-2.5
          rounded-full
          ${dot}
        `}
      />

      {status}

    </span>

  );

}

export default GraduationPage;
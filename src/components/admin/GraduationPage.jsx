import { useMemo, useState } from "react";

import {
  Search,
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  publishGraduation,
} from "../../services/graduationApi";

function GraduationPage({

  applicants = [],

  onRefresh,

}) {

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("Semua");

  const [loading, setLoading] =
    useState(false);

  const stats = useMemo(() => {

    return {

      total:
        applicants.length,

      pending:
        applicants.filter(

          item =>

            item.status ===

            "Menunggu Verifikasi"

        ).length,

      accepted:
        applicants.filter(

          item =>

            item.status ===

            "Diterima"

        ).length,

      rejected:
        applicants.filter(

          item =>

            item.status ===

            "Ditolak"

        ).length,

    };

  }, [applicants]);

  const filteredApplicants =

    useMemo(() => {

      return applicants.filter(

        item => {

          const keyword =

            search.toLowerCase();

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

        }

      );

    }, [

      applicants,

      search,

      filter,

    ]);

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

      {/* HEADER */}

      <div className="rounded-3xl bg-gradient-to-r from-red-700 to-red-500 p-8 text-white">

        <h1 className="text-4xl font-black">

          Kelulusan Peserta

        </h1>

        <p className="mt-3 text-red-100">

          Verifikasi hasil seleksi

          Anggota Baru PMR

          SMAN 1 AIKMEL

        </p>

      </div>

      {/* STATISTIK */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard

          icon={<Users size={34}/>}

          title="Total"

          value={stats.total}

          color="bg-red-600"

        />

        <StatCard

          icon={<Clock3 size={34}/>}

          title="Menunggu"

          value={stats.pending}

          color="bg-yellow-500"

        />

        <StatCard

          icon={<CheckCircle2 size={34}/>}

          title="Diterima"

          value={stats.accepted}

          color="bg-green-600"

        />

        <StatCard

          icon={<XCircle size={34}/>}

          title="Ditolak"

          value={stats.rejected}

          color="bg-gray-700"

        />

      </div>

      {/* SEARCH */}

      <div className="rounded-3xl bg-white p-6 shadow">

        <div className="flex flex-col gap-5 lg:flex-row">

          <div className="relative flex-1">

            <Search

              size={20}

              className="absolute left-5 top-5 text-gray-400"

            />

            <input

              value={search}

              onChange={(e)=>

                setSearch(

                  e.target.value

                )

              }

              placeholder="Cari nama, nomor pendaftaran atau kelas..."

              className="w-full rounded-2xl border border-gray-300 py-4 pl-14 pr-4 outline-none transition focus:border-red-600"

            />

          </div>

          <select

            value={filter}

            onChange={(e)=>

              setFilter(

                e.target.value

              )

            }

            className="rounded-2xl border border-gray-300 px-6 py-4 outline-none"

          >

            <option>

              Semua

            </option>

            <option>

              Menunggu Verifikasi

            </option>

            <option>

              Diterima

            </option>

            <option>

              Ditolak

            </option>

          </select>

        </div>

      </div>
            {/* TABLE */}

      <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

        <table className="w-full">

          <thead className="bg-red-700 text-white">

            <tr>

              <th className="px-5 py-4 text-left">

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

              <th className="px-5 py-4 text-center">

                Status

              </th>

              <th className="px-5 py-4 text-center">

                Aksi

              </th>

            </tr>

          </thead>

          <tbody>

            {

              filteredApplicants.length===0 ? (

                <tr>

                  <td

                    colSpan={6}

                    className="py-16 text-center text-gray-500"

                  >

                    Tidak ada peserta.

                  </td>

                </tr>

              ) : (

                filteredApplicants.map(

                  (item,index)=>(

                    <tr

                      key={item.id}

                      className="border-b transition hover:bg-gray-50"

                    >

                      <td className="px-5 py-4">

                        {index+1}

                      </td>

                      <td className="px-5 py-4 font-semibold">

                        {item.registration_number}

                      </td>

                      <td className="px-5 py-4">

                        <div>

                          <h3 className="font-semibold">

                            {item.full_name}

                          </h3>

                        </div>

                      </td>

                      <td className="px-5 py-4">

                        {item.class}

                      </td>

                      <td className="px-5 py-4 text-center">

                        <StatusBadge

                          status={item.status}

                        />

                      </td>

                      <td className="px-5 py-4">

                        <div className="flex justify-center gap-2">

                          <button

                            disabled={loading}

                            onClick={()=>{

                              changeStatus(

                                item.id,

                                "Diterima"

                              );

                            }}

                            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"

                          >

                            Terima

                          </button>

                          <button

                            disabled={loading}

                            onClick={()=>{

                              changeStatus(

                                item.id,

                                "Ditolak"

                              );

                            }}

                            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"

                          >

                            Tolak

                          </button>

                        </div>

                      </td>

                    </tr>

                  )

                )

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}
/* ==========================================
   STAT CARD
========================================== */

function StatCard({

  icon,

  title,

  value,

  color,

}) {

  return (

    <div

      className={`${color} rounded-3xl p-6 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl`}

    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm opacity-90">

            {title}

          </p>

          <h2 className="mt-3 text-5xl font-black">

            {value}

          </h2>

        </div>

        <div className="rounded-2xl bg-white/20 p-4">

          {icon}

        </div>

      </div>

    </div>

  );

}

/* ==========================================
   STATUS BADGE
========================================== */

function StatusBadge({

  status,

}) {

  let cls =

    "bg-yellow-100 text-yellow-700";

  if (

    status === "Diterima"

  ) {

    cls =

      "bg-green-100 text-green-700";

  }

  if (

    status === "Ditolak"

  ) {

    cls =

      "bg-red-100 text-red-700";

  }

  return (

    <span

      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${cls}`}

    >

      {status}

    </span>

  );

}

export default GraduationPage;
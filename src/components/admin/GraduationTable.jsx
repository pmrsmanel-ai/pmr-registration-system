import {
  Eye,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

function GraduationTable({

  applicants = [],

  loading,

  search,

  setSearch,

  filter,

  setFilter,

  onDetail,

  onEdit,

  onDelete,

}) {

  return (

    <div className="space-y-6">

      {/* ==========================================
          TOOLBAR
      ========================================== */}

      <div className="rounded-3xl bg-white p-6 shadow">

        <div className="flex flex-col gap-5 lg:flex-row">

          {/* SEARCH */}

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

          {/* FILTER */}

          <select

            value={filter}

            onChange={(e)=>

              setFilter(

                e.target.value

              )

            }

            className="rounded-2xl border border-gray-300 px-6 py-4 outline-none"

          >

            <option value="Semua">

              Semua

            </option>

            <option value="Menunggu Verifikasi">

              Menunggu

            </option>

            <option value="Diterima">

              Diterima

            </option>

            <option value="Ditolak">

              Ditolak

            </option>

          </select>

        </div>

      </div>

      {/* ==========================================
          TABLE
      ========================================== */}

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

              applicants.length === 0 ? (

                <tr>

                  <td

                    colSpan={6}

                    className="py-16 text-center"

                  >

                    <div className="flex flex-col items-center">

                      <img

                        src={`${import.meta.env.BASE_URL}images/empty-data.svg`}

                        alt="Empty"

                        className="mb-6 h-36"

                        onError={(e)=>{

                          e.currentTarget.style.display="none";

                        }}

                      />

                      <h2 className="text-2xl font-bold text-gray-700">

                        Belum Ada Peserta

                      </h2>

                      <p className="mt-2 text-gray-500">

                        Tidak ada data yang sesuai.

                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                applicants.map(

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

                        <div className="flex items-center gap-4">

                          <img

                            src={

                              item.photo_url ||

                              `${import.meta.env.BASE_URL}images/avatar-placeholder.png`

                            }

                            alt={item.full_name}

                            className="h-12 w-12 rounded-full border object-cover"

                          />

                          <div>

                            <h3 className="font-bold">

                              {item.full_name}

                            </h3>

                            <p className="text-sm text-gray-500">

                              {item.phone}

                            </p>

                          </div>

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

                            onClick={()=>{

                              onDetail(item);

                            }}

                            className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700"

                            title="Detail"

                          >

                            <Eye size={18}/>

                          </button>

                          <button

                            onClick={()=>{

                              onEdit(item);

                            }}

                            className="rounded-xl bg-green-600 p-3 text-white transition hover:bg-green-700"

                            title="Kelulusan"

                          >

                            <Pencil size={18}/>

                          </button>

                          <button

                            disabled={loading}

                            onClick={()=>{

                              onDelete(item);

                            }}

                            className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700 disabled:opacity-60"

                            title="Hapus"

                          >

                            <Trash2 size={18}/>

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
   STATUS BADGE
========================================== */

function StatusBadge({

  status,

}) {

  let cls =

    "bg-yellow-100 text-yellow-700";

  let text =

    status || "Menunggu Verifikasi";

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

      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${cls}`}

    >

      {text}

    </span>

  );

}

export default GraduationTable;
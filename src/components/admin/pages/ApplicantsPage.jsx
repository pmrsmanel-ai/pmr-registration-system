import {
  Search,
} from "lucide-react";

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

      <div className="mb-8">

        <h1 className="text-4xl font-black">

          Data Pendaftar

        </h1>

        <p className="mt-2 text-gray-500">

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

            onChange={(e)=>

              setSearch(

                e.target.value

              )

            }

            placeholder="Cari nama atau nomor pendaftaran..."

            className="w-full rounded-2xl border bg-white py-4 pl-14 pr-4 outline-none focus:border-red-600"

          />

        </div>

        <button

          onClick={onExport}

          className="rounded-2xl bg-green-600 px-6 py-4 font-semibold text-white hover:bg-green-700"

        >

          Export Excel

        </button>

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

              <th className="px-5 py-4 text-left">

                Status

              </th>

              <th className="px-5 py-4 text-center">

                Aksi

              </th>

            </tr>

          </thead>

          <tbody>

            {

              applicants.length===0

              ? (

                <tr>

                  <td

                    colSpan={6}

                    className="py-16"

                  >

                    <EmptyState/>

                  </td>

                </tr>

              )

              : (

                applicants.map(

                  (

                    item,

                    index

                  )=>(

                    <tr

                      key={item.id}

                      className="border-b hover:bg-gray-50"

                    >

                      <td className="px-5 py-4">

                        {index+1}

                      </td>

                      <td className="px-5 py-4 font-semibold">

                        {

                          item.registration_number

                        }

                      </td>

                      <td className="px-5 py-4">

                        {

                          item.full_name

                        }

                      </td>

                      <td className="px-5 py-4">

                        {

                          item.class

                        }

                      </td>

                      <td className="px-5 py-4">

                        <StatusBadge

                          status={item.status}

                        />

                      </td>

                      <td className="px-5 py-4 text-center">

                        <button

                          onClick={()=>

                            onDetail(item)

                          }

                          className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"

                        >

                          Detail

                        </button>

                      </td>

                    </tr>

                  )

                )

              )

            }

          </tbody>

        </table>

      </div>

    </>

  );

}

function EmptyState(){

  return(

    <div className="flex flex-col items-center py-16">

      <img

        src={`${import.meta.env.BASE_URL}images/empty-data.svg`}

        alt="Empty"

        className="mb-6 h-40"

      />

      <h2 className="text-2xl font-bold">

        Belum Ada Data

      </h2>

      <p className="mt-2 text-gray-500">

        Belum ada peserta yang mendaftar.

      </p>

    </div>

  );

}

export default ApplicantsPage;
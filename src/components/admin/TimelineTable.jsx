import { useState } from "react";

import {
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import TimelineModal from "./TimelineModal";

function TimelineTable({

  timeline,

  refresh,

}) {

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [openModal, setOpenModal] =
    useState(false);

  function addTimeline() {

    setSelectedItem(null);

    setOpenModal(true);

  }

  function editTimeline(item) {

    setSelectedItem(item);

    setOpenModal(true);

  }

  return (

    <>

      <div className="mb-8 flex justify-end">

        <button

          onClick={addTimeline}

          className="flex items-center gap-2 rounded-2xl bg-red-700 px-6 py-4 font-semibold text-white hover:bg-red-800"

        >

          <Plus size={20}/>

          Tambah Timeline

        </button>

      </div>

      <div className="overflow-hidden rounded-3xl border">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">

                Judul

              </th>

              <th className="px-6 py-4 text-left">

                Periode

              </th>

              <th className="px-6 py-4 text-left">

                Status

              </th>

              <th className="px-6 py-4 text-center">

                Aksi

              </th>

            </tr>

          </thead>

          <tbody></tbody>
                    {

            timeline.length === 0 ? (

              <tr>

                <td

                  colSpan={4}

                  className="px-6 py-12 text-center text-gray-500"

                >

                  Belum ada data timeline.

                </td>

              </tr>

            ) : (

              timeline.map((item) => (

                <tr

                  key={item.id}

                  className="border-t"

                >

                  <td className="px-6 py-5">

                    <div>

                      <h3 className="font-bold">

                        {item.title}

                      </h3>

                      <p className="mt-1 text-sm text-gray-500">

                        {item.description}

                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-5">

                    <div className="text-sm">

                      <div>

                        {item.start_date}

                      </div>

                      <div>

                        s/d

                      </div>

                      <div>

                        {item.end_date}

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-5">

                    {

                      item.is_active ? (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                          Aktif

                        </span>

                      ) : (

                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">

                          Non Aktif

                        </span>

                      )

                    }

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      <button

                        onClick={() =>

                          editTimeline(item)

                        }

                        className="rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700"

                      >

                        <Pencil size={18} />

                      </button>

                      <button

                        className="rounded-xl bg-red-600 p-3 text-white hover:bg-red-700"

                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )

          }

      </table>

      </div>

      {

        openModal && (

          <TimelineModal

            item={selectedItem}

            onClose={() => {

              setOpenModal(false);

              setSelectedItem(null);

              refresh();

            }}

          />

        )

      }

    </>

  );

}
export default TimelineTable;
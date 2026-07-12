import { useState } from "react";

import {

  Plus,

  Pencil,

  Trash2,

} from "lucide-react";

import FaqModal from "./FaqModal";

function FaqTable({

  faq,

  refresh,

}) {

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [openModal, setOpenModal] =
    useState(false);

  function addFaq(){

    setSelectedItem(null);

    setOpenModal(true);

  }

  function editFaq(item){

    setSelectedItem(item);

    setOpenModal(true);

  }

  return(

    <>

      <div className="mb-8 flex justify-end">

        <button

          onClick={addFaq}

          className="flex items-center gap-2 rounded-2xl bg-red-700 px-6 py-4 font-semibold text-white hover:bg-red-800"

        >

          <Plus size={20}/>

          Tambah FAQ

        </button>

      </div>

      <div className="overflow-hidden rounded-3xl border">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">

                Pertanyaan

              </th>

              <th className="px-6 py-4 text-center">

                Status

              </th>

              <th className="px-6 py-4 text-center">

                Aksi

              </th>

            </tr>

          </thead>

          <tbody>
                      {

            faq.length === 0 ? (

              <tr>

                <td

                  colSpan={3}

                  className="px-6 py-12 text-center text-gray-500"

                >

                  Belum ada data FAQ.

                </td>

              </tr>

            ) : (

              faq.map((item) => (

                <tr

                  key={item.id}

                  className="border-t"

                >

                  <td className="px-6 py-5">

                    <div>

                      <h3 className="font-bold">

                        {item.question}

                      </h3>

                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">

                        {item.answer}

                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-center">

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

                          editFaq(item)

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
                  </tbody>

      </table>

      </div>

      {

        openModal && (

          <FaqModal

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

export default FaqTable;
          
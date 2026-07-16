import { useEffect, useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Eye,
  EyeOff,
} from "lucide-react";

import FaqModal from "./modals/FaqModal";

import {
  getFaq,
  deleteFaq,
  toggleFaq,
} from "../../services/faqApi";

function FAQManager() {

  const [loading, setLoading] =
    useState(true);

  const [faq, setFaq] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [selectedFaq, setSelectedFaq] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  async function loadData() {

    try {

      setLoading(true);

      const data = await getFaq();

      setFaq(data);

    }

    catch(err){

      console.error(err);

    }

    finally{

      setLoading(false);

    }

  }

  useEffect(()=>{

    loadData();

  },[]);

  async function remove(item){

    const ok = window.confirm(

      `Hapus FAQ\n\n"${item.question}" ?`

    );

    if(!ok) return;

    try{

      await deleteFaq(item.id);

      loadData();

    }

    catch(err){

      alert(err.message);

    }

  }

  async function changeStatus(item){

    try{

      await toggleFaq(

        item.id,

        !item.is_active

      );

      loadData();

    }

    catch(err){

      alert(err.message);

    }

  }

  const filtered =

    faq.filter(item=>{

      return(

        item.question

        ?.toLowerCase()

        .includes(

          search.toLowerCase()

        )

      );

    });

  if(loading){

    return(

      <div className="py-10 text-center">

        Memuat FAQ...

      </div>

    );

  }

  return(

    <>

      {/* HEADER */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-black">

            Kelola FAQ

          </h1>

          <p className="mt-2 text-gray-500">

            Pertanyaan yang tampil di Homepage.

          </p>

        </div>

        <button

          onClick={()=>{

            setSelectedFaq(null);

            setShowModal(true);

          }}

          className="flex items-center gap-2 rounded-2xl bg-red-700 px-6 py-4 font-semibold text-white hover:bg-red-800"

        >

          <Plus size={20}/>

          Tambah FAQ

        </button>

      </div>

      {/* SEARCH */}

      <div className="mb-6">

        <div className="relative max-w-xl">

          <Search

            size={20}

            className="absolute left-4 top-4 text-gray-400"

          />

          <input

            value={search}

            onChange={(e)=>

              setSearch(

                e.target.value

              )

            }

            placeholder="Cari pertanyaan..."

            className="w-full rounded-2xl border border-gray-300 py-4 pl-12 pr-4 outline-none focus:border-red-600"

          />

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

                Pertanyaan

              </th>

              <th className="px-5 py-4 text-center">

                Urutan

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

              filtered.length===0 ? (

                <tr>

                  <td

                    colSpan={5}

                    className="py-10 text-center"

                  >

                    Tidak ada data.

                  </td>

                </tr>

              ):(

                filtered.map((item,index)=>(

                  <tr

                    key={item.id}

                    className="border-b hover:bg-gray-50"

                  >

                    <td className="px-5 py-4">

                      {index+1}

                    </td>

                    <td className="px-5 py-4">

                      <h3 className="font-semibold">

                        {item.question}

                      </h3>

                    </td>

                    <td className="text-center">

                      {item.sort_order}

                    </td>

                    <td className="text-center">

                      {

                        item.is_active ? (

                          <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">

                            Aktif

                          </span>

                        ):(

                          <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-600">

                            Non Aktif

                          </span>

                        )

                      }

                    </td>

                    <td>

                      <div className="flex justify-center gap-2">

                        <button

                          onClick={()=>{

                            setSelectedFaq(item);

                            setShowModal(true);

                          }}

                          className="rounded-xl bg-blue-600 p-3 text-white"

                        >

                          <Pencil size={18}/>

                        </button>

                        <button

                          onClick={()=>

                            changeStatus(item)

                          }

                          className="rounded-xl bg-yellow-500 p-3 text-white"

                        >

                          {

                            item.is_active

                            ?

                            <EyeOff size={18}/>

                            :

                            <Eye size={18}/>

                          }

                        </button>

                        <button

                          onClick={()=>

                            remove(item)

                          }

                          className="rounded-xl bg-red-600 p-3 text-white"

                        >

                          <Trash2 size={18}/>

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

        showModal && (

          <FaqModal

            item={selectedFaq}

            onClose={()=>{

              setShowModal(false);

              setSelectedFaq(null);

              loadData();

            }}

          />

        )

      }

    </>

  );

}

export default FAQManager;